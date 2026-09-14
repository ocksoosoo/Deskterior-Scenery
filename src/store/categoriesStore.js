import { create } from "zustand";
import { getCategories } from "../api/categoriesApi";
import staticCategories from "../data/categories";
import { showFailToast } from "../components/common/ShowToast";

// 카테고리 목록은 거의 안 바뀌는 전역 데이터인데, Header/HomePage/CategoryPage가
// 각자 마운트될 때마다 따로 getCategories()를 불러서 같은 요청이 중복으로 나가고
// 있었다. 스토어 하나로 모아서 앱 전체에서 딱 한 번만 요청하고, 이미 불러왔거나
// 불러오는 중이면 그 결과(또는 진행 중인 요청)를 그대로 재사용하게 한다.
let inFlightPromise = null;

// 실패 후 이 시간이 지나면, 페이지 이동 등으로 fetchCategories가 다시 호출될 때
// (새 UI 없이) 자동으로 한 번 더 시도한다 - 일시적인 네트워크 오류라면 사용자가
// 새로고침하지 않아도 같은 세션 안에서 스스로 복구되게 하기 위함
const RETRY_AFTER_MS = 30_000;

const useCategoriesStore = create((set, get) => ({
  categories: null, // null: 아직 로딩 전/로딩 중
  status: "idle", // idle | loading | success | error
  lastFailedAt: null,

  fetchCategories: () => {
    const { status, categories, lastFailedAt } = get();

    if (status === "success") {
      return Promise.resolve(categories);
    }

    const canRetryAfterFailure =
      status === "error" &&
      lastFailedAt !== null &&
      Date.now() - lastFailedAt < RETRY_AFTER_MS;

    if (canRetryAfterFailure) {
      return Promise.resolve(categories);
    }

    // 이미 요청이 나가있으면(다른 컴포넌트가 먼저 호출) 그 Promise를 그대로 재사용
    if (inFlightPromise) return inFlightPromise;

    set({ status: "loading" });

    inFlightPromise = getCategories()
      .then((data) => {
        set({ categories: data, status: "success", lastFailedAt: null });
        return data;
      })
      .catch((err) => {
        console.error("카테고리 로딩 실패:", err);
        // API가 실패해도 이름/경로는 항상 같은 정적 목록으로 대체해서 페이지 자체는 정상 동작하게 함
        set({
          categories: staticCategories,
          status: "error",
          lastFailedAt: Date.now(),
        });
        showFailToast("카테고리 정보를 불러오지 못했습니다.");
        return staticCategories;
      })
      .finally(() => {
        inFlightPromise = null;
      });

    return inFlightPromise;
  },
}));

export default useCategoriesStore;

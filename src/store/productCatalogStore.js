import { create } from "zustand";
import { getProducts } from "../api/productsApi";

// 상품 카탈로그(전체 목록)는 위시리스트 뱃지 보강 등 여러 곳에서 필요할 수 있는데,
// 그때마다 다시 요청하면 낭비이므로 categoriesStore와 같은 방식으로 앱 전체에서
// 한 번만 요청하고, 이미 불러왔거나 불러오는 중이면 그 결과(또는 진행 중인 요청)를
// 그대로 재사용한다.
let inFlightPromise = null;

// 실패 후 이 시간이 지나면 다시 시도한다 - 일시적인 네트워크 오류라면 사용자가
// 새로고침하지 않아도 같은 세션 안에서 스스로 복구되게 하기 위함
const RETRY_AFTER_MS = 30_000;

// 캐시를 세션 내내 무한정 쓰면 재고/뱃지(품절, Best, New)가 실제로 바뀌어도
// 반영이 안 되므로, 이 시간이 지나면 캐시를 낡은 것으로 보고 다시 요청한다
const STALE_AFTER_MS = 60_000;

// 한 번에 받아올 페이지 크기 - 카탈로그 상품이 이보다 많아지면 pagination을
// 보고 남은 페이지를 이어서 받아오므로, 실제 상품 개수를 미리 알 필요는 없다
const PAGE_SIZE = 100;

// pagination.totalItems가 실제와 다르게 내려오는 등 서버 쪽 이상으로 반복문이
// 끝나지 않는 경우를 대비한 안전장치 (PAGE_SIZE 기준 최대 50만 개 상품까지 커버)
const MAX_PAGES = 50;

async function fetchAllProducts() {
  let page = 1;
  let all = [];

  while (page <= MAX_PAGES) {
    const { products, pagination } = await getProducts({
      page,
      limit: PAGE_SIZE,
    });

    all = all.concat(products ?? []);

    const totalItems = pagination?.totalItems ?? all.length;
    if (all.length >= totalItems || !products?.length) break;

    page += 1;
  }

  if (page > MAX_PAGES) {
    console.error(
      `상품 카탈로그가 ${MAX_PAGES}페이지를 넘어서 일부만 불러왔습니다. pagination 값을 확인해주세요.`,
    );
  }

  return all;
}

const useProductCatalogStore = create((set, get) => ({
  productsById: null, // null: 아직 로딩 전, 이후로는 { [id]: product } 형태
  status: "idle", // idle | loading | success | error
  lastFailedAt: null,
  fetchedAt: null, // 마지막으로 성공한 시각 - 캐시 신선도 판단용

  // force: true면 캐시/재시도 대기시간을 무시하고 무조건 새로 요청한다
  // (사용자가 직접 "재시도" 버튼을 눌렀을 때처럼, 명시적으로 최신 데이터를 원하는 경우)
  // 반환값은 항상 { [id]: product } 형태의 일반 객체(실패 시 빈 객체 또는 이전 캐시)
  fetchCatalog: ({ force = false } = {}) => {
    const { status, productsById, lastFailedAt, fetchedAt } = get();

    const isFresh =
      !force &&
      status === "success" &&
      fetchedAt !== null &&
      Date.now() - fetchedAt < STALE_AFTER_MS;

    if (isFresh) {
      return Promise.resolve(productsById);
    }

    const canRetryAfterFailure =
      !force &&
      status === "error" &&
      lastFailedAt !== null &&
      Date.now() - lastFailedAt < RETRY_AFTER_MS;

    if (canRetryAfterFailure) {
      return Promise.resolve(productsById ?? {});
    }

    if (inFlightPromise) return inFlightPromise;

    set({ status: "loading" });

    inFlightPromise = fetchAllProducts()
      .then((products) => {
        const byId = Object.fromEntries(
          products.map((product) => [product.id, product]),
        );
        set({
          productsById: byId,
          status: "success",
          lastFailedAt: null,
          fetchedAt: Date.now(),
        });
        return byId;
      })
      .catch((err) => {
        console.error("상품 카탈로그 로딩 실패:", err);
        set({ status: "error", lastFailedAt: Date.now() });
        return get().productsById ?? {};
      })
      .finally(() => {
        inFlightPromise = null;
      });

    return inFlightPromise;
  },
}));

export default useProductCatalogStore;

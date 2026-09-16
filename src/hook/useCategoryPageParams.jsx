import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { SORT_OPTIONS } from "../data/sortOptions";

// 카테고리별 마지막 조회 페이지 기억 (새로고침에도 유지되도록 sessionStorage 사용)
const LAST_PAGE_STORAGE_KEY = "categoryLastPage";

function readLastPageMap() {
  try {
    const saved = sessionStorage.getItem(LAST_PAGE_STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function writeLastPage(categoryId, page) {
  try {
    const map = readLastPageMap();
    map[categoryId] = page;
    sessionStorage.setItem(LAST_PAGE_STORAGE_KEY, JSON.stringify(map));
  } catch {
    // sessionStorage 접근 불가(프라이빗 모드 등)면 다음 방문 때 1페이지로 시작됨
  }
}

// URL의 page 값 검증 (숫자 아님/정수 아님/1 미만이면 1페이지로 취급)
function parsePageParam(value) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

// URL의 sort 값 검증 (지원하지 않는 값이면 기본값으로 보정)
function parseSortParam(value) {
  return SORT_OPTIONS.some((option) => option.value === value)
    ? value
    : "name";
}

// 카테고리 목록 페이지의 URL 상태(page/sort/q)를 읽고 검증하고, "마지막으로
// 보던 페이지" 기억까지 함께 관리한다
function useCategoryPageParams(categoryId) {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q") ?? "";
  const pageParam = searchParams.get("page");
  // URL에 page 있으면 그 값, 없으면 마지막으로 보던 페이지
  const currentPage = pageParam
    ? parsePageParam(pageParam)
    : (readLastPageMap()[categoryId] ?? 1);
  const sortBy = parseSortParam(searchParams.get("sort"));

  const updateSearchParams = (updates, options) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
      });
      return next;
    }, options);
  };

  // 기억한 페이지로 시작했다면 주소창에도 반영 (새로고침/공유 시에도 유지)
  useEffect(() => {
    if (!pageParam && currentPage > 1) {
      updateSearchParams({ page: currentPage }, { replace: true });
    }
    // 마운트 시 한 번만 확인하면 되므로 categoryId만 의존성으로 둠
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  // 페이지가 바뀔 때마다 마지막 조회 페이지 갱신
  useEffect(() => {
    writeLastPage(categoryId, currentPage);
  }, [categoryId, currentPage]);

  return { search, currentPage, sortBy, updateSearchParams };
}

export default useCategoryPageParams;

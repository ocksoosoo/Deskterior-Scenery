// 카테고리별 마지막 조회 페이지 기억 (새로고침에도 유지되도록 sessionStorage 사용)
const LAST_PAGE_STORAGE_KEY = "categoryLastPage";

export function readLastPageMap() {
  try {
    const saved = sessionStorage.getItem(LAST_PAGE_STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export function writeLastPage(categoryId, page) {
  try {
    const map = readLastPageMap();
    map[categoryId] = page;
    sessionStorage.setItem(LAST_PAGE_STORAGE_KEY, JSON.stringify(map));
  } catch {
    // sessionStorage 접근 불가(프라이빗 모드 등)면 다음 방문 때 1페이지로 시작됨
  }
}

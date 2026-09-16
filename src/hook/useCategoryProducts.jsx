import { useEffect, useRef, useState } from "react";
import { getProducts, deriveBadgeFields } from "../api/productsApi";
import { showFailToast } from "../components/common/ShowToast";

// 카테고리 상품 목록을 조회하고 로딩/에러/재조회 상태를 관리한다. 카테고리/
// 정렬/검색/페이지가 바뀌어 재조회 중이어도 기존 데이터가 있으면 스피너
// 대신 유지하다가 새 데이터로 자연스럽게 교체한다
function useCategoryProducts({
  categoryId,
  currentPage,
  sortBy,
  search,
  updateSearchParams,
  pageSize,
}) {
  const [pageProducts, setPageProducts] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [erroredKey, setErroredKey] = useState(null);

  const [loadedProductsForCategoryId, setLoadedProductsForCategoryId] =
    useState(null);

  const queryKey = `${categoryId}|${currentPage}|${sortBy}|${search}`;
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const data = await getProducts(
          {
            category: categoryId,
            page: currentPage,
            limit: pageSize,
            sort: sortBy,
            q: search,
          },
          { signal: controller.signal },
        );

        const totalPagesFromServer = Math.max(1, data.pagination.totalPages);

        // page가 총 페이지 수보다 크면 마지막 페이지로 보정 (재요청 완료 후에만 로딩완료 처리)
        if (currentPage > totalPagesFromServer) {
          updateSearchParams({ page: totalPagesFromServer }, { replace: true });
          return;
        }

        const products = data.products.map((product) => ({
          ...product,
          ...deriveBadgeFields(product),
        }));

        // 이미지 로딩까지 기다리지 않고 데이터만 오면 바로 렌더 (이미지는 lazy loading)
        setPageProducts(products);

        setTotalPages(totalPagesFromServer);

        setErroredKey(null);

        hasLoadedRef.current = true;

        setLoadedProductsForCategoryId(categoryId);
      } catch (error) {
        // 더 최신 요청으로 대체되어 취소된 요청이라 무시 (에러 아님)
        if (error.name === "AbortError") return;

        console.error("상품목록 로딩 실패:", error);

        setErroredKey(queryKey);

        if (hasLoadedRef.current) {
          showFailToast("목록을 불러오지 못했습니다. 다시 시도해 주세요.");
        }

        setLoadedProductsForCategoryId(categoryId);
      }
    }

    loadProducts();

    return () => {
      controller.abort();
    };
    // updateSearchParams는 매 렌더 새로 생성되므로 의존성에서 제외 (queryKey로 충분)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, currentPage, sortBy, search, queryKey]);

  const productsReady = loadedProductsForCategoryId === categoryId;
  // 재조회 중에도 기존 데이터가 있으면 스피너 대신 유지 후 자연스럽게 교체
  const hasLoadedOnce = pageProducts !== null;
  const isCurrentError = erroredKey === queryKey;

  return { pageProducts, totalPages, hasLoadedOnce, isCurrentError, productsReady };
}

export default useCategoryProducts;

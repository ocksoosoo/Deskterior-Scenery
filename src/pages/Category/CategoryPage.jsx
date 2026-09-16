import { useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router";
import { getProducts, deriveBadgeFields } from "../../api/productsApi";
import useCartStore from "../../store/cartStore";
import {
  showSuccessToast,
  showFailToast,
} from "../../components/common/ShowToast";
import ProductCard from "../../components/product/ProductCard";
import ProductToolbar, {
  SORT_OPTIONS,
} from "../../components/product/ProductToolbar";
import Pagination from "../../components/product/Pagination";
import { FadeLoader } from "react-spinners";
import useLoadingStore from "../../store/UseLoadingStore";
import useCategoriesStore from "../../store/categoriesStore";
import { EmptyBoxIcon } from "../../components/icons/Icons";
import * as S from "../../styles/ListPageStyles/CategoryPage.styles";

const PAGE_SIZE = 6;
// theme.media.mobile(768px)과 반드시 같은 값으로 유지 (theme 쪽 기준이 바뀌면 여기도 함께 변경)
const MOBILE_BREAKPOINT = 768;
// 리사이즈 이벤트가 너무 잦아 매번 리렌더되지 않도록 디바운스
const RESIZE_DEBOUNCE_MS = 150;

const PLACEHOLDER_PRODUCT = { id: "placeholder", name: " ", price: 0 };

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

const CategoryPage = ({ categoryId = "lighting" }) => {
  const cartItems = useCartStore((s) => s.cartItems);
  const addToCart = useCartStore((s) => s.addToCart);
  const removeItem = useCartStore((s) => s.removeItem);

  const finishPageLoading = useLoadingStore((state) => state.finishPageLoading);

  const { pathname } = useLocation();

  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < MOBILE_BREAKPOINT,
  );
  useEffect(() => {
    let resizeTimer = null;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      }, RESIZE_DEBOUNCE_MS);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // 모바일 2개, PC/태블릿 3개씩 한 행
  const rowSize = isMobile ? 2 : 3;

  // 카테고리 목록은 스토어에서 앱 전체 캐시/1회 요청 처리
  const categories = useCategoriesStore((state) => state.categories);
  const categoriesStatus = useCategoriesStore((state) => state.status);
  const categoriesReady =
    categoriesStatus === "success" || categoriesStatus === "error";
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const category = categories?.find((c) => c.id === categoryId);
  // 카테고리 이름 로딩 실패해도 상품목록은 보이도록 categoryId로 폴백
  const categoryName = category?.name ?? categoryId;

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
            limit: PAGE_SIZE,
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

  useEffect(() => {
    if (!categoriesReady || !productsReady) {
      return;
    }

    finishPageLoading(pathname);
  }, [categoriesReady, productsReady, pathname, finishPageLoading]);

  // 재조회 중에도 기존 데이터가 있으면 스피너 대신 유지 후 자연스럽게 교체
  const hasLoadedOnce = pageProducts !== null;
  const isCurrentError = erroredKey === queryKey;

  // categories 로딩 완료 후에도 없는 id면 잘못된 페이지
  if (categories !== null && !category) {
    return null;
  }

  const breadcrumbTrail = [
    { label: "Home", path: "/" },
    { label: categoryName },
  ];

  const handleAddToCart = async (productId) => {
    if (!pageProducts) return;
    const product = pageProducts.find((p) => p.id === productId);
    if (!product) return;

    try {
      const existingItem = cartItems.find(
        (item) => item.productId === product.id,
      );

      if (existingItem) {
        await removeItem(existingItem.cartItemId);
        showSuccessToast("장바구니에서 삭제했습니다.");
      } else {
        await addToCart({
          productId: product.id,
          name: product.name,
          price: product.discountPrice || product.price,
          imageUrl: product.imageUrl,
          isSoldOut: product.soldOut,
        });
        showSuccessToast("장바구니에 담았습니다.");
      }
    } catch (err) {
      console.error("장바구니 업데이트 실패:", err);
      showFailToast("장바구니 처리에 실패했습니다.");
    }
  };

  let resultsContent;

  if (!hasLoadedOnce && !isCurrentError) {
    // 그리드 높이를 미리 확보해 CLS 방지 (전역 Loading은 전체를 덮으므로 인라인 스피너 사용)
    resultsContent = (
      <S.EmptyState role="status" aria-live="polite">
        <FadeLoader color="#222320" size={40} speedMultiplier={1} />
        <S.EmptySubtitle>상품을 불러오는 중입니다...</S.EmptySubtitle>
      </S.EmptyState>
    );
  } else if (isCurrentError && !hasLoadedOnce) {
    resultsContent = (
      <S.EmptyState role="alert">
        <EmptyBoxIcon width={96} height={96} aria-hidden="true" />
        <S.EmptyTitle>상품을 불러올 수 없습니다</S.EmptyTitle>
        <S.EmptySubtitle>다시 시도해 주세요</S.EmptySubtitle>
      </S.EmptyState>
    );
  } else if (pageProducts.length === 0) {
    resultsContent = (
      <S.EmptyState role="status" aria-live="polite">
        <S.StyledNoResultIcon width={96} height={96} aria-hidden="true" />
        <S.EmptyTitle>"{search}"에 대한 검색 결과가 없습니다</S.EmptyTitle>
        <S.EmptySubtitle>검색어를 확인하거나 다시 입력해주세요</S.EmptySubtitle>
      </S.EmptyState>
    );
  } else {
    // 마지막 줄만 placeholder로 채워서 페이지네이션이 실제 상품 수를 따라오게 함
    const placeholderCount =
      (rowSize - (pageProducts.length % rowSize)) % rowSize;

    const gridItems = [
      ...pageProducts.map((product) => ({ key: String(product.id), product })),
      ...Array.from({ length: placeholderCount }).map((_, index) => ({
        key: `placeholder-${index}`,
        product: PLACEHOLDER_PRODUCT,
        isPlaceholder: true,
      })),
    ];

    const rows = [];
    for (let i = 0; i < gridItems.length; i += rowSize) {
      rows.push(gridItems.slice(i, i + rowSize));
    }

    resultsContent = (
      <S.ProductGrid>
        {rows.map((row, rowIndex) => (
          <S.Row key={`row-${rowIndex}`}>
            {row.map((item, itemIndex) =>
              item.isPlaceholder ? (
                <S.GridPlaceholder key={item.key} aria-hidden="true">
                  <ProductCard product={item.product} />
                </S.GridPlaceholder>
              ) : (
                <ProductCard
                  key={item.key}
                  product={item.product}
                  onAddToCart={handleAddToCart}
                  isBest={item.product.isBest}
                  isNew={item.product.isNew}
                  // LCP 후보인 맨 왼쪽 위 카드만 최우선 로딩
                  imagePriority={rowIndex === 0 && itemIndex === 0}
                />
              ),
            )}
          </S.Row>
        ))}
      </S.ProductGrid>
    );
  }

  return (
    <div>
      <S.Main>
        <S.Header>
          <S.Breadcrumb aria-label="현재 위치">
            <S.Trail>
              {breadcrumbTrail.map((crumb, index) => {
                const isCurrent = index === breadcrumbTrail.length - 1;
                return (
                  <S.Crumb
                    key={crumb.label}
                    aria-current={isCurrent ? "page" : undefined}
                  >
                    {crumb.path && !isCurrent ? (
                      <S.CrumbLink to={crumb.path} title="홈으로 이동">
                        {crumb.label}
                      </S.CrumbLink>
                    ) : (
                      crumb.label
                    )}
                  </S.Crumb>
                );
              })}
            </S.Trail>
          </S.Breadcrumb>
          <S.PageTitle>{categoryName}</S.PageTitle>
          <S.PageSubtitle>Take Your SCENERY</S.PageSubtitle>
        </S.Header>

        <S.Content>
          <ProductToolbar
            search={search}
            onSearchChange={(value) => {
              updateSearchParams({ q: value, page: 1 }, { replace: true });
            }}
            sortBy={sortBy}
            onSortChange={(value) =>
              updateSearchParams({ sort: value, page: 1 }, { replace: true })
            }
          />

          {resultsContent}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              updateSearchParams({ page });
              window.scrollTo(0, 0);
            }}
          />
        </S.Content>
      </S.Main>
    </div>
  );
};

export default CategoryPage;

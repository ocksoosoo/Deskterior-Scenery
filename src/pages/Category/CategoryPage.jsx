import { useEffect } from "react";
import { useLocation } from "react-router";
import useCartStore from "../../store/cartStore";
import {
  showSuccessToast,
  showFailToast,
} from "../../components/common/ShowToast";
import ProductCard from "../../components/product/ProductCard";
import ProductToolbar from "../../components/product/ProductToolbar";
import Pagination from "../../components/product/Pagination";
import { FadeLoader } from "react-spinners";
import useLoadingStore from "../../store/UseLoadingStore";
import useCategoriesStore from "../../store/categoriesStore";
import { EmptyBoxIcon } from "../../components/icons/Icons";
import useResponsiveRowSize from "../../hook/useResponsiveRowSize";
import useCategoryPageParams from "../../hook/useCategoryPageParams";
import useCategoryProducts from "../../hook/useCategoryProducts";
import * as S from "../../styles/ListPageStyles/CategoryPage.styles";

const PAGE_SIZE = 6;
// theme.media.mobile(768px)과 반드시 같은 값으로 유지 (theme 쪽 기준이 바뀌면 여기도 함께 변경)
const MOBILE_BREAKPOINT = 768;
// 리사이즈 이벤트가 너무 잦아 매번 리렌더되지 않도록 디바운스
const RESIZE_DEBOUNCE_MS = 150;

const PLACEHOLDER_PRODUCT = { id: "placeholder", name: " ", price: 0 };

const CategoryPage = ({ categoryId = "lighting" }) => {
  const cartItems = useCartStore((s) => s.cartItems);
  const addToCart = useCartStore((s) => s.addToCart);
  const removeItem = useCartStore((s) => s.removeItem);

  const finishPageLoading = useLoadingStore((state) => state.finishPageLoading);

  const { pathname } = useLocation();

  // 모바일 2개, PC/태블릿 3개씩 한 행
  const rowSize = useResponsiveRowSize({
    mobileCount: 2,
    defaultCount: 3,
    breakpoint: MOBILE_BREAKPOINT,
    debounceMs: RESIZE_DEBOUNCE_MS,
  });

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

  const { search, currentPage, sortBy, updateSearchParams } =
    useCategoryPageParams(categoryId);

  const { pageProducts, totalPages, hasLoadedOnce, isCurrentError, productsReady } =
    useCategoryProducts({
      categoryId,
      currentPage,
      sortBy,
      search,
      updateSearchParams,
      pageSize: PAGE_SIZE,
    });

  useEffect(() => {
    if (!categoriesReady || !productsReady) {
      return;
    }

    finishPageLoading(pathname);
  }, [categoriesReady, productsReady, pathname, finishPageLoading]);

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

import { useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router";
import { getProducts, deriveBadgeFields } from "../../api/productsApi";
import useCartStore from "../../store/cartStore";
import {
  showSuccessToast,
  showFailToast,
} from "../../components/common/ShowToast";
import ProductCard from "../../components/product/ProductCard";
import ProductToolbar from "../../components/product/ProductToolbar";
import Pagination from "../../components/product/Pagination";
import useLoadingStore from "../../store/UseLoadingStore";
import useCategoriesStore from "../../store/categoriesStore";
//import { preloadingImages } from "../../utils/preloadingImages";
import { EmptyBoxIcon } from "../../components/icons/Icons";
import * as S from "../../styles/ListPageStyles/CategoryPage.styles";

const PAGE_SIZE = 6;
// 모바일(theme.media.mobile 기준 768px 미만)에서는 한 줄에 2개씩,
// 그 외(태블릿/PC)에서는 3개씩 묶어서 한 행(Row)을 만든다
const MOBILE_BREAKPOINT = 768;

const PLACEHOLDER_PRODUCT = { id: "placeholder", name: " ", price: 0 };

const CategoryPage = ({ categoryId = "lighting" }) => {
  const cartItems = useCartStore((s) => s.cartItems);
  const addToCart = useCartStore((s) => s.addToCart);
  const removeItem = useCartStore((s) => s.removeItem);

  const finishPageLoading = useLoadingStore((state) => state.finishPageLoading);

  const { pathname } = useLocation();

  // 화면 크기에 따라 한 행에 들어가는 상품 개수(2/3)를 동적으로 계산
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < MOBILE_BREAKPOINT,
  );
  useEffect(() => {
    const handleResize = () =>
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const rowSize = isMobile ? 2 : 3;

  // 스토어가 앱 전체에서 딱 한 번만 요청/캐시하므로, 다른 페이지에서 이미
  // 불러왔다면 여기선 다시 요청하지 않고 캐시된 값을 그대로 씀
  // (실패 시 정적 목록 대체와 실패 토스트도 스토어 안에서 한 번만 처리됨)
  const categories = useCategoriesStore((state) => state.categories);
  const categoriesStatus = useCategoriesStore((state) => state.status);
  const categoriesFailed = categoriesStatus === "error";
  const categoriesReady =
    categoriesStatus === "success" || categoriesStatus === "error";
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const category = categories?.find((c) => c.id === categoryId);
  // 카테고리 이름을 못 가져와도(로딩 실패) 상품목록 자체는 볼 수 있도록 categoryId로 폴백
  const categoryName = category?.name ?? categoryId;

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q") ?? "";
  const currentPage = Number(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sort") ?? "name";

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

  const [pageProducts, setPageProducts] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [erroredKey, setErroredKey] = useState(null);

  const [loadedProductsForCategoryId, setLoadedProductsForCategoryId] =
    useState(null);

  const queryKey = `${categoryId}|${currentPage}|${sortBy}|${search}`;
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    let alive = true;

    async function loadProducts() {
      try {
        const data = await getProducts({
          category: categoryId,
          page: currentPage,
          limit: PAGE_SIZE,
          sort: sortBy,
          q: search,
        });

        const products = data.products.map((product) => ({
          ...product,
          ...deriveBadgeFields(product),
        }));

        // 이미지가 전부 로드될 때까지 기다렸다가 스피너를 끄면, 캐시가 없는
        // 상태(시크릿 모드 등)에서 이미지 호스트가 느릴 때 전체 화면이 오래
        // 덮여있게 된다. 홈페이지와 같은 방식으로 데이터만 오면 바로 렌더하고
        // 이미지는 ProductCard의 lazy loading으로 각자 채워지게 둔다
        //await preloadingImages(products.map((product) => product.imageUrl));

        if (!alive) return;

        setPageProducts(products);

        setTotalPages(Math.max(1, data.pagination.totalPages));

        setErroredKey(null);

        hasLoadedRef.current = true;
      } catch (error) {
        console.error("상품목록 로딩 실패:", error);

        if (!alive) return;

        setErroredKey(queryKey);

        if (hasLoadedRef.current) {
          showFailToast("목록을 불러오지 못했습니다. 다시 시도해 주세요.");
        }
      } finally {
        if (alive) {
          setLoadedProductsForCategoryId(categoryId);
        }
      }
    }

    loadProducts();

    return () => {
      alive = false;
    };
  }, [categoryId, currentPage, sortBy, search, queryKey]);

  const productsReady = loadedProductsForCategoryId === categoryId;

  useEffect(() => {
    if (!categoriesReady || !productsReady) {
      return;
    }

    finishPageLoading(pathname);
  }, [categoriesReady, productsReady, pathname, finishPageLoading]);

  // 카테고리/정렬/검색/페이지가 바뀌어 재조회 중이어도, 이미 보여줄 데이터가 있으면
  // 화면 전체를 스피너로 갈아치우지 않고 기존 목록을 유지하다가 새 데이터로 자연스럽게 교체
  const hasLoadedOnce = pageProducts !== null;
  const isCurrentError = erroredKey === queryKey;

  // 카테고리 목록이 아직 로딩 중(실패도 아직 안 함)이면 유효한 categoryId인지도 아직 알 수 없으니 대기
  if (categories === null && !categoriesFailed) {
    return null;
  }

  // 카테고리 목록을 정상적으로 받아왔는데 그 안에 없는 id면 진짜 잘못된 페이지
  if (categories !== null && !category) {
    return null;
  }

  const breadcrumbTrail = [
    { label: "Home", path: "/" },
    { label: categoryName },
  ];

  // 진짜 첫 로딩(에러도 데이터도 아직 없음)일 때만 전체 화면 스피너
  if (!hasLoadedOnce && !isCurrentError) {
    return null;
  }

  const handleAddToCart = async (productId) => {
    if (!pageProducts) return;
    const product = pageProducts.find((p) => p.id === productId);
    if (!product) return;

    try {
      // 1. 장바구니에 해당 상품이 이미 있는지 찾기
      const existingItem = cartItems.find(
        (item) => item.productId === product.id,
      );

      if (existingItem) {
        // 2. 이미 있다면? -> 장바구니에서 빼기
        await removeItem(existingItem.cartItemId);
        showSuccessToast("장바구니에서 삭제했습니다.");
      } else {
        // 3. 없다면? -> 장바구니에 담기
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

  if (isCurrentError && !hasLoadedOnce) {
    resultsContent = (
      <S.EmptyState>
        <EmptyBoxIcon width={96} height={96} aria-hidden="true" />
        <S.EmptyTitle>상품을 불러올 수 없습니다</S.EmptyTitle>
        <S.EmptySubtitle>다시 시도해 주세요</S.EmptySubtitle>
      </S.EmptyState>
    );
  } else if (pageProducts.length === 0) {
    resultsContent = (
      <S.EmptyState>
        <S.StyledNoResultIcon width={96} height={96} aria-hidden="true" />
        <S.EmptyTitle>"{search}"에 대한 검색 결과가 없습니다</S.EmptyTitle>
        <S.EmptySubtitle>검색어를 확인하거나 다시 입력해주세요</S.EmptySubtitle>
      </S.EmptyState>
    );
  } else {
    // PAGE_SIZE(6)만큼 항상 채우면, 실제 상품이 적은 페이지(ex. 2개)에서도
    // 안 보이는 빈 칸이 남은 줄만큼 생겨 페이지네이션이 상품 개수와 무관하게
    // 항상 같은 위치(맨 아래)에 고정돼버린다. 마지막 줄만 채워서 페이지네이션이
    // 실제 상품 개수에 맞게 자연스럽게 따라오게 함 (뷰포트별 한 줄당 개수는 rowSize)
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
            {row.map((item) =>
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

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { getCategories } from "../../api/categoriesApi";
import staticCategories from "../../data/categories";
import { getProducts, deriveBadgeFields } from "../../api/productsApi";
import useCartStore from "../../store/cartStore";
import {
  showSuccessToast,
  showFailToast,
} from "../../components/common/ShowToast";
import ProductCard from "../../components/product/ProductCard";
import ProductToolbar from "../../components/product/ProductToolbar";
import Pagination from "../../components/product/Pagination";
import Loading from "../../components/common/Loading";
import { EmptyBoxIcon } from "../../components/icons/Icons";
import * as S from "../../styles/ListPageStyles/CategoryPage.styles";

const PAGE_SIZE = 6;
// 모바일(theme.media.mobile 기준 768px 미만)에서는 한 줄에 2개씩,
// 그 외(태블릿/PC)에서는 3개씩 묶어서 한 행(Row)을 만든다
const MOBILE_BREAKPOINT = 768;

const PLACEHOLDER_PRODUCT = { id: "placeholder", name: " ", price: 0 };

const CategoryPage = ({ categoryId = "lighting" }) => {
  const addToCart = useCartStore((s) => s.addToCart);

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

  const [categories, setCategories] = useState(null);
  const [categoriesFailed, setCategoriesFailed] = useState(false);
  useEffect(() => {
    let alive = true;
    getCategories()
      .then((data) => {
        if (alive) setCategories(data);
      })
      .catch((err) => {
        console.error("카테고리 로딩 실패:", err);
        if (!alive) return;
        setCategoriesFailed(true);
        // API가 실패해도 이름/경로는 항상 같은 정적 목록으로 대체해서 slug 대신 정상 표기되게 함
        setCategories(staticCategories);
        showFailToast("페이지 정보를 불러오지 못했습니다.");
      });
    return () => {
      alive = false;
    };
  }, []);

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

  const queryKey = `${categoryId}|${currentPage}|${sortBy}|${search}`;
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    let alive = true;
    getProducts({
      category: categoryId,
      page: currentPage,
      limit: PAGE_SIZE,
      sort: sortBy,
      q: search,
    })
      .then((data) => {
        if (!alive) return;
        setPageProducts(
          data.products.map((product) => ({
            ...product,
            ...deriveBadgeFields(product),
          })),
        );
        setTotalPages(Math.max(1, data.pagination.totalPages));
        setErroredKey(null);
        hasLoadedRef.current = true;
      })
      .catch((err) => {
        console.error("상품목록 로딩 실패:", err);
        if (!alive) return;
        setErroredKey(queryKey);
        // 이미 목록을 보여준 상태라 화면은 그대로 유지되니, 실패했다는 것만 토스트로 알림
        if (hasLoadedRef.current) {
          showFailToast("목록을 불러오지 못했어요. 다시 시도해주세요.");
        }
      });
    return () => {
      alive = false;
    };
  }, [categoryId, currentPage, sortBy, search, queryKey]);

  // 카테고리/정렬/검색/페이지가 바뀌어 재조회 중이어도, 이미 보여줄 데이터가 있으면
  // 화면 전체를 스피너로 갈아치우지 않고 기존 목록을 유지하다가 새 데이터로 자연스럽게 교체
  const hasLoadedOnce = pageProducts !== null;
  const isCurrentError = erroredKey === queryKey;

  // 카테고리 목록이 아직 로딩 중(실패도 아직 안 함)이면 유효한 categoryId인지도 아직 알 수 없으니 대기
  if (categories === null && !categoriesFailed) {
    return <Loading />;
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
    return <Loading />;
  }

  const handleAddToCart = async (productId) => {
    if (!pageProducts) return;
    const product = pageProducts.find((p) => p.id === productId);
    if (!product) return;

    try {
      await addToCart({
        productId: product.id,
        name: product.name,
        price: product.discountPrice || product.price,
        imageUrl: product.imageUrl,
        isSoldOut: product.soldOut,
      });
      showSuccessToast("상품이 장바구니에 담겼습니다");
    } catch (err) {
      console.error("장바구니 담기 실패:", err);
      showFailToast("장바구니 담기에 실패했습니다");
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
    const placeholderCount = PAGE_SIZE - pageProducts.length;

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
                      <S.CrumbLink to={crumb.path}>{crumb.label}</S.CrumbLink>
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

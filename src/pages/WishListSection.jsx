import {
  WishlistContainer,
  WishlistHeader,
  WishlistTitle,
  DeleteAllButton,
  WishlistList,
  WishlistItem,
  MoreButtonWrapper,
  MoreButton,
  EmptyState,
  EmptyIconWrapper,
  EmptyText,
  ExploreButton,
} from "../styles/WishListSection.styles";
import ProductCard from "../components/product/ProductCard";
import Loading from "../components/common/Loading";
import Modal from "../components/common/Modal";
import {
  showFailToast,
  showSuccessToast,
} from "../components/common/ShowToast";
import { wishlistApi } from "../api/wishlistApi";

import useWishlistStore from "../store/wishlistStore";
import useCartStore from "../store/cartStore";
import useProductCatalogStore from "../store/productCatalogStore";

import { useState, useEffect } from "react";

// 보여줄 최대 카드 수
const INITIAL_PAGE_SIZE = 6;
const MORE_PAGE_SIZE = 3;

function WishlistSection() {
  const [items, setItems] = useState([]);
  const [visibleCount, setVisiblecount] = useState(INITIAL_PAGE_SIZE);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const visibleItems = items.slice(0, visibleCount);
  const hasItems = items.length > 0;
  const hasMore = visibleCount < items.length;

  const setLikedIds = useWishlistStore((state) => state.setLikedIds);
  const addToCart = useCartStore((state) => state.addToCart);
  const fetchCatalog = useProductCatalogStore((state) => state.fetchCatalog);

  // 위시리스트 조회
  useEffect(() => {
    let ignore = false;

    async function fetchWishlist() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        // /wishlist 응답에는 badge/stock(Best·New·Sold out 판단 근거)이 아예
        // 내려오지 않아서, 카탈로그(id로 캐싱된 상품 목록)와 함께 불러와 보강한다.
        // fetchCatalog는 앱 전체에서 한 번만 요청하고 이후엔 캐시를 재사용하며,
        // 실패해도 내부에서 처리하고 빈 객체를 반환하므로 여기서 따로 catch할 필요는 없다
        // 카탈로그 자체가 이전에 실패한 상태(쿨다운 중)라면, 사용자가
        // Retry를 눌렀을 때만 그 쿨다운을 무시하고 다시 시도한다. 위시리스트만
        // 실패했던 거라면 카탈로그는 이미 정상/캐시 상태이므로 강제할 필요가 없다
        const isCatalogRetryable =
          retryCount > 0 &&
          useProductCatalogStore.getState().status === "error";

        const [response, catalogById] = await Promise.all([
          wishlistApi.getWishlist(),
          fetchCatalog({ force: isCatalogRetryable }),
        ]);

        if (!response.success) {
          throw new Error(
            response.message || "위시리스트를 불러오지 못했습니다.",
          );
        }

        // 언마운트되었거나 그 사이 재요청(retry)이 걸렸다면, 방금 끝난
        // 이 응답으로 최신 상태를 덮어쓰지 않도록 확인
        if (ignore) return;

        // 응답 형태(response.data.products)에 맞춰 안전하게 추출
        const rawProducts = response.data?.products || response.data || [];

        const wishlistProducts = rawProducts.map((item) => {
          const id = item.id ?? item.productId;
          const catalogProduct = catalogById[id];

          return {
            ...catalogProduct,
            ...item,
            id,
            rating: item.rating ?? item.averageRating ?? catalogProduct?.rating,
            reviewCount:
              item.reviewCount ??
              item.totalCount ??
              catalogProduct?.reviewCount,
            isBest: catalogProduct?.isBest ?? false,
            isNew: catalogProduct?.isNew ?? false,
            soldOut: catalogProduct?.soldOut ?? false,
          };
        });

        setItems(wishlistProducts);

        // 조회 성공 시 store에 id 저장
        setLikedIds(wishlistProducts.map((item) => item.id));
      } catch (error) {
        if (ignore) return;
        console.error("위시리스트 조회 실패:", error);
        setErrorMessage(error.message || "위시리스트를 불러오지 못했습니다.");
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }
    fetchWishlist();

    return () => {
      ignore = true;
    };
  }, [setLikedIds, fetchCatalog, retryCount]);
  // handleConfirmDeleteAll(): 전체 삭제
  async function handleConfirmDeleteAll() {
    if (isDeleting) return;

    setIsDeleting(true);

    try {
      // 서버 삭제 요청
      const response = await wishlistApi.clearWishlist();

      if (!response.success) {
        throw new Error(response.message || "전체 삭제에 실패했습니다.");
      }

      setItems([]);
      setLikedIds([]); // 로컬 상태 변경
      setVisiblecount(INITIAL_PAGE_SIZE);
      setIsDeleteModalOpen(false);

      showSuccessToast("위시리스트가 모두 삭제되었습니다.");
    } catch (error) {
      console.error("위시리스트 전체 삭제 실패:", error);
      showFailToast(error.message || "위시리스트 전체 삭제에 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  }

  // handleLoadMore(): '+' 버튼 클릭 시 다음 6개 보이기
  function handleLoadMore() {
    setVisiblecount((previousCount) => previousCount + MORE_PAGE_SIZE);
  }

  // handleWishlistRemove(): 위시 리스트를 화면 목록에서 제거
  function handleWishlistRemove(productId) {
    setItems((previousItems) =>
      previousItems.filter((item) => item.id !== productId),
    );
  }

  // handleAddToCart(): 장바구니 추가
  async function handleAddToCart(productId) {
    const product = items.find((item) => item.id === productId);

    if (!product) return;

    try {
      await addToCart(
        {
          productId: product.id,
          name: product.name,
          categoryId: product.categoryId,
          price: product.price,
          imageUrl: product.imageUrl,
        },
        1,
      );

      showSuccessToast("장바구니에 담았습니다.");
    } catch (error) {
      console.error("장바구니 담기 실패:", error);
      showFailToast(error.message || "장바구니에 담지 못했습니다.");
    }
  }

  return (
    <WishlistContainer>
      <WishlistHeader>
        <WishlistTitle>Wish List</WishlistTitle>

        {!isLoading && !errorMessage && hasItems && (
          <DeleteAllButton
            type="button"
            disabled={isDeleting}
            title="전체 삭제"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete All
          </DeleteAllButton>
        )}
      </WishlistHeader>

      {/* 위시 카드 영역 */}
      {/* 로딩 상태일 때 로딩 문구를 보여주고, 로딩이 완료되고 리스트에 담긴 상품이 있으면 보여준다. */}
      {isLoading ? (
        <EmptyState role="status" aria-live="polite">
          <Loading />
          <EmptyText>위시리스트를 불러오는 중입니다...</EmptyText>
        </EmptyState>
      ) : errorMessage ? (
        <EmptyState>
          <EmptyText role="alert">{errorMessage}</EmptyText>

          <ExploreButton
            as="button"
            type="button"
            title="다시 시도"
            onClick={() => setRetryCount((count) => count + 1)}
          >
            Retry
          </ExploreButton>
        </EmptyState>
      ) : hasItems ? (
        <>
          <WishlistList>
            {visibleItems.map((item) => (
              <WishlistItem key={item.id}>
                <ProductCard
                  product={item}
                  onWishlistRemove={handleWishlistRemove}
                  onAddToCart={handleAddToCart}
                  isBest={item.isBest}
                  isNew={item.isNew}
                />
              </WishlistItem>
            ))}
          </WishlistList>

          {/* 하단 더보기(+) */}
          {hasMore && (
            <MoreButtonWrapper>
              <MoreButton
                type="button"
                aria-label="상품 더보기"
                title="상품 더보기"
                onClick={handleLoadMore}
              >
                +
              </MoreButton>
            </MoreButtonWrapper>
          )}
        </>
      ) : (
        <EmptyState>
          <EmptyIconWrapper>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="120"
              height="96"
              viewBox="0 0 120 96"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M101.903 6.10913C106.762 6.10926 111.004 9.13348 112.211 13.4565L119.6 39.9194C119.957 41.1975 120.029 42.53 119.81 43.8342L115.518 69.4565C114.719 74.2246 110.252 77.7446 104.999 77.7448H40.9914C37.8143 84.8705 30.1885 89.8907 21.286 89.8909C9.53041 89.8909 6.2693e-05 81.1381 0 70.3416C0.000219422 61.0006 7.13417 53.1895 16.6711 51.2535L15.4847 43.792C15.2812 42.5116 15.3562 41.2063 15.706 39.9528L23.1042 13.4565C24.3113 9.13339 28.5542 6.10913 33.4138 6.10913H101.903ZM21.286 53.5853C11.2099 53.5853 3.0413 61.0877 3.04105 70.3416C3.04111 79.5958 11.2098 87.098 21.286 87.098C31.362 87.0977 39.5295 79.5956 39.5296 70.3416C39.5294 61.0878 31.3618 53.5856 21.286 53.5853ZM21.286 75.9275C23.3848 75.9278 25.0867 77.4908 25.087 79.4184C25.0866 81.3459 23.3848 82.909 21.286 82.9092C19.187 82.9092 17.4854 81.3461 17.485 79.4184C17.4853 77.4906 19.1869 75.9275 21.286 75.9275ZM21.286 78.7192C20.8663 78.7192 20.525 79.033 20.5247 79.4184C20.5251 79.8037 20.8664 80.1163 21.286 80.1163C21.7054 80.116 22.0456 79.8035 22.0459 79.4184C22.0457 79.0331 21.7054 78.7195 21.286 78.7192ZM18.4933 43.3892L19.6798 50.8469C20.2098 50.8106 20.7459 50.7924 21.286 50.7924C33.0412 50.7926 42.5704 59.5455 42.5707 70.3416C42.5706 71.9296 42.3645 73.4737 41.9754 74.9519H104.999C108.751 74.9517 111.941 72.438 112.512 69.0326L116.804 43.409L116.814 43.3557L116.818 43.3222H94.1457L87.7194 51.5857C85.7216 54.1544 82.4963 55.6791 79.0592 55.6791H57.2158C53.7787 55.6791 50.5533 54.1544 48.5556 51.5857L42.1293 43.3222H18.4839L18.4933 43.3892ZM21.286 57.7741C23.3847 57.7743 25.0865 59.3375 25.087 61.2649V69.6437C25.0868 71.5713 23.3848 73.1343 21.286 73.1346C19.1869 73.1346 17.4852 71.5715 17.485 69.6437V61.2649C17.4855 59.3373 19.1871 57.7741 21.286 57.7741ZM21.286 60.567C20.8664 60.567 20.5252 60.8797 20.5247 61.2649V69.6437C20.5249 70.0291 20.8663 70.3416 21.286 70.3416C21.7055 70.3414 22.0457 70.029 22.0459 69.6437V61.2649C22.0455 60.8799 21.7053 60.5673 21.286 60.567ZM36.2591 35.3798C34.1607 35.3798 32.3933 36.6822 31.8615 38.4541C31.8363 38.5914 31.8146 38.7305 31.7981 38.8706L31.6982 39.7235V40.5305H42.9108C43.4016 40.5305 43.8631 40.7477 44.1485 41.1144L51.0297 49.963C52.4567 51.7977 54.7608 52.8861 57.2158 52.8861H79.0592C81.5142 52.8861 83.8183 51.7977 85.2452 49.963L92.1264 41.1144C92.4118 40.7477 92.8734 40.5305 93.3642 40.5305H103.616V39.7805L103.309 38.3115C103.271 38.1254 103.224 37.9412 103.17 37.7611C102.435 36.353 100.868 35.38 99.0548 35.3798H36.2591ZM33.4138 8.90206C29.9428 8.90206 26.9118 11.0618 26.0494 14.1495L18.685 40.5305H28.6571V21.9172C28.6574 18.0615 32.0609 14.9355 36.2591 14.9354H99.0548C103.253 14.9358 106.657 18.0617 106.657 21.9172V40.5305H116.632L109.266 14.1495C108.403 11.0619 105.374 8.90219 101.903 8.90206H33.4138ZM36.2591 17.7271C33.7402 17.7272 31.6984 19.6038 31.6982 21.9172V25.1576C32.9687 24.2813 34.5479 23.7618 36.2591 23.7618H99.0548C100.766 23.7619 102.345 24.2813 103.616 25.1576V21.9172C103.615 19.604 101.573 17.7275 99.0548 17.7271H36.2591Z"
                fill="#E8E6DF"
              />
            </svg>
          </EmptyIconWrapper>
          <EmptyText>위시리스트가 비어 있습니다.</EmptyText>
          <ExploreButton to="/" title="상품 둘러보기">
            Explore Items
          </ExploreButton>
        </EmptyState>
      )}

      {isDeleteModalOpen && (
        <Modal
          title="All Delete?"
          description="위시리스트의 모든 상품을 삭제하시겠습니까?"
          confirmText="Delete"
          confirmTitle="전체 삭제"
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDeleteAll}
        />
      )}
    </WishlistContainer>
  );
}

export { WishlistSection };

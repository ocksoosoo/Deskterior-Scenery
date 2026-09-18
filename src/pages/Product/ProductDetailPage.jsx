import { useEffect, useLayoutEffect, useState } from "react";
import { Global, css } from "@emotion/react";
import { useLocation, useParams } from "react-router";
import useAuthStore from "../../store/UseAuthStore";
import ProductBreadcrumb from "../../components/product/ProductBreadcrumb";
import ProductImageGallery from "../../components/product/ProductImageGallery";
import ProductInfo from "../../components/product/ProductInfo";
import PurchaseBox from "../../components/product/PurchaseBox";
import MobileCtaBar from "../../components/product/MobileCtaBar";
import ProductDetailContent from "../../components/product/ProductDetailContent";
import ReviewSection from "../../components/review/ReviewSection";
import PaymentModal from "../../components/common/PaymentModal";
import useLoadingStore from "../../store/UseLoadingStore";
import {
  showSuccessToast,
  showFailToast,
} from "../../components/common/ShowToast";
import { getProduct } from "../../api/productsApi";
import useCartStore from "../../store/cartStore";
import useWishlistStore from "../../store/wishlistStore";
import { wishlistApi } from "../../api/wishlistApi";
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../../api/reviewsApi";
import * as S from "../../styles/ProductDetail/ProductDetailPage.styles";

const ProductDetailPage = () => {
  const user = useAuthStore((state) => state.user);

  const finishPageLoading = useLoadingStore((state) => state.finishPageLoading);

  const { id } = useParams();
  const { hash, pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [id]);

  const [quantity, setQuantity] = useState(1);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const addToCart = useCartStore((s) => s.addToCart);

  const [product, setProduct] = useState(null);
  const [productError, setProductError] = useState(false);

  // ProductCard와 동일한 전역 스토어를 사용

  const isWished = useWishlistStore((state) => state.likedIds.has(product?.id));
  const toggleWish = useWishlistStore((state) => state.toggleLike);
  const [isWishlistPending, setIsWishlistPending] = useState(false);

  const [loadedProductForId, setLoadedProductForId] = useState(null);

  useEffect(() => {
    let alive = true;

    const loadProduct = async () => {
      try {
        const data = await getProduct(id);

        if (!alive) return;

        setProduct(data);
        setProductError(false);
      } catch (err) {
        console.error("상품 로딩 실패:", err);

        if (alive) {
          setProductError(true);
        }
      } finally {
        if (alive) setLoadedProductForId(id);
      }
    };

    loadProduct();

    return () => {
      alive = false;
    };
  }, [id]);

  const isCurrentProduct = product != null && String(product.id) === id;
  const [reviews, setReviews] = useState([]);

  const [loadedReviewsForId, setLoadedReviewsForId] = useState(null);
  const reviewsLoaded = loadedReviewsForId === id;
  const productLoaded = loadedProductForId === id;

  // 상품(id)이 바뀌거나 로그인 상태(user)가 바뀌면 리뷰 목록 새로 조회
  useEffect(() => {
    let alive = true;
    getReviews(id)
      .then((data) => {
        if (alive) setReviews(data.reviews);
      })
      .catch((err) => console.error("리뷰 로딩 실패:", err))
      .finally(() => {
        if (alive) setLoadedReviewsForId(id);
      });
    return () => {
      alive = false;
    };
  }, [id, user]);

  useEffect(() => {
    if (!productLoaded || !reviewsLoaded) {
      return;
    }

    finishPageLoading(pathname);
  }, [productLoaded, reviewsLoaded, pathname, finishPageLoading]);

  const reloadReviews = () =>
    getReviews(id)
      .then((data) => setReviews(data.reviews))
      .catch((err) => console.error("리뷰 로딩 실패:", err));

  useEffect(() => {
    if (!hash || !isCurrentProduct || !reviewsLoaded) return;

    let settleTimer;
    let scrolled = false;
    const scrollToHash = () => {
      if (scrolled) return;
      scrolled = true;
      observer.disconnect();
      document
        .querySelector(hash)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const scheduleScroll = () => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(scrollToHash, 150);
    };

    const observer = new ResizeObserver(scheduleScroll);
    observer.observe(document.body);
    scheduleScroll();

    return () => {
      clearTimeout(settleTimer);
      observer.disconnect();
    };
  }, [hash, isCurrentProduct, reviewsLoaded]);

  const reviewCount = reviews.length;
  const averageRating =
    reviewCount === 0
      ? 0
      : reviews.reduce((sum, review) => sum + (review.rating ?? 0), 0) /
        reviewCount;

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      await addToCart(
        {
          productId: product.id,
          name: product.name,
          price: product.discountPrice ?? product.price,
          imageUrl: product.images?.[0],
          isSoldOut: product.soldOut,
        },
        quantity,
      );
      showSuccessToast("장바구니에 담았습니다.");
    } catch (err) {
      console.error("장바구니 담기 실패:", err);
      showFailToast("장바구니 담기에 실패했습니다.");
    }
  };

  const handleToggleWish = async () => {
    if (!product || isWishlistPending) return;

    setIsWishlistPending(true);

    try {
      const response = isWished
        ? await wishlistApi.removeWishlistItem(product.id)
        : await wishlistApi.addWishlistItem(product.id);

      if (!response.success) {
        throw new Error(response.message || "위시리스트 등록에 실패했습니다.");
      }

      toggleWish(product.id);
      showSuccessToast(
        isWished ? "위시리스트에서 삭제되었습니다." : "위시리스트에 추가되었습니다.",
      );
    } catch (err) {
      console.error("위시리스트 변경 실패:", err);
      showFailToast("로그인 후 이용할 수 있습니다.");
    } finally {
      setIsWishlistPending(false);
    }
  };

  const handleCheckout = () => {
    if (!product || product.soldOut) return;
    if (!user) {
      showFailToast("로그인이 필요한 서비스입니다.");
      return;
    }
    setIsPaymentModalOpen(true);
  };

  const confirmPayment = async () => {
    setIsPaymentModalOpen(false);
    showSuccessToast("결제가 완료되었습니다.");
  };

  const handleCreateReview = async (payload) => {
    await createReview(id, payload);
    await reloadReviews();
    showSuccessToast("리뷰가 등록되었습니다.");
  };

  const handleUpdateReview = async (reviewId, payload) => {
    await updateReview(reviewId, payload);
    await reloadReviews();
    showSuccessToast("리뷰가 수정되었습니다.");
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      await reloadReviews();
      showSuccessToast("리뷰가 삭제되었습니다.");
    } catch (err) {
      showFailToast(err.message || "리뷰 삭제에 실패했습니다.");
    }
  };

  if (productError) {
    return (
      <S.Wrapper>
        <S.Page>
          <p>상품을 불러올 수 없어요.</p>
        </S.Page>
      </S.Wrapper>
    );
  }

  if (!isCurrentProduct) {
    return (
      <S.Wrapper>
        <S.Page style={{ minHeight: "1600px" }} />
      </S.Wrapper>
    );
  }

  return (
    <>
      {/* 이 페이지에 떠있는 모바일 CTA 바(81px)에 푸터 하단 콘텐츠가 가리지 않도록*/}
      <Global
        styles={css`
          @media (width < 768px) {
            /* footer[class]: footer(태그) + [class](속성) 선택자를 합쳐서
               Footer.styles.jsx의 단일 클래스 선택자(.css-xxxx)보다
               우선순위를 한 단계 높임 (!important 없이 이김) */
            footer[class] {
              padding-bottom: calc(
                32px + 81px + env(safe-area-inset-bottom, 0px)
              );
            }
          }
        `}
      />
      <S.Wrapper>
        <S.Page>
          <S.TopGrid>
            <S.CrumbSlot>
              <ProductBreadcrumb
                category={product.category}
                categoryPath={product.categoryPath}
                productName={product.name}
              />
            </S.CrumbSlot>

            <S.GalleryColumn>
              <ProductImageGallery
                key={id}
                images={product.images}
                alt={product.name}
                soldOut={product.soldOut}
                isBest={product.isBest}
                isNew={product.isNew}
              />
            </S.GalleryColumn>

            <S.InfoColumn>
              <ProductInfo
                name={product.name}
                category={product.category}
                rating={averageRating}
                reviewCount={reviewCount}
                price={product.price}
                description={product.description}
              />
              <PurchaseBox
                quantity={quantity}
                onQuantityChange={setQuantity}
                onAddToCart={handleAddToCart}
                onCheckout={handleCheckout}
                isWished={isWished}
                onToggleWish={handleToggleWish}
                wishPending={isWishlistPending}
                soldOut={product.soldOut}
              />
            </S.InfoColumn>
          </S.TopGrid>

          <ProductDetailContent sections={product.detailSections} />

          <ReviewSection
            key={id}
            reviews={reviews}
            average={averageRating}
            isLoggedIn={Boolean(user)}
            onCreate={handleCreateReview}
            onUpdate={handleUpdateReview}
            onDelete={handleDeleteReview}
          />

          <MobileCtaBar
            isWished={isWished}
            onToggleWish={handleToggleWish}
            wishPending={isWishlistPending}
            onAddToCart={handleAddToCart}
            onCheckout={handleCheckout}
            soldOut={product.soldOut}
          />
        </S.Page>
      </S.Wrapper>

      {isPaymentModalOpen && (
        <PaymentModal
          onClose={() => setIsPaymentModalOpen(false)}
          onConfirm={confirmPayment}
        />
      )}
    </>
  );
};

export default ProductDetailPage;

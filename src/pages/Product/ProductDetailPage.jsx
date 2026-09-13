import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import useAuthStore from "../../store/UseAuthStore";
import ProductBreadcrumb from "../../components/product/ProductBreadcrumb";
import ProductImageGallery from "../../components/product/ProductImageGallery";
import ProductInfo from "../../components/product/ProductInfo";
import PurchaseBox from "../../components/product/PurchaseBox";
import MobileCtaBar from "../../components/product/MobileCtaBar";
import ProductDetailContent from "../../components/product/ProductDetailContent";
import ReviewSection from "../../components/review/ReviewSection";
import ScrollTopButton from "../../components/common/ScrollTopButton";
import useLoadingStore from "../../store/UseLoadingStore";
import { preloadingImages } from "../../utils/preloadingImages";
import {
  showSuccessToast,
  showFailToast,
} from "../../components/common/ShowToast";
import { getProduct } from "../../api/productsApi";
import useCartStore from "../../store/cartStore";
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../../api/reviewsApi";
import * as S from "../../styles/ProductDetail/ProductDetailPage.styles";

const ProductDetailPage = () => {
  const user = useAuthStore((state) => state.user);

  const startLoading = useLoadingStore((state) => state.startLoading);
  const endLoading = useLoadingStore((state) => state.endLoading);

  const { id } = useParams();
  const { hash } = useLocation();

  // 이전 페이지의 스크롤 위치가 그대로 이어지지 않도록, 상품이 바뀔 때마다 항상 맨 위에서 시작
  // (해시가 있으면 ScrollRestoration이 리셋을 건너뛰기 때문에, 리뷰로 스크롤하는 방향이
  //  이전 스크롤 위치에 따라 위/아래로 들쭉날쭉해지는 것을 막기 위함)
  useLayoutEffect(() => {
    // CSS의 scroll-behavior: smooth 때문에 인자 없는 scrollTo(0,0)도 애니메이션이 걸리므로,
    // behavior: "instant"를 명시해서 진짜로 즉시 이동시킨다
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [id]);

  const [quantity, setQuantity] = useState(1);
  const [isWished, setIsWished] = useState(false);

  const addToCart = useCartStore((s) => s.addToCart);

  const [product, setProduct] = useState(null);
  const [productError, setProductError] = useState(false);

  useEffect(() => {
    let alive = true;
    // 이미지 미리 로딩 중 페이지를 떠나도(unmount) 전역 로딩 카운트가 남지 않도록,
    // 자연 완료/언마운트 둘 중 먼저 오는 시점에 한 번만 endLoading을 호출한다
    let loadingEnded = false;
    const finishLoading = () => {
      if (loadingEnded) return;
      loadingEnded = true;
      endLoading();
    };

    const loadProduct = async () => {
      startLoading();

      try {
        const data = await getProduct(id);

        await preloadingImages(data.images ?? []);

        if (!alive) return;

        setProduct(data);
        setProductError(false);
      } catch (err) {
        console.error("상품 로딩 실패:", err);

        if (alive) {
          setProductError(true);
        }
      } finally {
        finishLoading();
      }
    };

    loadProduct();

    return () => {
      alive = false;
      finishLoading();
    };
  }, [id, startLoading, endLoading]);

  const isCurrentProduct = product != null && String(product.id) === id;

  const [reviews, setReviews] = useState([]);
  // 리뷰 로딩이 끝난 상품 id를 기록 - 현재 id와 비교해 "이 상품 리뷰까지 로드 완료"를 파생시킴
  const [loadedReviewsForId, setLoadedReviewsForId] = useState(null);
  const reviewsLoaded = loadedReviewsForId === id;

  // 상품(id)이 바뀌거나 로그인 상태(user)가 바뀌면 리뷰 목록 새로 조회
  // (같은 페이지에서 로그인/로그아웃해도 isAuthor 가 최신 상태로 갱신되게)
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

  const reloadReviews = () =>
    getReviews(id)
      .then((data) => setReviews(data.reviews))
      .catch((err) => console.error("리뷰 로딩 실패:", err));

  // 상세 이미지들이 하나씩 늦게 로드되며 레이아웃이 계속 바뀌기 때문에,
  // 크기 변화가 잠잠해지면 스크롤하되 - 한 번 스크롤한 뒤에는 이후 이미지 로딩으로
  // 또 움직이지 않도록 더 이상 반응하지 않는다 (약간의 위치 오차보다 정확한 위치가 우선)
  // 페이지 이동(다른 곳에서 클릭해서 왔든, 새로고침했든) 자체가 이미 "새 화면"이므로
  // 스크롤 애니메이션 없이 항상 그 위치에 바로 자리잡는다
  useEffect(() => {
    if (!hash || !isCurrentProduct || !reviewsLoaded) return;

    let settleTimer;
    let scrolled = false;
    const scrollToHash = () => {
      if (scrolled) return;
      scrolled = true;
      observer.disconnect();
      document.querySelector(hash)?.scrollIntoView({ behavior: "instant", block: "start" });
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

  //별점·리뷰 수는 리뷰 목록에서 계산
  const reviewCount = reviews.length;
  const averageRating =
    reviewCount === 0
      ? 0
      : reviews.reduce((sum, review) => sum + (review.rating ?? 0), 0) /
        reviewCount;

  const handleAddToCart = async () => {
    if (!product) return;

    // 상세페이지 상품(id/images/soldOut) → 장바구니가 쓰는 모양(productId/imageUrl/isSoldOut)
    try {
      await addToCart(
        {
          productId: product.id,
          name: product.name,
          price: product.discountPrice || product.price,
          imageUrl: product.images?.[0],
          isSoldOut: product.soldOut,
        },
        quantity,
      );
      showSuccessToast("장바구니에 담겼습니다");
    } catch (err) {
      console.error("장바구니 담기 실패:", err);
      showFailToast("장바구니 담기에 실패했습니다");
    }
  };

  const handleToggleWish = () => {
    setIsWished((prev) => !prev);
    console.log("찜 토글", { productId: id });
  };

  const handleCheckout = () => {
    console.log("결제하기", { productId: id, quantity });
  };

  //리뷰 CRUD — 서버 연동. 작성/수정은 실패 시 throw 하여 폼이 에러 표시
  const handleCreateReview = async (payload) => {
    await createReview(id, payload);
    await reloadReviews();
    showSuccessToast("리뷰가 등록되었습니다");
  };

  const handleUpdateReview = async (reviewId, payload) => {
    await updateReview(reviewId, payload);
    await reloadReviews();
    showSuccessToast("리뷰가 수정되었습니다");
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId);
      await reloadReviews();
      showSuccessToast("리뷰가 삭제되었습니다");
    } catch (err) {
      showFailToast(err.message || "리뷰 삭제에 실패했습니다");
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

  if (!isCurrentProduct) return null;

  return (
    <S.Wrapper>
      <S.Page>
        <ProductBreadcrumb
          category={product.category}
          categoryPath={product.categoryPath}
          productName={product.name}
        />

        <S.TopSection>
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
              soldOut={product.soldOut}
            />
          </S.InfoColumn>
        </S.TopSection>

        <ProductDetailContent sections={product.detailSections} />

        <ReviewSection
          key={id}
          reviews={reviews}
          isLoggedIn={Boolean(user)}
          onCreate={handleCreateReview}
          onUpdate={handleUpdateReview}
          onDelete={handleDeleteReview}
        />

        <ScrollTopButton />

        <MobileCtaBar
          isWished={isWished}
          onToggleWish={handleToggleWish}
          onAddToCart={handleAddToCart}
          onCheckout={handleCheckout}
          soldOut={product.soldOut}
        />
      </S.Page>
    </S.Wrapper>
  );
};

export default ProductDetailPage;

import { useId, useState } from "react";
import { useTheme } from "@emotion/react";
import { BasketIcon, HeartIcon, StarIcon } from "../icons/Icons";
import Badge from "../common/Badge";
import { showSuccessToast, showFailToast } from "../common/ShowToast";
import { wishlistApi } from "../../api/wishlistApi";
import useWishlistStore from "../../store/wishlistStore";
import useCartStore from "../../store/cartStore";
import PRODUCT_NAME_KO from "../../data/productNamesKo";
import { toResizedImageUrl } from "../../utils/imageProxy";
import * as S from "../../styles/ListPageStyles/ProductCard.styles";

// 바구니 아이콘 안쪽 창(구멍) 영역 - 아이콘 자체 path의 안쪽 사각형 좌표와 동일
const BASKET_WINDOW_POINTS = "19.04,8.25 7.44,8.25 8.62,14.75 17.41,14.75";

// 카드 이미지 표시 크기(약 186px)의 2배(레티나 대응)로 리사이징
const CARD_IMAGE_WIDTH = 400;

const ProductCard = ({
  product,
  onAddToCart,
  onWishlistRemove,
  showCategory = false,
  isBest = false,
  isNew = false,
  // 카드 배경색을 바깥에서 직접 지정 (기본값은 스타일 쪽에서 처리)
  background,
  imagePriority = false,
}) => {
  const theme = useTheme();
  const liked = useWishlistStore((state) => state.likedIds.has(product.id));
  const toggleLike = useWishlistStore((state) => state.toggleLike);
  const [isWishlistPending, setIsWishlitPending] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const clipId = useId();
  const inCart = useCartStore((state) =>
    state.cartItems.some(
      (item) => String(item.productId) === String(product.id),
    ),
  );

  const safeRating = Math.min(5, Math.max(0, Number(product.rating) || 0));
  const safeCount = Number(product.reviewCount) || 0;
  const safePrice = Number(product.price) || 0;

  // 빈(placeholder) 카드는 링크 없음
  const isClickable = Boolean(product?.id) && product.id !== "placeholder";

  const handleToggleLike = async () => {
    // 연속 클릭으로 요청이 중복되는 것을 방지
    if(isWishlistPending) return;

    setIsWishlitPending(true);

    try {
      const response = liked
      ? await wishlistApi.removeWishlistItem(product.id)
      : await wishlistApi.addWishlistItem(product.id);

      if(!response.success) {
        throw new Error(response.message || "위시리스트 등록에 실패했습니다.");
      }
      
      toggleLike(product.id);

      if(liked) {
        onWishlistRemove?.(product.id);
      }

      showSuccessToast(
        liked
        ? "위시리스트에서 삭제되었습니다."
        : "위시리스트에 추가되었습니다.",
      );
    } catch(error) {
      console.error("위시리스트 변경 실패:", error);
      showFailToast("로그인 후 이용할 수 있습니다.");
    } finally {
      setIsWishlitPending(false);
    }
  };

  const handleAddToCart = () => {
    onAddToCart?.(product.id);
    setJustAdded(true);
  };

  return (
    <S.Card background={background}>
      <S.ImageWrapper>
        {product.soldOut && <S.ImageOverlay />}

        {(product.soldOut || isBest || isNew) && (
          <S.BadgeGroup>
            {product.soldOut && <Badge text="Sold out" />}
            {isBest && <Badge text="Best" size="sm" />}
            {isNew && (
              <Badge text="New" background={theme.colors.textMain} size="sm" />
            )}
          </S.BadgeGroup>
        )}

        {product.imageUrl &&
          (isClickable ? (
            <S.ImageLink
              to={`/products/${product.id}`}
              aria-label={`${product.name} 상세 보기`}
            >
              <S.ProductImage
                src={toResizedImageUrl(product.imageUrl, CARD_IMAGE_WIDTH)}
                alt={product.name}
                loading={imagePriority ? "eager" : "lazy"}
                fetchPriority={imagePriority ? "high" : "auto"}
                decoding="async"
              />
            </S.ImageLink>
          ) : (
            <S.ProductImage
              src={toResizedImageUrl(product.imageUrl, CARD_IMAGE_WIDTH)}
              alt={product.name}
              loading={imagePriority ? "eager" : "lazy"}
              fetchPriority={imagePriority ? "high" : "auto"}
              decoding="async"
            />
          ))}

        <S.IconStack>
          <S.LikeButton
            type="button"
            aria-pressed={liked}
            aria-label={liked ? "위시리스트 등록 해제" : "위시리스트 등록"}
            title={liked ? "찜 해제" : "찜하기"}
            onClick={handleToggleLike}
            disabled={isWishlistPending}
          >
            <HeartIcon filled={liked} width={28} height={28} />
          </S.LikeButton>
          <S.CartButton
            type="button"
            aria-label="장바구니 담기"
            title="담기"
            onClick={handleAddToCart}
            data-just-added={justAdded}
            onAnimationEnd={(event) => {
              // 버튼 자신의 흔들림 애니메이션이 끝났을 때만 반응 (물결 애니메이션 버블링 제외)
              if (event.target === event.currentTarget) setJustAdded(false);
            }}
          >
            <BasketIcon width={24} height={24}>
              {inCart && (
                <>
                  <clipPath id={clipId}>
                    <polygon points={BASKET_WINDOW_POINTS} />
                  </clipPath>
                  <S.CartWaterGroup clipPath={`url(#${clipId})`}>
                    <path
                      d="M-12,10.15 Q-9,9.45 -6,10.15 T0,10.15 T6,10.15 T12,10.15 T18,10.15 T24,10.15 T30,10.15 T36,10.15 V17 H-12 Z"
                      fill="#fff"
                      opacity={0.85}
                    >
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        from="0 0"
                        to="12 0"
                        dur="3.6s"
                        repeatCount="indefinite"
                      />
                    </path>
                    <path
                      d="M-12,10.55 Q-9,9.95 -6,10.55 T0,10.55 T6,10.55 T12,10.55 T18,10.55 T24,10.55 T30,10.55 T36,10.55 V17 H-12 Z"
                      fill="#fff"
                      opacity={0.45}
                    >
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        from="0 0"
                        to="-12 0"
                        dur="4.8s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </S.CartWaterGroup>
                </>
              )}
            </BasketIcon>
          </S.CartButton>
        </S.IconStack>
      </S.ImageWrapper>

      <S.Info>
        {showCategory && product.categoryName && (
          <S.CategoryName>{product.categoryName}</S.CategoryName>
        )}
        {isClickable ? (
          <S.ProductName
            to={`/products/${product.id}`}
            aria-label={`${product.name} 상세 보기`}
            title={PRODUCT_NAME_KO[product.id]}
          >
            {product.name}
          </S.ProductName>
        ) : (
          <S.ProductNameStatic>{product.name}</S.ProductNameStatic>
        )}
        <S.Price>₩ {safePrice.toLocaleString("ko-KR")}</S.Price>
        {isClickable ? (
          <S.Rating
            to={`/products/${product.id}#review`}
            aria-label={`${product.name} 리뷰 보기`}
            title="리뷰로 이동"
          >
            <S.Star>
              <StarIcon width={12} height={12} />
            </S.Star>{" "}
            {safeRating.toFixed(1)}({safeCount})
          </S.Rating>
        ) : (
          <S.RatingStatic>
            <S.Star>
              <StarIcon width={12} height={12} />
            </S.Star>{" "}
            {safeRating.toFixed(1)}({safeCount})
          </S.RatingStatic>
        )}
      </S.Info>
    </S.Card>
  );
};

export default ProductCard;

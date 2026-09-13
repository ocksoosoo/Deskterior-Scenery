import { useId, useState } from "react";
import { useNavigate } from "react-router";
import { useTheme } from "@emotion/react";
import { BasketIcon, HeartIcon, StarIcon } from "../icons/Icons";
import Badge from "../common/Badge";
import { showSuccessToast } from "../common/ShowToast";
import useWishlistStore from "../../store/wishlistStore";
import useCartStore from "../../store/cartStore";
import * as S from "../../styles/ListPageStyles/ProductCard.styles";

// 바구니 아이콘 안쪽 창(구멍) 영역 - 아이콘 자체 path의 안쪽 사각형 좌표와 동일
const BASKET_WINDOW_POINTS = "19.04,8.25 7.44,8.25 8.62,14.75 17.41,14.75";

const ProductCard = ({
  product,
  onAddToCart,
  onToggleLike,
  showCategory = false,
  isBest = false,
  isNew = false,
  // 카드가 놓이는 배경이 카드 자체 배경색과 겹쳐 경계가 안 보이는 경우
  // (ex. 홈 화면 베스트 섹션), 카드 배경을 상품목록 페이지 배경색으로 대신 사용
  useListBackground = false,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const liked = useWishlistStore((state) => state.likedIds.has(product.id));
  const toggleLike = useWishlistStore((state) => state.toggleLike);
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

  const handleToggleLike = () => {
    const next = !liked;
    toggleLike(product.id);
    onToggleLike?.(product.id);
    showSuccessToast(
      next
        ? "상품이 찜 목록에 추가되었습니다."
        : "상품이 찜 목록에서 삭제되었습니다."
    );
  };

  const handleAddToCart = () => {
    onAddToCart?.(product.id);
    setJustAdded(true);
  };

  // 상품명/이미지 클릭 시 상세페이지로 이동
  const handleGoToDetail = (event) => {
    event.stopPropagation();
    if (!isClickable) return;
    navigate(`/products/${product.id}`);
  };

  // 키보드(Tab 으로 포커스 → Enter / Space)로도 상세페이지 이동
  const handleGoToDetailKeyDown = (event) => {
    event.stopPropagation();
    if (!isClickable) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      navigate(`/products/${product.id}`);
    }
  };

  const handleRatingClick = (event) => {
    event.stopPropagation();
    if (!isClickable) return;
    navigate(`/products/${product.id}#review`);
  };

  // 키보드(Tab 으로 포커스 → Enter / Space)로도 리뷰 이동
  const handleRatingKeyDown = (event) => {
    event.stopPropagation();
    if (!isClickable) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      navigate(`/products/${product.id}#review`);
    }
  };

  return (
    <S.Card useListBackground={useListBackground}>
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

        {product.imageUrl && (
          <S.ProductImage
            src={product.imageUrl}
            alt={product.name}
            onClick={handleGoToDetail}
            onKeyDown={handleGoToDetailKeyDown}
            role={isClickable ? "button" : undefined}
            tabIndex={isClickable ? 0 : undefined}
            aria-label={isClickable ? `${product.name} 상세 보기` : undefined}
            style={isClickable ? { cursor: "pointer" } : undefined}
          />
        )}

        <S.IconStack>
          <S.LikeButton
            type="button"
            aria-pressed={liked}
            aria-label="찜하기"
            onClick={handleToggleLike}
          >
            <HeartIcon filled={liked} width={28} height={28} />
          </S.LikeButton>
          <S.CartButton
            type="button"
            aria-label="장바구니 담기"
            onClick={handleAddToCart}
            data-just-added={justAdded}
            onAnimationEnd={(event) => {
              // 버튼 안쪽 물결(waterRise) 애니메이션 종료도 버블링되므로,
              // 버튼 자신의 흔들림(cartShake) 애니메이션이 끝났을 때만 반응하게 함
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
                      fill={theme.colors.emphasis}
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
                      fill={theme.colors.emphasis}
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
        <S.ProductName
          onClick={handleGoToDetail}
          onKeyDown={handleGoToDetailKeyDown}
          role={isClickable ? "button" : undefined}
          tabIndex={isClickable ? 0 : undefined}
          aria-label={isClickable ? `${product.name} 상세 보기` : undefined}
        >
          {product.name}
        </S.ProductName>
        <S.Price>₩ {safePrice.toLocaleString("ko-KR")}</S.Price>
        <S.Rating
          onClick={handleRatingClick}
          onKeyDown={handleRatingKeyDown}
          role={isClickable ? "button" : undefined}
          tabIndex={isClickable ? 0 : undefined}
          aria-label={isClickable ? `${product.name} 리뷰 보기` : undefined}
          style={isClickable ? { cursor: "pointer" } : undefined}
        >
          <S.Star>
            <StarIcon width={12} height={12} />
          </S.Star>{" "}
          {safeRating.toFixed(1)}({safeCount})
        </S.Rating>
      </S.Info>
    </S.Card>
  );
};

export default ProductCard;

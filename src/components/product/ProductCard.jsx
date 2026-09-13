import { useState } from "react";
import { useNavigate } from "react-router";
import { useTheme } from "@emotion/react";
import { BasketIcon, HeartIcon, StarIcon } from "../icons/Icons";
import Badge from "../common/Badge";
import * as S from "../../styles/ListPageStyles/ProductCard.styles";

const ProductCard = ({
  product,
  onAddToCart,
  onToggleLike,
  showCategory = false,
  isBest = false,
  isNew = false,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(!!product.liked);

  const safeRating = Math.min(5, Math.max(0, Number(product.rating) || 0));
  const safeCount = Number(product.reviewCount) || 0;
  const safePrice = Number(product.price) || 0;

  // 빈(placeholder) 카드는 링크 없음
  const isClickable = Boolean(product?.id) && product.id !== "placeholder";

  const handleToggleLike = () => {
    setLiked((prev) => !prev);
    onToggleLike?.(product.id);
  };

  const handleAddToCart = () => onAddToCart?.(product.id);

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
    <S.Card>
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
          >
            <BasketIcon width={24} height={24} />
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

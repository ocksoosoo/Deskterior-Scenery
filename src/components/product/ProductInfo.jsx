import StarRating from "../common/StarRating";
import * as S from "../../styles/ProductDetail/ProductInfo.styles";

const ProductInfo = ({
  name,
  category = "",
  rating = 0,
  reviewCount = 0,
  price = 0,
  description = "",
}) => {
  const safeRating = Math.min(5, Math.max(0, Number(rating) || 0));
  const safePrice = Number(price) || 0;
  const safeCount = Number(reviewCount) || 0;

  return (
    <S.Wrapper>
      {category && <S.Category>{category}</S.Category>}

      <S.Title>{name}</S.Title>

      <S.RatingRow>
        <S.Stars>
          <StarRating value={safeRating} size={16} />
        </S.Stars>
        {safeRating.toFixed(1)} · 리뷰 {safeCount.toLocaleString("ko-KR")}개
      </S.RatingRow>

      <S.Price>₩ {safePrice.toLocaleString("ko-KR")}</S.Price>

      {description && (
        <S.DescBox>
          <S.DescLabel>상품 설명</S.DescLabel>
          <S.DescText>{description}</S.DescText>
        </S.DescBox>
      )}

      <S.Divider />
    </S.Wrapper>
  );
};

export default ProductInfo;

import * as S from "../../styles/ProductDetail/Review.styles";

const ReviewSummary = ({ average, count = 0 }) => {
  const score = Number.isFinite(average) ? average : 0;

  return (
    <S.Summary>
      <S.SummaryTitle>작성된 리뷰</S.SummaryTitle>
      <S.SummaryMeta>
        {score.toFixed(1)} ({count})
      </S.SummaryMeta>
    </S.Summary>
  );
};

export default ReviewSummary;

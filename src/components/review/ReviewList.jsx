import { useState } from "react";
import ReviewItem from "./ReviewItem";
import * as S from "../../styles/ProductDetail/Review.styles";

const INITIAL_COUNT = 3;

const ReviewList = ({ reviews = [], isLoggedIn = false, onEdit, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  if (reviews.length === 0) {
    return (
      <S.EmptyState>
        <S.EmptyIcon aria-hidden="true" />
        <S.EmptyText>등록된 리뷰가 없습니다.</S.EmptyText>
      </S.EmptyState>
    );
  }

  //최신순으로 정렬해서 새 리뷰가 바로 보이게 함
  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  // 4개 이상일 때만 처음엔 3개만 보여주고, + 를 누르면 나머지 전부 노출
  const shown = expanded
    ? sortedReviews
    : sortedReviews.slice(0, INITIAL_COUNT);
  const showMoreButton = !expanded && reviews.length > INITIAL_COUNT;

  return (
    <S.ListWrap>
      <S.List>
        {shown.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            // 로그인 상태가 아니면 무조건 false로 덮어써서 방어한다
            isMine={
              isLoggedIn && Boolean(review.isAuthor) && !review.authorDeleted
            }
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </S.List>

      {showMoreButton && (
        <S.MoreButton
          type="button"
          aria-label="리뷰 더 보기"
          onClick={() => setExpanded(true)}
        >
          +
        </S.MoreButton>
      )}
    </S.ListWrap>
  );
};

export default ReviewList;

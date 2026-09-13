import { useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewSummary from "./ReviewSummary";
import ReviewList from "./ReviewList";
import * as S from "../../styles/ProductDetail/Review.styles";

//리뷰 영역 UI.

const ReviewSection = ({
  reviews = [],
  isLoggedIn = false,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  const [editingId, setEditingId] = useState(null);

  const editingReview =
    editingId == null
      ? undefined
      : reviews.find((review) => review.id === editingId);

  const average =
    reviews.length === 0
      ? 0
      : reviews.reduce((sum, review) => sum + (review.rating ?? 0), 0) /
        reviews.length;

  const handleSubmit = async (payload) => {
    if (editingId != null) {
      await onUpdate?.(editingId, payload);
      setEditingId(null);
    } else {
      await onCreate?.(payload);
    }
  };

  const handleDelete = (id) => {
    if (editingId === id) setEditingId(null);
    onDelete?.(id);
  };

  return (
    <S.Section id="review">
      <S.Header>
        <S.Title>Reviews</S.Title>
        <S.Subtitle>
          구매한 상품에 대한 평가를 남기고 다른 사용자의 리뷰를 확인해 보세요.
        </S.Subtitle>
      </S.Header>

      <ReviewForm
        key={editingId ?? "new"}
        isLoggedIn={isLoggedIn}
        defaultValue={editingReview}
        onSubmit={handleSubmit}
        onCancel={() => setEditingId(null)}
      />

      <ReviewSummary average={average} count={reviews.length} />

      <ReviewList
        reviews={reviews}
        isLoggedIn={isLoggedIn}
        onEdit={setEditingId}
        onDelete={handleDelete}
      />
    </S.Section>
  );
};

export default ReviewSection;

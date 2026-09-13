import { useState } from "react";
import ReviewStars from "./ReviewStars";
import ReviewDeleteModal from "./ReviewDeleteModal";
import * as S from "../../styles/ProductDetail/Review.styles";

const formatDate = (raw) => {
  if (!raw) return "";
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return String(raw);
  const yyyy = parsed.getFullYear();
  const mm = String(parsed.getMonth() + 1).padStart(2, "0");
  const dd = String(parsed.getDate()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd}`;
};

const ReviewItem = ({ review, isMine = false, onEdit, onDelete }) => {
  const authorName = isMine ? "Me" : review.author;
  const rating = review.rating ?? 0;

  const isEdited =
    review.updatedAt &&
    review.createdAt &&
    new Date(review.updatedAt).getTime() !==
      new Date(review.createdAt).getTime();

  const dateLabel = formatDate(
    isEdited ? review.updatedAt : (review.createdAt ?? review.date),
  );

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const confirmDelete = () => {
    setDeleteModalOpen(false);
    onDelete?.(review.id);
  };

  return (
    <>
      <S.Item $mine={isMine}>
        <S.ItemHeader>
          <S.Author $mine={isMine}>{authorName}</S.Author>
          <S.Stars>
            <ReviewStars value={rating} variant="display" size={16} />
          </S.Stars>
          <S.Score>{rating.toFixed(1)}</S.Score>

          {isMine && (
            <S.ItemActions>
              <S.ActionButton
                type="button"
                aria-label={`${authorName} 리뷰 수정`}
                onClick={() => onEdit?.(review.id)}
              >
                Edit
              </S.ActionButton>
              <S.ActionButton
                type="button"
                aria-label={`${authorName} 리뷰 삭제`}
                onClick={() => setDeleteModalOpen(true)}
              >
                Delete
              </S.ActionButton>
            </S.ItemActions>
          )}
        </S.ItemHeader>

        <S.Content>{review.content}</S.Content>

        {dateLabel && (
          <S.DateText>
            {dateLabel}
            {isEdited && " (수정됨)"}
          </S.DateText>
        )}
      </S.Item>

      {deleteModalOpen && (
        <ReviewDeleteModal
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
};

export default ReviewItem;

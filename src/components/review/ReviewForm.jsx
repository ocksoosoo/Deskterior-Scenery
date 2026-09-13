import { useState } from "react";
import { useNavigate } from "react-router";
import ReviewStars from "./ReviewStars";
import Modal from "../common/Modal";
import * as S from "../../styles/ProductDetail/Review.styles";

/**
 * defaultValue 를 주면 "수정" 모드, 없으면 "작성" 모드.
 * 수정 대상이 바뀔 때는 부모에서 key 를 바꿔 remount 시킨다.
 */
const ReviewForm = ({ isLoggedIn = false, defaultValue, onSubmit, onCancel }) => {
  const navigate = useNavigate();
  const isEditing = Boolean(defaultValue);

  const [rating, setRating] = useState(defaultValue?.rating ?? 0);
  const [content, setContent] = useState(defaultValue?.content ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) return;

    // 비로그인 상태에서도 버튼은 눌리되, 여기서 로그인 안내 모달로 분기
    if (!isLoggedIn) {
      setLoginModalOpen(true);
      return;
    }

    if (rating === 0) {
      setError("별점을 선택해 주세요.");
      return;
    }
    if (content.trim() === "") {
      setError("리뷰 내용을 입력해 주세요.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await onSubmit?.({ rating, content: content.trim() });

      if (!isEditing) {
        setRating(0);
        setContent("");
      }
    } catch {
      setError("저장하지 못했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <S.Form onSubmit={handleSubmit}>
        <S.FormRow>
          <S.RatingBox>
            <S.RatingLabel>{rating.toFixed(1)}</S.RatingLabel>
            <ReviewStars
              value={rating}
              onChange={
                isLoggedIn && !submitting
                  ? (nextRating) => {
                      setRating(nextRating);
                      setError("");
                    }
                  : undefined
              }
            />
            {!isLoggedIn && <S.RatingHint>로그인 후 별점 선택</S.RatingHint>}
          </S.RatingBox>

          <S.Textarea
            value={content}
            disabled={!isLoggedIn || submitting}
            placeholder={
              isLoggedIn
                ? "리뷰를 작성해 주세요"
                : "로그인 후 리뷰를 작성할 수 있어요"
            }
            onChange={(event) => {
              setContent(event.target.value);
              setError("");
            }}
          />
        </S.FormRow>

        {error && <S.ErrorText role="alert">{error}</S.ErrorText>}

        <S.FormActions>
          {isEditing && (
            <S.CancelButton
              type="button"
              disabled={submitting}
              onClick={() => onCancel?.()}
            >
              Cancel
            </S.CancelButton>
          )}
          <S.SubmitButton type="submit" disabled={submitting}>
            {submitting ? "Saving..." : isEditing ? "Edit" : "Submit"}
          </S.SubmitButton>
        </S.FormActions>
      </S.Form>

      {loginModalOpen && (
        <Modal
          title="Login Required"
          description="별점 등록과 리뷰 작성을 하려면 먼저 로그인해 주세요."
          confirmText="Login"
          onClose={() => setLoginModalOpen(false)}
          onConfirm={() => {
            setLoginModalOpen(false);
            navigate("/login");
          }}
        />
      )}
    </>
  );
};

export default ReviewForm;

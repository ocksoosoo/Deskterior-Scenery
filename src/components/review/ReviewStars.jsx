import { useId } from "react";

const COLOR = "#EB6923";

// 별점 선택(입력)용 별
const INPUT_STAR = {
  viewBox: "0 0 24 25",
  path: "M12 3.23584L14.0768 9.62743H20.7973L15.3603 13.5777L17.437 19.9692L12 16.019L6.56299 19.9692L8.63974 13.5777L3.20273 9.62743H9.92325L12 3.23584Z",
};

// 리뷰 표시용 별
const DISPLAY_STAR = {
  viewBox: "0 0 18 18",
  path: "M8.94255 3.23584L10.327 7.4969H14.8074L11.1827 10.1304L12.5672 14.3914L8.94255 11.758L5.31787 14.3914L6.70237 10.1304L3.0777 7.4969H7.55804L8.94255 3.23584Z",
};

// 화면엔 안 보이고 스크린리더만 읽는 스타일
// 별점 고르는 숨겨진 라디오 버튼용
const srOnly = {
  position: "absolute",
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  border: 0,
  overflow: "hidden",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
};

const Star = ({ filled, size, shape }) => {
  return (
    <svg width={size} height={size} viewBox={shape.viewBox} aria-hidden="true">
      <path
        d={shape.path}
        fill={filled ? COLOR : "none"}
        stroke={COLOR}
        strokeWidth={2}
        strokeLinecap="butt"
        strokeLinejoin="miter"
      />
    </svg>
  );
};

// 리뷰 표시용 별 하나 (모달 등에서 리뷰 목록과 같은 별 모양을 재사용할 때)
export const ReviewStarIcon = ({ size = 18, filled = true }) => (
  <Star filled={filled} size={size} shape={DISPLAY_STAR} />
);

// 리뷰 영역 전용 별점.
//- onChange 를 주면 네이티브 radio 로 별점 선택(입력용)
//- 안 주면 읽기 전용 (변형: variant="display")
const ReviewStars = ({ value = 0, onChange, size, variant = "input" }) => {
  const uid = useId();
  const selectable = typeof onChange === "function";
  const score = Math.max(0, Math.min(5, Number(value) || 0));
  const rounded = Math.round(score);

  const shape = variant === "display" ? DISPLAY_STAR : INPUT_STAR;
  const starSize = size ?? (variant === "display" ? 16 : 24);

  if (selectable) {
    return (
      <fieldset
        style={{
          display: "inline-flex",
          gap: 2,
          border: 0,
          padding: 0,
          margin: 0,
        }}
      >
        <legend style={srOnly}>별점 선택 (5점 만점)</legend>

        {[1, 2, 3, 4, 5].map((star) => (
          <label key={star} style={{ cursor: "pointer", lineHeight: 0 }}>
            <input
              type="radio"
              name={uid}
              value={star}
              checked={star === rounded}
              onChange={() => onChange(star)}
              aria-label={`${star}점`}
              style={srOnly}
            />
            <Star filled={star <= rounded} size={starSize} shape={shape} />
          </label>
        ))}
      </fieldset>
    );
  }

  return (
    <span
      role="img"
      aria-label={`5점 만점에 ${score.toFixed(1)}점`}
      style={{ display: "inline-flex", gap: 2, lineHeight: 0 }}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          filled={star <= rounded}
          size={starSize}
          shape={shape}
        />
      ))}
    </span>
  );
};

export default ReviewStars;

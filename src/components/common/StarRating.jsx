import { useId } from "react";

// viewBox 0 0 18 17 기준 5각 별 (피그마 export)
const STAR_VIEWBOX = "0 0 18 17";
const STAR_PATH =
  "M8.94255 2.33325L10.327 6.59431H14.8074L11.1827 9.22779L12.5672 13.4889L8.94255 10.8554L5.31787 13.4889L6.70237 9.22779L3.0777 6.59431H7.55804L8.94255 2.33325Z";

const FILLED = "#EB6923";
const EMPTY = "#E8E6DF";

// 화면엔 안 보이고 스크린리더만 읽는 스타일
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

/**
 * SVG 별점.
 * - onChange 를 주면 네이티브 radio 로 별점 선택(입력용) — 키보드 조작은 브라우저가 처리
 * - 안 주면 읽기 전용이며 소수점(반쪽 별)까지 표시
 */
const StarRating = ({ value = 0, onChange, size = 18 }) => {
  const uid = useId();
  const selectable = typeof onChange === "function";
  const score = Math.max(0, Math.min(5, Number(value) || 0));

  const w = size;
  const h = size;

  if (selectable) {
    const rounded = Math.round(score);
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
            <svg width={w} height={h} viewBox={STAR_VIEWBOX} aria-hidden="true">
              <path
                d={STAR_PATH}
                fill={star <= rounded ? FILLED : EMPTY}
                stroke={star <= rounded ? FILLED : EMPTY}
                strokeWidth={2}
                strokeLinecap="round"
              />
            </svg>
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
      {[0, 1, 2, 3, 4].map((i) => {
        const pct = Math.max(0, Math.min(1, score - i)) * 100;
        const gradId = `${uid}-star-${i}`;
        const isPartial = pct > 0 && pct < 100;
        const solid = pct <= 0 ? EMPTY : FILLED;
        return (
          <svg
            key={i}
            width={w}
            height={h}
            viewBox={STAR_VIEWBOX}
            aria-hidden="true"
          >
            {isPartial && (
              <defs>
                <linearGradient id={gradId}>
                  <stop offset={`${pct}%`} stopColor={FILLED} />
                  <stop offset={`${pct}%`} stopColor={EMPTY} />
                </linearGradient>
              </defs>
            )}
            <path
              d={STAR_PATH}
              fill={isPartial ? `url(#${gradId})` : solid}
              stroke={isPartial ? `url(#${gradId})` : solid}
              strokeWidth={2}
              strokeLinecap="round"
            />
          </svg>
        );
      })}
    </span>
  );
};

export default StarRating;

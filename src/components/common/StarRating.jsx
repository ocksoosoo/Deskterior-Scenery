import { useId } from "react";
import SelectableStarField from "./SelectableStarField";

// viewBox
const STAR_VIEWBOX = "0 0 18 17";
const STAR_PATH =
  "M8.94255 2.33325L10.327 6.59431H14.8074L11.1827 9.22779L12.5672 13.4889L8.94255 10.8554L5.31787 13.4889L6.70237 9.22779L3.0777 6.59431H7.55804L8.94255 2.33325Z";

const FILLED = "#EB6923";
const EMPTY = "#E8E6DF";

//SVG 별점.

const StarRating = ({ value = 0, onChange, size = 18 }) => {
  const uid = useId();
  const selectable = typeof onChange === "function";
  const score = Math.max(0, Math.min(5, Number(value) || 0));

  const w = size;
  const h = size;

  if (selectable) {
    return (
      <SelectableStarField
        value={score}
        onChange={onChange}
        renderStar={(filled) => (
          <svg width={w} height={h} viewBox={STAR_VIEWBOX} aria-hidden="true">
            <path
              d={STAR_PATH}
              fill={filled ? FILLED : EMPTY}
              stroke={filled ? FILLED : EMPTY}
              strokeWidth={2}
              strokeLinecap="round"
            />
          </svg>
        )}
      />
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

import { useId } from "react";

// 화면엔 안 보이고 스크린리더만 읽는 스타일 — 별점 고르는 숨겨진 라디오 버튼용
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

//별점 선택(입력) UI의 공통 뼈대
const SelectableStarField = ({ value, onChange, renderStar }) => {
  const uid = useId();
  const rounded = Math.round(value);

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
          {renderStar(star <= rounded)}
        </label>
      ))}
    </fieldset>
  );
};

export default SelectableStarField;

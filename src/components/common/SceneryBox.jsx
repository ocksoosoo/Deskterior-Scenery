import * as S from "../../styles/ProductDetail/SceneryBox.styles";

/**
 * 이미지가 없거나 로딩에 실패했을 때 자리를 채우는 박스.
 * label 을 주면 role="img" 로 스크린리더가 읽고, 없으면 장식용(aria-hidden).
 */
const SceneryBox = ({ radius = 4, aspectRatio = "1 / 1", label, big = false }) => (
  <S.Box
    role={label ? "img" : undefined}
    aria-label={label}
    aria-hidden={label ? undefined : "true"}
    $radius={radius}
    $aspectRatio={aspectRatio}
  >
    <S.Label $big={big}>SCENERY</S.Label>
  </S.Box>
);

export default SceneryBox;

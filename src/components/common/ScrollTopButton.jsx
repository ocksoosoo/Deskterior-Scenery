import * as S from "../../styles/ProductDetail/ScrollTopButton.styles";

/**
 * 스크롤을 맨 위로 올리는 플로팅 버튼. 항상 화면에 표시된다.
 * 긴 페이지 어디서든 <ScrollTopButton /> 한 줄로 사용한다.
 */
const ScrollTopButton = () => {
  const handleClick = () => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <S.Button type="button" aria-label="맨 위로" onClick={handleClick}>
      <S.Icon
        viewBox="0 0 36 36"
        fill="none"
        stroke="#FDFDFD"
        strokeWidth={2}
        strokeLinecap="square"
        strokeLinejoin="miter"
        aria-hidden="true"
      >
        <path d="M18 7.64964V29.25" />
        <path d="M27.0369 15.8247L18.0009 6.74971L8.96338 15.8247" />
      </S.Icon>
    </S.Button>
  );
};

export default ScrollTopButton;

import { useLocation } from "react-router";
import * as S from "../../styles/ProductDetail/ScrollTopButton.styles";

//플로팅 버튼
const ScrollTopButton = () => {
  const { pathname } = useLocation();
  // 상세페이지는 모바일 하단에 MobileCtaBar가 붙어있어서 그만큼 띄워야 함
  const withCtaBar = pathname.startsWith("/products/");

  const handleClick = () => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <S.Button
      type="button"
      aria-label="맨 위로"
      onClick={handleClick}
      $withCtaBar={withCtaBar}
    >
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

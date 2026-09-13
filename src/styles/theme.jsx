// 색상
const colors = {
  background: "#F8F7F2", //전체 배경색 흰색은 fDfDfD임
  cards: "#fDfDfD", //상품 카드배경 및 어두운 배경
  imagePlaceholder: "#E8E6DF", //이미지 들어갈자리 표시용
  textMain: "#1F211F", //텍스트 본문색, 버튼 배경색
  secondText: "#74766F", //캡션, 텍스트홀더 서브 텍스트 색
  emphasis: "#EB6923", //강조색 (일부요소에 불투명도 들어가있어서 확인 요망!!)
  subtle: "#EBEAE4", //메인배경보다 어두운색(ex 상페 설명란) 버튼 보더색
  mutedText: "#6B7280",
  error: "#C8473F", // error, sold badeg 색
  blue: "#2478BD",
};

// 폰트 패밀리 (공통)
const fontFamily = {
  base: "'Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif", // 프리텐다드 -> 애플 -> 윈도우 -> 시스템 기본
  display: "'DM Serif Text', serif",
};

// 폰트 크기
const fontSize = {
  xs: "0.75rem", // 12px
  sm: "0.875rem", // 14px
  md: "1rem", // 16px (Medium)
  lg: "1.125rem", // 18px
  xl: "1.25rem", // 20px
  "2xl": "1.5rem", // 24px
  "3xl": "1.75rem", // 28px
  "4xl": "2rem", // 32px
  "5xl": "2.5rem", // 40px
  dpMd: "3rem", // 48px
  dpLg: "4rem", //64px
};

// 폰트 굵기
const fontWeight = {
  light: 300, // (base)
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
};

//  간격 & 패딩 (공통 사용)
const spacing = {
  "2xs": "4px", //0.75rem
  xs: "8px", //0.875rem
  sm: "12px", //1rem
  md: "16px", //1.125rem
  lg: "24px", //1.25rem
  xl: "32px", //1.5rem
  "2xl": "48px", //1.75rem
  "3xl": "64px", //2rem
  "4xl": "96px", //2.5rem
};

//  Border Radius
const radius = {
  sm: "4px", // 0.25rem
  md: "8px", // 0.5rem
  lg: "12px", // 0.75rem
  full: "999px",
};

//  Border
const borderWidth = {
  default: "1px", // 0.0625rem - 입력창, 카드 경계
  focus: "2px", // 0.125rem - 포커스, 호버 상태
};

//  반응형
const media = {
  smallMobile: `@media (width < 480px)`,
  mobile: `@media (width < 768px)`,
  tablet: `@media (width >= 768px) and (width < 1024px)`,
  pc: `@media (width >= 1024px) and (width < 1440px)`,
  wide: `@media (width >= 1440px)`,
};
//  레이아웃 (헤더 등 고정 요소 크기 - 다른 값들이 이걸 기준으로 계산됨)
const layout = {
  headerHeight: "80px",
};

export const theme = {
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  spacing,
  radius,
  media,
  borderWidth,
  layout,
};

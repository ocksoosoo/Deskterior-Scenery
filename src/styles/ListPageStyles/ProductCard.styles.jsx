import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { Link } from "react-router";

export const Card = styled.div(({ theme, background }) => ({
  position: "relative",
  display: "flex",
  width: "280px",
  // 상품명 줄 수와 무관하게 높이가 통일되도록 auto 사용 (ProductName min-height와 함께)
  height: "auto",
  paddingBottom: theme.spacing.md,
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing.sm,
  flexShrink: 0,
  textAlign: "left",
  // 호출하는 쪽에서 배경색 직접 지정 가능 (기본값과 겹쳐 경계가 안 보이는 경우 대응)
  background: background || theme.colors.cards,
  borderRadius: theme.radius.md,
  overflow: "hidden",

  [theme.media.mobile]: {
    paddingBottom: theme.spacing.xs,
    gap: theme.spacing.xs,
    width: "100%",
  },
  [theme.media.tablet]: {
    width: "100%",
  },
}));

export const ImageWrapper = styled.div(({ theme }) => ({
  position: "relative",
  width: "100%",
  aspectRatio: "1 / 1",
  flexShrink: 0,
  overflow: "hidden",
  background: theme.colors.imagePlaceholder,

  "&:hover img": {
    transform: "scale(1.06)",
  },
}));

// 진짜 <a>(Link)로 감싸서 키보드/새 탭 열기 등을 브라우저 기본 동작에 맡김
export const ImageLink = styled(Link)({
  display: "block",
  width: "100%",
  height: "100%",
});

export const ProductImage = styled.img({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.3s ease",
});

export const ImageOverlay = styled.div(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  // 이미지 호버 시 transform으로 스태킹 컨텍스트가 생겨 오버레이 위로 올라오는 것 방지
  zIndex: 1,
  // 클릭/커서를 가로채지 않고 밑의 이미지로 전달 (품절 상품도 상세페이지 이동은 되어야 함)
  pointerEvents: "none",
  backgroundColor: theme.colors.textMain,
  opacity: 0.35,
}));

export const BadgeGroup = styled.div(({ theme }) => ({
  position: "absolute",
  top: theme.spacing.xs,
  left: theme.spacing.xs,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.xs,
  zIndex: 10,
}));

export const IconStack = styled.div(({ theme }) => ({
  position: "absolute",
  zIndex: 2,
  bottom: theme.spacing.sm,
  right: theme.spacing.sm,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing.xs,
}));

// 찜 클릭 시 스케일 변화 없이 얇은 링이 번지며 사라지는 절제된 피드백
const pulseRing = keyframes`
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.5); opacity: 0; }
`;

export const LikeButton = styled.button(({ theme }) => ({
  position: "relative",
  display: "flex",
  width: "36px",
  height: "36px",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  border: "none",
  borderRadius: theme.radius.full,
  background: "rgba(253, 253, 253, 0.75)",
  color: theme.colors.textMain,
  cursor: "pointer",
  // 흰 배경 이미지와 버튼(반투명 흰색)이 안 겹쳐 보이도록 기본 그림자 항상 적용
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",

  transition:
    "transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease",

  "&:hover": {
    transform: "scale(1.05)",
    background: "rgba(253, 253, 253, 0.95)",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.24)",
  },

  "&:disabled": {
    cursor: "default",
  },

  "&:active": {
    transform: "scale(0.95)",
  },

  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    border: `2px solid ${theme.colors.error}`,
    opacity: 0,
    pointerEvents: "none",
  },

  '&[aria-pressed="true"]::after': {
    animation: `${pulseRing} 0.5s ease-out`,
  },
}));

const cartShake = keyframes`
  0% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1) rotate(-6deg); }
  50% { transform: scale(1) rotate(6deg); }
  75% { transform: scale(1) rotate(-3deg); }
  100% { transform: scale(1) rotate(0deg); }
`;

export const CartButton = styled.button(({ theme }) => ({
  display: "flex",
  width: "36px",
  height: "36px",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  border: "none",
  borderRadius: theme.radius.full,
  padding: theme.spacing["2xs"],
  background: theme.colors.textMain,
  color: theme.colors.cards,
  cursor: "pointer",
  transition: "transform 0.15s ease, box-shadow 0.15s ease",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",

  transform: "translateZ(0)",
  willChange: "transform",

  "&:hover": {
    transform: "scale(1.06) translateZ(0)",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.24)",
  },

  "&:active": {
    transform: "scale(0.95)",
  },

  '&[data-just-added="true"]': {
    animation: `${cartShake} 0.4s ease`,
  },
}));

const waterRise = keyframes`
  0% { transform: scaleY(0); }
  100% { transform: scaleY(1); }
`;

// 장바구니에 담긴 상품 표시용 물결 효과 - 바구니 아이콘 안쪽 구멍에 clipPath로 끼움
export const CartWaterGroup = styled.g({
  transformBox: "fill-box",
  transformOrigin: "bottom",
  animation: `${waterRise} 0.5s ease-out forwards`,
});

export const Info = styled.div(({ theme }) => ({
  display: "flex",
  width: "100%",
  padding: `0 ${theme.spacing.md}`,
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing.xs,
  flex: "1 0 0",
}));

// styled(Link)는 as prop으로 다른 태그로 못 바꿔서, 스타일만 공유하고
// 컴포넌트를 둘로 나눔 - 클릭 가능은 ProductName(Link), 불가는 ProductNameStatic
const productNameStyle = (theme) => ({
  position: "relative",
  zIndex: 2,
  cursor: "pointer",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  // 줄 수와 무관하게 항상 2줄 분량을 차지해 카드 높이 통일
  minHeight: "2.4em",
  lineHeight: "normal",
  fontFamily: theme.fontFamily.base,
  fontSize: theme.fontSize.lg,
  fontWeight: theme.fontWeight.semiBold,
  letterSpacing: "-0.18px",
  color: theme.colors.textMain,
  textDecoration: "none",

  "&:hover": {
    textDecoration: "underline",
  },
});

// 상품 상세로 이동하는 진짜 링크
export const ProductName = styled(Link)(({ theme }) => productNameStyle(theme));
// 클릭 불가(placeholder) 카드용 - 링크가 아닌 순수 텍스트
export const ProductNameStatic = styled.strong(({ theme }) =>
  productNameStyle(theme),
);

export const CategoryName = styled.span(({ theme }) => ({
  color: theme.colors.emphasis,
  fontSize: theme.fontSize.sm,
  fontWeight: theme.fontWeight.medium,
}));
export const Price = styled.p(({ theme }) => ({
  fontSize: theme.fontSize.md,
  color: theme.colors.secondText,
  margin: 0,
}));

// ProductName과 같은 이유로 스타일만 공유하고 컴포넌트를 둘로 나눔
const ratingStyle = (theme) => ({
  position: "relative",
  zIndex: 2,
  // <a>는 기본이 inline이라 위아래 padding이 클릭 영역을 못 넓히므로 block 계열로 지정
  display: "inline-block",
  fontSize: theme.fontSize.sm,
  color: theme.colors.secondText,
  textDecoration: "none",
  width: "fit-content",
  // 터치 범위만 넓히고 위치/간격은 유지 (padding + 상쇄용 negative margin)
  paddingTop: theme.spacing.xs,
  paddingBottom: theme.spacing.md,
  paddingLeft: theme.spacing.sm,
  paddingRight: theme.spacing.sm,
  marginTop: `-${theme.spacing.xs}`,
  marginBottom: `-${theme.spacing.md}`,
  marginLeft: `-${theme.spacing.sm}`,
  marginRight: `-${theme.spacing.sm}`,

  "&:hover": {
    textDecoration: "underline",
  },
});

// 리뷰 섹션으로 이동하는 진짜 링크
export const Rating = styled(Link)(({ theme }) => ratingStyle(theme));
// 클릭 불가(placeholder) 카드용 - 링크가 아닌 순수 텍스트
export const RatingStatic = styled.p(({ theme }) => ratingStyle(theme));

export const Star = styled.span({
  display: "inline-flex",
  color: "#e08a3c",
  verticalAlign: "-1px",
});

import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

export const Card = styled.div(({ theme }) => ({
  position: "relative",
  display: "flex",
  width: "280px",
  // 상품명이 1줄이든 2줄이든 카드 높이가 자동으로 통일되도록 고정값 대신 auto 사용
  // (아래 ProductName의 min-height와 함께 적용됨)
  height: "auto",
  paddingBottom: theme.spacing.md,
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing.sm,
  flexShrink: 0,
  textAlign: "left",
  background: theme.colors.cards,
  borderRadius: theme.radius.md,
  overflow: "hidden",
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
  // 이미지가 호버 시 transform(scale)으로 자체 스태킹 컨텍스트를 갖게 되면서
  // z-index 없이는 오버레이보다 위로 올라와 버리는 것을 방지
  zIndex: 1,
  // 오버레이가 클릭/커서를 가로채지 않고 밑에 있는 이미지로 그대로 전달되게 함
  // (품절 상품도 이미지 클릭 시 상세페이지 이동은 그대로 되어야 함)
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

const likeBounce = keyframes`
  0% { transform: scale(1); }
  40% { transform: scale(1.3); }
  100% { transform: scale(1); }
`;

export const LikeButton = styled.button(({ theme }) => ({
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
  transition: "transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease",

  "&:hover": {
    transform: "scale(1.1)",
    background: "rgba(253, 253, 253, 0.95)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  },

  "&:active": {
    transform: "scale(0.95)",
  },

  '&[aria-pressed="true"]': {
    animation: `${likeBounce} 0.3s ease`,
  },
}));

const cartShake = keyframes`
  0% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1) rotate(-12deg); }
  50% { transform: scale(1) rotate(12deg); }
  75% { transform: scale(1) rotate(-6deg); }
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
  color: "#fff",
  cursor: "pointer",
  transition: "transform 0.15s ease",

  "&:hover": {
    transform: "scale(1.1)",
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

// 이미 장바구니에 담긴 상품임을 나타내는 물결 효과.
// 바구니 아이콘 자체의 path가 만드는 안쪽 창(구멍) 영역에 clipPath로 끼워 넣어서 사용
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

export const ProductName = styled.strong(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  cursor: "pointer",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  // 상품명이 1줄이든 2줄이든 항상 2줄 분량의 공간을 차지해서, 카드 높이가 통일되고
  // 아래 별점이 카드 밑에 눌리지 않게 함
  minHeight: "2.4em",
  lineHeight: "normal",
  fontFamily: theme.fontFamily.base,
  fontSize: theme.fontSize.lg,
  fontWeight: theme.fontWeight.semiBold,
  letterSpacing: "-0.18px",
  color: theme.colors.textMain,

  "&:hover": {
    textDecoration: "underline",
  },
}));

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

export const Rating = styled.p(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  fontSize: theme.fontSize.xs,
  color: theme.colors.secondText,
  width: "fit-content",
  // 터치 범위만 넓히고 시각적 위치/간격은 그대로 유지 (padding + 상쇄용 negative margin)
  // 아래쪽은 카드 자체의 paddingBottom(md)만큼까지, 카드 하단 여백 전체를 클릭 범위로 활용
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
}));

export const Star = styled.span({
  display: "inline-flex",
  color: "#e08a3c",
  verticalAlign: "-1px",
});

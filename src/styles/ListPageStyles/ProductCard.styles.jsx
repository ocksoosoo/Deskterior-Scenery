import styled from "@emotion/styled";

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
}));

export const ProductImage = styled.img({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const ImageOverlay = styled.div(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
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
}));

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
}));

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

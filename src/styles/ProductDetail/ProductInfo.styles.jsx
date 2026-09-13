import styled from "@emotion/styled";

export const Wrapper = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.lg,
}));

// 상품 정보 하단 구분 바
export const Divider = styled.div(({ theme }) => ({
  height: "0.0625rem",
  alignSelf: "stretch",
  background: theme.colors.imagePlaceholder, // #E8E6DF
}));

export const Category = styled.p(({ theme }) => ({
  color: theme.colors.emphasis,
  fontSize: theme.fontSize.xs, // 0.75rem
  fontWeight: theme.fontWeight.semiBold, // 600
  lineHeight: "normal",
  letterSpacing: "-0.0075rem",
}));

export const Title = styled.h2(({ theme }) => ({
  fontFamily: theme.fontFamily.display,
  fontSize: theme.fontSize["5xl"], // 2.5rem
  fontWeight: theme.fontWeight.regular, // 400
  lineHeight: "normal",
  letterSpacing: "-0.0625rem",
  color: theme.colors.textMain,
  margin: 0,

  [theme.media.wide]: {
    letterSpacing: "normal",
  },
}));

export const RatingRow = styled.p(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing["2xs"],
  fontSize: theme.fontSize.sm, // 0.875rem
  fontWeight: theme.fontWeight.regular, // 400
  lineHeight: "normal",
  letterSpacing: "-0.00875rem",
  color: theme.colors.secondText,
}));

export const Stars = styled.span(({ theme }) => ({
  display: "inline-flex",
  color: theme.colors.emphasis,
}));

export const Price = styled.strong(({ theme }) => ({
  fontSize: theme.fontSize["2xl"], // 1.5rem
  fontWeight: theme.fontWeight.semiBold, // 600
  lineHeight: "normal",
  letterSpacing: "-0.015rem",
  color: theme.colors.textMain,
}));

export const DescBox = styled.div(({ theme }) => ({
  background: "rgba(235, 234, 228, 0.75)",
  borderRadius: theme.radius.lg, // 12
  padding: theme.spacing.lg, // 24

  [theme.media.tablet]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: theme.spacing.md, // 16
    height: "6.5rem", // 104
  },

  [theme.media.mobile]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: theme.spacing.xs,
    height: "6.5rem", // 104
    background: theme.colors.subtle, // solid #EBEAE4
  },

  [theme.media.wide]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
    gap: theme.spacing.md, // 16
    height: "6.5rem", // 104
  },
}));

export const DescLabel = styled.p(({ theme }) => ({
  fontSize: theme.fontSize.sm, // 0.875rem — Label/MD
  fontWeight: theme.fontWeight.medium, // 500
  lineHeight: "normal",
  letterSpacing: "-0.00875rem",
  color: theme.colors.textMain,
  marginBottom: theme.spacing.xs, // 8px
}));

export const DescText = styled.p(({ theme }) => ({
  fontSize: theme.fontSize.xs, // 0.75rem
  fontWeight: theme.fontWeight.semiBold, // 600
  lineHeight: "normal",
  letterSpacing: "-0.0075rem",
  color: theme.colors.secondText,
  whiteSpace: "pre-line",

  [theme.media.tablet]: {
    fontSize: theme.fontSize.sm, // 0.875rem
    fontWeight: theme.fontWeight.regular, // 400
    letterSpacing: "-0.00875rem",
  },
  [theme.media.mobile]: {
    fontSize: theme.fontSize.sm, // 0.875rem
    fontWeight: theme.fontWeight.regular, // 400
    letterSpacing: "-0.00875rem",
  },
  [theme.media.wide]: {
    fontSize: theme.fontSize.sm, // 0.875rem
    fontWeight: theme.fontWeight.regular, // 400
    letterSpacing: "-0.00875rem",
  },
}));

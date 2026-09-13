import styled from "@emotion/styled";
import { Link } from "react-router";

export const Nav = styled.nav(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: theme.spacing.sm,
  fontSize: theme.fontSize.sm,
  color: theme.colors.secondText,
  padding: `${theme.spacing.sm} 0`,

  [theme.media.tablet]: {
    gap: theme.spacing.xs,
    padding: 0,
    marginBottom: theme.spacing.xs,
  },

  [theme.media.mobile]: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    alignSelf: "stretch",
    padding: 0,
    marginBottom: theme.spacing.md,
  },

  [theme.media.wide]: {
    gap: theme.spacing.xl,
    alignSelf: "stretch",
  },
}));

export const BackButton = styled.button(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing["2xs"],
  color: theme.colors.textMain,
  fontSize: theme.fontSize.sm, // 0.875rem
  fontWeight: theme.fontWeight.medium, // 500
  lineHeight: "normal",
  letterSpacing: "-0.00875rem",

  "&:focus-visible": {
    outline: `${theme.borderWidth.focus} solid ${theme.colors.textMain}`,
    outlineOffset: "2px",
    borderRadius: theme.radius.sm,
  },
}));

export const Trail = styled.ol(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  minWidth: 0,
  color: theme.colors.secondText,
  fontSize: theme.fontSize.xs, // 0.75rem
  fontWeight: theme.fontWeight.regular, // 400
  lineHeight: "normal",
  letterSpacing: "-0.0075rem",

  [theme.media.mobile]: {
    width: "100%",
  },
}));

export const Crumb = styled.li(({ theme }) => ({
  "&:not(:first-of-type)::before": {
    content: '">"',
    margin: `0 ${theme.spacing["2xs"]}`,
  },
}));

// Home / 카테고리처럼 이동 가능한 크럼 (마지막 상품명은 그냥 텍스트로 둠)
export const CrumbLink = styled(Link)({
  "&:hover": { textDecoration: "underline" },
});

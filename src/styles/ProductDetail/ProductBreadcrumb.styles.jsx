import styled from "@emotion/styled";
import { Link } from "react-router";

export const Nav = styled.nav(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "nowrap",
  gap: theme.spacing.sm,
  fontSize: theme.fontSize.sm,
  color: theme.colors.secondText,
  padding: `${theme.spacing.sm} 0`,

  [theme.media.wide]: {
    gap: theme.spacing.xl,
    alignSelf: "stretch",
  },

  [theme.media.tablet]: {
    gap: theme.spacing.xs,
    padding: 0,
    marginBottom: theme.spacing.xs,
  },

  [theme.media.mobile]: {
    alignItems: "center",
    alignSelf: "stretch",
    padding: 0,
    marginBottom: theme.spacing.md,
  },
}));

export const BackButton = styled.button(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  flexShrink: 0,
  gap: theme.spacing["2xs"],
  color: theme.colors.textMain,
  fontSize: theme.fontSize.lg, // 1.125rem (18px)
  fontWeight: theme.fontWeight.medium, // 500
  lineHeight: "normal",
  letterSpacing: "-0.00875rem",

  "&:focus-visible": {
    outline: `${theme.borderWidth.focus} solid ${theme.colors.textMain}`,
    outlineOffset: "2px",
    borderRadius: theme.radius.sm,
  },

  [theme.media.mobile]: {
    fontSize: theme.fontSize.md, // 1rem (16px)
  },
}));

export const Trail = styled.ol(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flex: "1 1 auto",
  flexWrap: "nowrap",
  minWidth: 0,
  color: theme.colors.secondText,
  fontSize: theme.fontSize.md, // 1rem (16px)
  fontWeight: theme.fontWeight.regular, // 400
  lineHeight: "normal",
  letterSpacing: "-0.0075rem",

  [theme.media.mobile]: {
    fontSize: theme.fontSize.sm, // 0.875rem (14px)
  },
}));

// 모든 브레이크포인트에서 크럼은 줄바꿈 없이 한 줄로, 마지막(상품명)만 넘치면 줄임표(...) 처리
export const Crumb = styled.li(({ theme }) => ({
  whiteSpace: "nowrap",
  flexShrink: 0,

  "&:not(:first-of-type)::before": {
    content: '">"',
    margin: `0 ${theme.spacing["2xs"]}`,
  },

  '&[aria-current="page"]': {
    display: "block",
    flex: "1 1 auto",
    flexShrink: 1,
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

// Home / 카테고리처럼 이동 가능한 크럼 (마지막 상품명은 그냥 텍스트로 둠)
export const CrumbLink = styled(Link)({
  "&:hover": { textDecoration: "underline" },
});

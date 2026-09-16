import styled from "@emotion/styled";
import { EmptyReviewIcon } from "../../components/icons/Icons";

export const Section = styled.section(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing["2xl"],
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.lg,

  scrollMarginTop: `calc(${theme.layout.headerHeight} + ${theme.spacing.lg})`,

  [theme.media.tablet]: {
    marginTop: 0,
    padding: `${theme.spacing["2xl"]} ${theme.spacing.xl}`,
    alignItems: "center",
  },
}));

export const Header = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.xs,

  [theme.media.tablet]: {
    alignSelf: "stretch",
    alignItems: "flex-start",
  },
}));

export const Title = styled.h2(({ theme }) => ({
  margin: 0,
  fontFamily: theme.fontFamily.display,
  fontSize: theme.fontSize["4xl"], // 2rem (32px)
  fontWeight: theme.fontWeight.regular, // 400
  fontStyle: "normal",
  lineHeight: "normal",
  letterSpacing: "-0.01em",
  color: theme.colors.textMain,

  [theme.media.mobile]: {
    letterSpacing: "normal",
  },
}));

export const Subtitle = styled.p(({ theme }) => ({
  margin: 0,
  fontSize: theme.fontSize.md, // 1rem (16px)
  fontStyle: "normal",
  fontWeight: theme.fontWeight.regular, // 400
  lineHeight: "normal",
  letterSpacing: "-0.00875rem",
  color: theme.colors.secondText,

  [theme.media.mobile]: {
    lineHeight: "1.25rem", // 20px
  },
}));

export const Form = styled.form(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: theme.spacing.sm, // 12
  alignSelf: "stretch",
  padding: theme.spacing.lg,
  borderRadius: theme.radius.lg,
  background: theme.colors.cards,

  [theme.media.mobile]: {
    padding: theme.spacing.md,
  },
}));

export const FormRow = styled.div(({ theme }) => ({
  display: "flex",
  alignSelf: "stretch",
  gap: "1.5rem",

  [theme.media.mobile]: {
    flexDirection: "column",
    gap: theme.spacing.md,
  },
}));

export const RatingBox = styled.div(({ theme, $loggedIn }) => ({
  display: "flex",
  flex: "0 0 auto",
  width: "14.5rem",
  height: "8.25rem",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing.sm,
  padding: theme.spacing.md,
  borderRadius: theme.radius.md,
  background: "rgba(235, 105, 35, 0.15)",
  cursor: $loggedIn ? "default" : "pointer",

  [theme.media.mobile]: {
    width: "auto",
    alignSelf: "stretch",
  },
}));

export const RatingLabel = styled.span(({ theme }) => ({
  fontSize: theme.fontSize.xl, // 1.25rem (20px)
  fontStyle: "normal",
  fontWeight: theme.fontWeight.semiBold, // 600
  lineHeight: "normal",
  letterSpacing: "-0.01125rem",
  color: theme.colors.textMain, // #1F211F
}));

export const RatingHint = styled.span(({ theme }) => ({
  fontSize: theme.fontSize.md, // 1rem (16px)
  fontStyle: "normal",
  fontWeight: theme.fontWeight.regular, // 400
  lineHeight: "normal",
  letterSpacing: "-0.0075rem",
  color: theme.colors.secondText, // #74766F
}));

export const Textarea = styled.textarea(({ theme, $loggedIn }) => ({
  flex: "1 0 0",
  height: "8.25rem",
  padding: theme.spacing.md,
  borderRadius: theme.radius.md,
  border: "none",
  background: theme.colors.background,
  resize: "none",
  fontSize: theme.fontSize.md, // 1rem (16px)
  fontStyle: "normal",
  fontWeight: theme.fontWeight.regular, // 400
  lineHeight: "normal",
  letterSpacing: "-0.00875rem",
  color: theme.colors.textMain,
  cursor: $loggedIn ? "text" : "pointer",

  "&::placeholder": { color: theme.colors.mutedText },
  "&:focus": {
    outline: "none",
    boxShadow: "0 0 0 2px rgba(235, 105, 35, 0.35)",
  },
  "&:disabled": { cursor: "not-allowed" },

  [theme.media.mobile]: {
    flex: "none",
    alignSelf: "stretch",
  },
}));

export const ErrorText = styled.p(({ theme }) => ({
  margin: 0,
  alignSelf: "flex-start",
  fontSize: theme.fontSize.xs,
  color: theme.colors.emphasis,
}));

export const FormActions = styled.div(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing.xs,
}));

export const SubmitButton = styled.button(({ theme }) => ({
  display: "flex",
  width: "5rem",
  height: "2.5rem",
  padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing.xs,
  borderRadius: theme.radius.md,
  background: theme.colors.textMain,
  color: theme.colors.cards, // #FDFDFD
  textAlign: "center",
  fontSize: theme.fontSize.md, // 1rem (16px)
  fontStyle: "normal",
  fontWeight: theme.fontWeight.medium, // 500
  lineHeight: "normal",
  letterSpacing: "-0.00875rem",

  "&:hover": { filter: "brightness(1.2)" },
  "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
}));

export const CancelButton = styled.button(({ theme }) => ({
  display: "flex",
  minWidth: "5rem",
  height: "2.5rem",
  padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: theme.radius.md,
  border: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
  background: "#fff",
  color: theme.colors.textMain,
  fontSize: theme.fontSize.md, // 1rem (16px)
  fontWeight: theme.fontWeight.medium,
  letterSpacing: "-0.00875rem",

  "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
}));

export const Summary = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "center",
  gap: theme.spacing.md,

  [theme.media.mobile]: {
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "stretch",
  },
}));

export const SummaryTitle = styled.h3(({ theme }) => ({
  margin: 0,
  fontSize: theme.fontSize.xl, // 1.25rem
  fontStyle: "normal",
  fontWeight: theme.fontWeight.semiBold, // 600
  lineHeight: "normal",
  letterSpacing: "-0.0125rem",
  color: theme.colors.textMain, // #1F211F
}));

export const SummaryMeta = styled.span(({ theme }) => ({
  fontSize: theme.fontSize.md, // 1rem (16px)
  fontStyle: "normal",
  fontWeight: theme.fontWeight.medium, // 500
  lineHeight: "normal",
  letterSpacing: "-0.00875rem",
  color: theme.colors.secondText, // #74766F
}));

export const ListWrap = styled.div(({ theme }) => ({
  [theme.media.tablet]: {
    alignSelf: "stretch",
  },
}));

export const List = styled.ul(({ theme }) => ({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.md, // 16
}));

export const EmptyState = styled.div({
  display: "flex",
  width: "100%",
  height: "27.5rem",
  padding: "2rem",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1.5rem",
  borderRadius: "1rem",
  background: "#FFF",
});

export const EmptyIcon = styled(EmptyReviewIcon)({
  width: "6.875rem",
  height: "6.875rem",
});

export const EmptyText = styled.p(({ theme }) => ({
  margin: 0,
  fontSize: theme.fontSize.md, // 1rem
  fontStyle: "normal",
  fontWeight: theme.fontWeight.regular, // 400
  lineHeight: "normal",
  letterSpacing: "-0.01rem",
  color: theme.colors.secondText, // #74766F
}));

export const Item = styled.li(({ theme, $mine }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-end",
  gap: theme.spacing.md,
  alignSelf: "stretch",
  padding: `${theme.spacing.md} ${theme.spacing.lg}`,
  borderRadius: theme.radius.md,
  background: theme.colors.cards, // #FDFDFD

  ...($mine
    ? {}
    : {
        height: "9.375rem",
        flexShrink: 0,
      }),

  [theme.media.mobile]: {
    padding: theme.spacing.md,
  },
}));

export const ItemHeader = styled.div(({ theme }) => ({
  display: "flex",
  alignSelf: "stretch",
  alignItems: "center",
  gap: theme.spacing.xs,
}));

export const Author = styled.span(({ theme, $mine }) => ({
  fontSize: theme.fontSize.lg, // 1.125rem (18px)
  fontStyle: "normal",
  fontWeight: theme.fontWeight.medium, // 500
  lineHeight: "normal",
  letterSpacing: "-0.01rem",
  color: $mine ? theme.colors.emphasis : theme.colors.textMain, // Me: #EB6923
}));

export const Stars = styled.span({
  display: "inline-flex",
});

export const Score = styled.span(({ theme }) => ({
  fontSize: theme.fontSize.md, // 1rem (16px)
  fontStyle: "normal",
  fontWeight: theme.fontWeight.medium, // 500
  lineHeight: "normal",
  letterSpacing: "-0.00875rem",
  color: theme.colors.emphasis, // #EB6923
}));

export const ItemActions = styled.div(({ theme }) => ({
  marginLeft: "auto",
  display: "flex",
  gap: theme.spacing["2xs"],
}));

export const ActionButton = styled.button(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.xs,
  padding: `0.375rem ${theme.spacing.md}`,
  borderRadius: theme.radius.full,
  background: "#FCE9DE",

  color: "#404040",
  textAlign: "center",
  fontSize: theme.fontSize.xs, // 0.75rem
  fontWeight: theme.fontWeight.medium, // 500
  lineHeight: "normal",
  letterSpacing: "-0.0075rem",
}));

export const Content = styled.p(({ theme }) => ({
  margin: 0,
  alignSelf: "stretch",
  fontSize: theme.fontSize.md, // 1rem (16px)
  fontStyle: "normal",
  fontWeight: theme.fontWeight.regular, // 400
  lineHeight: "normal",
  letterSpacing: "-0.00875rem",
  color: theme.colors.mutedText, // #6B7280
  whiteSpace: "pre-wrap",
  overflowWrap: "anywhere",
}));

export const DateText = styled.time(({ theme }) => ({
  alignSelf: "flex-end",
  fontSize: theme.fontSize.md, // 1rem (16px)
  fontStyle: "normal",
  fontWeight: theme.fontWeight.regular, // 400
  lineHeight: "normal",
  letterSpacing: "-0.0075rem",
  color: theme.colors.secondText, // #74766F
}));

// 더 보기
export const MoreButton = styled.button(({ theme }) => ({
  display: "flex",
  width: "2.5rem",
  height: "2.5rem",
  margin: `${theme.spacing.xl} auto 0`,
  padding: "0 0 0.1875rem",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: theme.radius.full,
  border: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
  background: theme.colors.cards,
  opacity: "var(--Review-Fade-Opacity, 1)",

  fontSize: theme.fontSize.xl, // 1.25rem
  fontStyle: "normal",
  fontWeight: theme.fontWeight.semiBold, // 600
  lineHeight: "normal",
  letterSpacing: "-0.0125rem",
  color: theme.colors.secondText, // #74766F

  [theme.media.tablet]: {
    marginTop: theme.spacing.lg,
  },
}));

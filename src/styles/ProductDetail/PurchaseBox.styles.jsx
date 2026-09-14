import styled from "@emotion/styled";

export const Wrapper = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.lg,
}));

export const Stepper = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "flex-start",
  width: "7.5rem",
  gap: theme.spacing.md,
}));

export const StepButton = styled.button(({ theme }) => ({
  width: "35px",
  height: "35px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.625rem",
  flexShrink: 0,
  padding: "0 0.4375rem 0.125rem 0.4375rem",
  cursor: "pointer",
  background: "#FFF",
  border: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
  borderRadius: theme.radius.full,
  color: theme.colors.textMain,
  fontSize: theme.fontSize.md,
  fontWeight: theme.fontWeight.regular,
  lineHeight: "normal",

  "&:disabled": {
    color: theme.colors.subtle,
    cursor: "not-allowed",
  },

  [theme.media.tablet]: {
    padding: "0 0.3125rem 0.125rem 0.3125rem",
  },
}));

export const Qty = styled.span(({ theme }) => ({
  minWidth: "18px",
  textAlign: "center",
  fontSize: theme.fontSize.xl, // 1.25rem (20px)
  color: theme.colors.textMain,
  fontWeight: theme.fontWeight.semiBold, // 600
  lineHeight: "normal",
  letterSpacing: "-0.0125rem",

  [theme.media.tablet]: {
    width: "1.75rem",
    flexShrink: 0,
  },

  // 모바일: 태블릿과 동일
  [theme.media.mobile]: {
    width: "1.75rem",
    flexShrink: 0,
  },
}));

export const ButtonRow = styled.div(({ theme }) => ({
  display: "flex",
  gap: theme.spacing.xs,

  [theme.media.mobile]: {
    display: "none",
  },
}));

export const CartButton = styled.button(({ theme }) => ({
  display: "flex",
  width: "8.875rem",
  height: "2.5rem",
  padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing.xs,
  borderRadius: theme.radius.md,
  background: theme.colors.textMain,
  color: "#fff",
  textAlign: "center",
  fontSize: theme.fontSize.md, // 1rem (16px)
  fontWeight: theme.fontWeight.medium, // 500
  lineHeight: "normal",
  letterSpacing: "-0.00875rem",

  "&:hover": { filter: "brightness(1.2)" },
  "&:disabled": { opacity: 0.5, cursor: "not-allowed" },

  [theme.media.tablet]: {
    width: "10.0625rem",
  },
}));

export const WishButton = styled.button(({ theme }) => ({
  display: "grid",
  placeItems: "center",
  width: "2.5rem", // 40×40
  height: "2.5rem",
  borderRadius: theme.radius.md,
  background: theme.colors.subtle, // #EBEAE4
  color: theme.colors.textMain,

  [theme.media.tablet]: {
    width: "2.4375rem",
  },

  [theme.media.wide]: {
    width: "2.4375rem",
  },
}));

export const CheckoutButton = styled.button(({ theme }) => ({
  display: "flex",
  height: "3rem",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "stretch",
  borderRadius: theme.radius.md,
  border: `${theme.borderWidth.default} solid ${theme.colors.textMain}`,
  background: theme.colors.textMain,
  color: theme.colors.cards, // #FDFDFD
  fontSize: theme.fontSize.lg, // 1.125rem (18px)
  fontWeight: theme.fontWeight.medium, // 500
  lineHeight: "normal",
  letterSpacing: "-0.01rem",

  "&:not(:disabled):hover": { filter: "brightness(1.2)" },
  "&:disabled": { opacity: 0.5, cursor: "not-allowed" },

  // 모바일: 하단 고정 CTA 바(MobileCtaBar)가 대신 보여줌
  [theme.media.mobile]: {
    display: "none",
  },
}));

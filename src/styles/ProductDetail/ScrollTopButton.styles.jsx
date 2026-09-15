import styled from "@emotion/styled";

export const Button = styled.button(({ theme, $withCtaBar }) => ({
  position: "fixed",
  right: "20px",
  bottom: "calc(20px + env(safe-area-inset-bottom, 0px))",
  zIndex: 50,
  cursor: "pointer",

  display: "flex",
  width: "40px",
  height: "40px",
  padding: 0,
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing.xs,
  borderRadius: theme.radius.full,
  border: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
  background: theme.colors.textMain,

  [theme.media.mobile]: {
    bottom: $withCtaBar
      ? "calc(81px + env(safe-area-inset-bottom, 0px))"
      : "calc(20px + env(safe-area-inset-bottom, 0px))",
    padding: theme.spacing.xs,
  },

  [theme.media.wide]: {
    padding: theme.spacing.xs,
  },
}));

export const Icon = styled.svg({
  width: "1.5rem",
  height: "1.5rem",
  flexShrink: 0,
});

import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const pulseRing = keyframes`
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.5); opacity: 0; }
`;

// 모바일 전용 하단 고정 CTA 바.
export const Bar = styled.div(({ theme }) => ({
  display: "none",

  [theme.media.mobile]: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.xs, // 8
    width: "100%",
    boxSizing: "border-box",
    padding: theme.spacing.md, // 16
    paddingBottom: `calc(${theme.spacing.md} + env(safe-area-inset-bottom, 0px))`,

    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,

    background: "#FFF",
    borderTop: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
  },
}));

export const WishButton = styled.button(({ theme }) => ({
  position: "relative",
  display: "grid",
  placeItems: "center",
  width: "3rem",
  height: "3rem",
  padding: 0,
  flexShrink: 0,
  border: "none",
  borderRadius: theme.radius.md,
  background: "rgba(253, 253, 253, 0.75)",
  color: theme.colors.textMain,
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",

  transition:
    "transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease",

  "&:hover": {
    transform: "scale(1.05)",
    background: "rgba(253, 253, 253, 0.95)",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.24)",
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

export const CartButton = styled.button(({ theme }) => ({
  display: "flex",
  width: "auto",
  whiteSpace: "nowrap",
  height: "3rem", // 48
  flexShrink: 0,
  padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing["2xs"], // 4
  borderRadius: "0.5rem", // 8
  background: theme.colors.textMain,
  color: theme.colors.cards, // #FDFDFD
  textAlign: "center",
  fontSize: theme.fontSize.sm, // 0.875rem
  fontWeight: theme.fontWeight.medium, // 500
  lineHeight: "normal",
  letterSpacing: "-0.00875rem",

  "&:hover": { filter: "brightness(1.2)" },
  "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
}));

export const CheckoutButton = styled.button(({ theme }) => ({
  display: "flex",
  height: "3rem", // 48
  flex: "1 0 0",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: theme.radius.md,
  border: `${theme.borderWidth.default} solid ${theme.colors.textMain}`,
  background: theme.colors.textMain,
  color: theme.colors.cards, // #FDFDFD
  fontSize: theme.fontSize.md, // 1rem
  fontWeight: theme.fontWeight.medium, // 500
  lineHeight: "normal",
  letterSpacing: "-0.01rem",

  "&:not(:disabled):hover": { filter: "brightness(1.2)" },
  "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
}));

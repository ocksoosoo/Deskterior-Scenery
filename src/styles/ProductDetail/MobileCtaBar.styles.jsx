import styled from "@emotion/styled";

// 모바일 전용 하단 고정 CTA 바.
export const Bar = styled.div(({ theme }) => ({
  display: "none",

  [theme.media.mobile]: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.xs, // 8
    width: "100%",
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
  display: "grid",
  placeItems: "center",
  width: "2.5rem",
  height: "2.5rem",
  padding: 0,
  flexShrink: 0,
  borderRadius: theme.radius.md,
  background: theme.colors.subtle, // #EBEAE4
  color: theme.colors.textMain,
}));

export const CartButton = styled.button(({ theme }) => ({
  display: "flex",
  width: "auto",
  whiteSpace: "nowrap", // 텍스트 줄바꿈 없이 한 줄 보장
  height: "3rem", // 48
  flexShrink: 0,
  padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing["2xs"], // 4
  borderRadius: "0.5rem", // 8
  background: theme.colors.textMain,
  color: "#fff",
  textAlign: "center",
  fontSize: theme.fontSize.sm, // 0.875rem
  fontWeight: theme.fontWeight.medium, // 500
  lineHeight: "normal",
  letterSpacing: "-0.00875rem",

  "&:hover": { filter: "brightness(1.2)" }, // 팀 공통 버튼 호버
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

  "&:not(:disabled):hover": { filter: "brightness(1.2)" }, // 팀 공통 버튼 호버
  "&:disabled": { opacity: 0.5, cursor: "not-allowed" },
}));

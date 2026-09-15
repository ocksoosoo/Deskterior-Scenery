import styled from "@emotion/styled";

export const StyledBadge = styled.span(
  ({ theme, top, left, background, size }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
    ...(size === "sm"
      ? {
          minWidth: "41px",
          padding: "4px 12px",
          borderRadius: theme.radius.full,
          backgroundColor: background || theme.colors.emphasis,
        }
      : {
          minWidth: "62px",
          padding: `${theme.spacing["2xs"]} ${theme.spacing.sm}`,
          borderRadius: theme.radius.full,
          backgroundColor: background || theme.colors.error,
        }),

    color: theme.colors.cards,

    fontSize: theme.fontSize.xs,
    fontWeight: theme.fontWeight.semiBold,
    letterSpacing: "-0.12px",

    // 375px 근처 좁은 화면에서는 카드에 비해 뱃지가 상대적으로 커 보여서 살짝 줄임
    [theme.media.mobile]: {
      minWidth: size === "sm" ? "36px" : "54px",
      padding: size === "sm" ? "3px 10px" : `3px ${theme.spacing.sm}`,
      fontSize: "11px",
    },

    ...(top || left
      ? {
          position: "absolute",
          top: top || theme.spacing.md,
          left: left || theme.spacing.md,
          zIndex: 10,
        }
      : {}),
  }),
);

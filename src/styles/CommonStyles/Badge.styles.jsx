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

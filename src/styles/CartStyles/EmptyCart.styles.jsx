import styled from "@emotion/styled";

export const EmptyContainer = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.colors.cards,
  borderRadius: theme.radius.md,
  padding: `162px ${theme.spacing["3xl"]} 160px`,
  marginBottom: "64px",
  textAlign: "center",
  [theme.media.mobile]: {
    padding: "100px 10px",
    marginBottom: "32px",
  },
}));

export const IconWrapper = styled.div(({ theme }) => ({
  marginBottom: theme.spacing.xl,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingRight: "13px", // 가운데 정렬
}));

export const Title = styled.h3(({ theme }) => ({
  fontSize: theme.fontSize.lg,
  fontWeight: theme.fontWeight.regular,
  color: theme.colors.secondText,
  [theme.media.mobile]: {
    fontSize: theme.fontSize.sm,
  },
}));

export const Subtitle = styled.p(({ theme }) => ({
  fontSize: theme.fontSize.lg,
  fontWeight: theme.fontWeight.regular,
  color: theme.colors.secondText,
  marginBottom: theme.spacing["3xl"],
  [theme.media.mobile]: {
    fontSize: theme.fontSize.sm,
  },
}));

export const ContinueButton = styled.button(({ theme }) => ({
  backgroundColor: theme.colors.textMain,
  color: theme.colors.cards,
  fontSize: theme.fontSize.lg,
  fontWeight: theme.fontWeight.medium,
  padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
  borderRadius: theme.radius.md,
  "&:hover": {
    filter: "brightness(1.5)",
  },
  "&:focus-visible": {
    outline: `${theme.borderWidth.focus} solid ${theme.colors.emphasis}`,
    outlineOffset: "2px",
  },
}));

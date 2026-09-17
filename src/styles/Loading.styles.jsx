import styled from "@emotion/styled";

export const LoadingBox = styled.div(({ theme }) => ({
  position: "fixed",
  inset: 0,
  zIndex: 9999,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing.md,
  backgroundColor: theme.colors.cards,
}));

export const LoadingText = styled.p(({ theme }) => ({
  margin: 0,
  fontSize: theme.fontSize.sm,
  color: "#74766F",
}));

import styled from "@emotion/styled";

export const Box = styled.div(({ theme, $radius, $aspectRatio }) => ({
  width: "100%",
  aspectRatio: $aspectRatio,
  containerType: "inline-size",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  background: theme.colors.imagePlaceholder,
  borderRadius: $radius,
}));

export const Label = styled.span(({ theme, $big }) => ({
  fontFamily: theme.fontFamily.display,
  fontWeight: theme.fontWeight.regular, // 400
  lineHeight: "normal",
  whiteSpace: "nowrap",
  color: "rgba(31, 33, 31, 0.30)",
  fontSize: $big ? theme.fontSize.xl : "13cqw", // 1.25rem
  letterSpacing: $big ? "-0.0625rem" : "-0.05em",
}));

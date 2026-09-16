import styled from "@emotion/styled";

export const LoadingBox = styled.div({
  position: "fixed",
  inset: 0,
  zIndex: 9999,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "16px",
  backgroundColor: "#FDFDFD",
});

export const LoadingText = styled.p({
  margin: 0,
  fontSize: "14px",
  color: "#74766F",
});

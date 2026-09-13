import styled from "@emotion/styled";

export const FailToastStyle = {
  border: "1px solid #F87171",
  borderRadius: "10px",
};

export const FailBox = styled.div({
  position: "relative",
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: 0,
  "& svg": {
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#F87171",
    flexShrink: 0,
  },
});

export const ToastText = styled.p({
  margin: 0,
  width: "100%",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "20px",
  textAlign: "center",
  color: "#222",
});

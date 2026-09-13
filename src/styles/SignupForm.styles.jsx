import styled from "@emotion/styled";
import { Link } from "react-router";

export const SignupPage = styled.main({
  display: "flex",
  justifyContent: "center",
  alignItems: "stretch",
  gap: "20px",
  padding: "60px clamp(16px, 6vw, 64px)",

  "@media (min-width: 320px) and (width < 768px)": {
    alignItems: "center",
  },
});

export const SignupImageWrap = styled.div({
  flex: "1 1 50%",
  minWidth: 0,
  position: "relative",

  "@media (min-width: 320px) and (width < 768px)": {
    display: "none",
  },
});

export const SignupImage = styled.img({
  position: "absolute",
  width: "100%",
  height: "100%",
  objectFit: "fill",
});

export const SignupCard = styled.section({
  flex: "1 1 50%",
  minWidth: 0,
  boxSizing: "border-box",
  padding: "50px 30px",
  border: "1px solid #eee",
  borderRadius: "5px",
  backgroundColor: "#fff",

  "@media (min-width: 320px) and (width < 768px)": {
    flex: "none",
    width: "100%",
    padding: "28px 20px",
  },
});

export const Title = styled.h1({
  margin: "0 0 40px",
  textAlign: "left",
  fontSize: "20px",
  fontWeight: 550,

  "@media (min-width: 320px) and (width < 768px)": {
    marginBottom: "28px",
    fontSize: "16px",
  },
});

export const SignupLink = styled(Link)({
  display: "block",
  textAlign: "center",
  marginTop: "20px",
  fontSize: "15px",
  textDecoration: "none",
  color: "#000000",

  "@media (min-width: 320px) and (width < 768px)": {
    marginTop: "16px",
    fontSize: "13px",
  },
});

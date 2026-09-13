import styled from "@emotion/styled";
import { Link } from "react-router";

export const LoginPage = styled.main({
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  padding: "60px clamp(16px, 6vw, 64px)",

  "@media (min-width: 320px) and (width < 768px)": {
    alignItems: "center",
  },
});

export const LoginImageWrap = styled.div({
  flex: "1 1 50%",
  minWidth: 0,
  position: "relative",

  "@media (min-width: 320px) and (width < 768px)": {
    display: "none",
  },
});

export const LoginImage = styled.img({
  position: "absolute",
  width: "100%",
  height: "100%",
  objectFit: "fill",
});

export const LoginCard = styled.section({
  flex: "1 1 50%",
  minWidth: 0,
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  height: "700px",
  padding: "50px 30px",
  border: "1px solid #eee",
  borderRadius: "5px",
  backgroundColor: "#fff",

  "@media (min-width: 320px) and (width < 768px)": {
    flex: "none",
    height: "auto",
    width: "100%",
    maxWidth: "360px",
    padding: "36px 24px",
  },
});

export const Title = styled.h1(({ theme }) => ({
  fontFamily: theme.fontFamily.display,
  margin: "0 0 40px",
  textAlign: "center",
  fontSize: "40px",

  "@media (min-width: 320px) and (width < 768px)": {
    marginBottom: "30px",
    fontSize: "32px",
  },
}));

export const SignupLink = styled(Link)({
  display: "block",
  textAlign: "center",
  marginTop: "30px",
  fontSize: "15px",
  textDecoration: "none",
  color: "#000000",

  "@media (min-width: 320px) and (width < 768px)": {
    marginTop: "24px",
    fontSize: "13px",
  },
});

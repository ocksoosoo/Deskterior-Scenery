import styled from "@emotion/styled";
import { Link } from "react-router";

export const LoginPage = styled.main(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  padding: "60px clamp(16px, 6vw, 64px)",

  [theme.media.mobile]: {
    alignItems: "center",
  },
}));

export const LoginImageWrap = styled.div(({ theme }) => ({
  flex: "1 1 50%",
  minWidth: 0,
  position: "relative",

  [theme.media.mobile]: {
    display: "none",
  },
}));

export const LoginImage = styled.img({
  position: "absolute",
  width: "100%",
  height: "100%",
  objectFit: "fill",
});

export const LoginCard = styled.section(({ theme }) => ({
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

  [theme.media.mobile]: {
    flex: "none",
    height: "auto",
    width: "100%",
    maxWidth: "360px",
    padding: "36px 24px",
  },
}));

export const Title = styled.h1(({ theme }) => ({
  fontFamily: theme.fontFamily.display,
  margin: "0 0 40px",
  textAlign: "center",
  fontSize: "40px",

  [theme.media.mobile]: {
    marginBottom: "30px",
    fontSize: "32px",
  },
}));

export const SignupLink = styled(Link)(({ theme }) => ({
  display: "block",
  textAlign: "center",
  marginTop: "30px",
  fontSize: "15px",
  textDecoration: "none",
  color: "#000000",

  [theme.media.mobile]: {
    marginTop: "24px",
    fontSize: "13px",
  },
}));

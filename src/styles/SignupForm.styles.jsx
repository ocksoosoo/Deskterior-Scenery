import styled from "@emotion/styled";
import { Link } from "react-router";

export const SignupPage = styled.main(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "stretch",
  gap: "20px",
  padding: "60px clamp(16px, 6vw, 64px)",

  [theme.media.mobile]: {
    alignItems: "center",
  },
}));

export const SignupImageWrap = styled.div(({ theme }) => ({
  flex: "1 1 50%",
  minWidth: 0,
  position: "relative",

  [theme.media.mobile]: {
    display: "none",
  },
}));

export const SignupImage = styled.img({
  position: "absolute",
  width: "100%",
  height: "100%",
  objectFit: "fill",
});

export const SignupCard = styled.section(({ theme }) => ({
  flex: "1 1 50%",
  minWidth: 0,
  boxSizing: "border-box",
  padding: "50px 30px",
  border: "1px solid #eee",
  borderRadius: "5px",
  backgroundColor: "#fff",

  [theme.media.mobile]: {
    flex: "none",
    width: "100%",
    padding: "28px 20px",
  },
}));

export const Title = styled.h1(({ theme }) => ({
  margin: "0 0 40px",
  textAlign: "left",
  fontSize: "20px",
  fontWeight: 550,

  [theme.media.mobile]: {
    marginBottom: "28px",
    fontSize: "16px",
  },
}));

export const SignupLink = styled(Link)(({ theme }) => ({
  display: "block",
  textAlign: "center",
  marginTop: "20px",
  fontSize: "15px",
  textDecoration: "none",
  color: "#000000",

  [theme.media.mobile]: {
    marginTop: "16px",
    fontSize: "13px",
  },
}));

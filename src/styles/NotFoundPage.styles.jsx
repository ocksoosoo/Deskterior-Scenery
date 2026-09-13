import styled from "@emotion/styled";
import { Link } from "react-router";

export const NotFoundBox = styled.main({
  minHeight: "100vh",
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
  backgroundColor: "#222320",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const ErrorContent = styled.div({
  marginTop: "32px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
});

export const ErrorNumber = styled.h1({
  margin: 0,
  padding: 0,
  fontSize: "170px",
  fontWeight: 700,
  lineHeight: 1,
  color: "#74766F",
});

export const ErrorTitle = styled.h2({
  margin: "42px 0 0",
  fontSize: "18px",
  fontWeight: 600,
  lineHeight: "26px",
  color: "#D0D0D0",
});

export const ErrorText = styled.p({
  margin: "4px 0 0",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "22px",
  color: "#D0D0D0",
});

export const TimerText = styled.p({
  margin: "4px 0 0",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "22px",
  color: "#D0D0D0",
});

export const HomeButton = styled(Link)({
  marginTop: "50px",
  width: "170px",
  height: "52px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  backgroundColor: "#FDFDFD",
  color: "#222320",
  borderRadius: "8px",
  fontSize: "17px",
  fontWeight: 600,
  "&:hover": {
    backgroundColor: "#EAEAEA",
  },
});

export const Brand = styled.div({
  marginTop: "auto",
  marginBottom: "60px",
  fontFamily: "serif",
  fontSize: "14px",
  fontWeight: 700,
  lineHeight: 1,
  color: "#FDFDFD",
});

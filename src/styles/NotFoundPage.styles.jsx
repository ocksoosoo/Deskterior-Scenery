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

export const ErrorContent = styled.div(({ theme }) => ({
  marginTop: theme.spacing.xl,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
}));

export const ErrorNumber = styled.h1(({ theme }) => ({
  margin: 0,
  padding: 0,
  fontSize: "170px",
  fontWeight: theme.fontWeight.bold,
  lineHeight: 1,
  color: "#74766F",

  [theme.media.smallMobile]: {
    fontSize: "clamp(120px, calc(31.25vw + 20px), 170px)",
  },
}));

export const ErrorTitle = styled.h2(({ theme }) => ({
  margin: "42px 0 0",
  fontSize: theme.fontSize.lg,
  fontWeight: theme.fontWeight.semiBold,
  lineHeight: "26px",
  color: "#D0D0D0",
}));

export const ErrorText = styled.p(({ theme }) => ({
  margin: `${theme.spacing["2xs"]} 0 0`,
  fontSize: theme.fontSize.sm,
  fontWeight: theme.fontWeight.regular,
  lineHeight: "22px",
  color: "#D0D0D0",

  [theme.media.smallMobile]: {
    fontSize: `clamp(${theme.fontSize.xs}, calc(1.25vw + 8px), ${theme.fontSize.sm})`,
  },
}));

export const TimerText = styled.p(({ theme }) => ({
  margin: `${theme.spacing["2xs"]} 0 0`,
  fontSize: theme.fontSize.sm,
  fontWeight: theme.fontWeight.regular,
  lineHeight: "22px",
  color: "#D0D0D0",
}));

export const HomeButton = styled(Link)(({ theme }) => ({
  marginTop: "50px",
  width: "170px",
  height: "52px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  backgroundColor: "#FDFDFD",
  color: "#222320",
  borderRadius: theme.radius.md,
  fontSize: "17px",
  fontWeight: theme.fontWeight.semiBold,
  "&:hover": {
    backgroundColor: "#EAEAEA",
  },
}));

export const Brand = styled.div(({ theme }) => ({
  marginTop: "auto",
  marginBottom: "60px",
  fontFamily: theme.fontFamily.display,
  fontSize: theme.fontSize.sm,
  fontWeight: theme.fontWeight.bold,
  lineHeight: 1,
  color: "#FDFDFD",
}));

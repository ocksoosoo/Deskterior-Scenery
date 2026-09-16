import styled from "@emotion/styled";
import { Link } from "react-router";

export const LoginPage = styled.main(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "stretch",
  gap: theme.spacing.xl,
  padding: `${theme.spacing["3xl"]} clamp(16px, 6vw, 64px)`,

  [theme.media.mobile]: {
    alignItems: "center",
  },
}));

export const LoginImageWrap = styled.div(({ theme }) => ({
  flex: "1 1 50%",
  alignSelf: "stretch",
  minWidth: 0,
  maxWidth: "520px",
  position: "relative",
  aspectRatio: "1 / 1.15",
  borderRadius: theme.radius.md,
  overflow: "hidden",

  [theme.media.mobile]: {
    display: "none",
  },
}));

export const LoginImage = styled.img({
  position: "absolute",
  width: "100%",
  maxWidth: "520px",
  height: "100%",
  objectFit: "cover",
});

export const LoginCard = styled.section(({ theme }) => ({
  flex: "1 1 50%",
  minWidth: 0,
  maxWidth: "520px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: `${theme.spacing["2xl"]} ${theme.spacing.xl}`,
  border: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
  borderRadius: theme.radius.md,
  backgroundColor: theme.colors.cards,
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",

  [theme.media.mobile]: {
    flex: "none",
    height: "auto",
    width: "100%",
    maxWidth: "360px",
    padding: `${theme.spacing.xl} ${theme.spacing.lg}`,
  },
}));

export const Title = styled.h1(({ theme }) => ({
  fontFamily: theme.fontFamily.display,
  fontSize: theme.fontSize["dpMd"],
  margin: `0 0 ${theme.spacing["2xl"]}`,
  textAlign: "center",
  color: theme.colors.textMain,

  [theme.media.mobile]: {
    marginBottom: theme.spacing.xl,
  },
}));

export const SignupLink = styled(Link)(({ theme }) => ({
  display: "block",
  textAlign: "center",
  marginTop: theme.spacing.xl,
  fontSize: theme.fontSize.sm,
  fontWeight: theme.fontWeight.regular,
  textDecoration: "none",
  color: theme.colors.textMain,
  [theme.media.mobile]: {
    marginTop: theme.spacing.lg,
    fontSize: theme.fontSize.xs,
  },
}));

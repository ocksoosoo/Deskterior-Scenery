import styled from "@emotion/styled";
import { Link } from "react-router";

export const SignupPage = styled.main(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "stretch",
  gap: theme.spacing.md,
  padding: `60px clamp(${theme.spacing.md}, 6vw, ${theme.spacing["3xl"]})`,

  [theme.media.mobile]: {
    alignItems: "center",
  },
}));

export const SignupImageWrap = styled.div(({ theme }) => ({
  flex: "1 1 50%",
  minWidth: 0,
  maxWidth: "520px",
  position: "relative",
  aspectRatio: "1 / 1.35",
  borderRadius: theme.radius.md,
  overflow: "hidden",
  alignSelf: "stretch",
  [theme.media.mobile]: {
    display: "none",
  },
}));

export const SignupImage = styled.img({
  position: "absolute",
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const SignupCard = styled.section(({ theme }) => ({
  flex: "1 1 50%",
  minWidth: 0,
  maxWidth: "520px",
  boxSizing: "border-box",
  padding: theme.spacing.xl,
  border: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
  borderRadius: theme.radius.md,
  backgroundColor: theme.colors.cards,
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",

  [theme.media.mobile]: {
    flex: "none",
    width: "100%",
    padding: `${theme.spacing.xl} ${theme.spacing.lg}`,
  },
}));

export const Title = styled.h1(({ theme }) => ({
  margin: "0 0 40px",
  textAlign: "left",
  fontSize: theme.fontSize.xl,
  fontWeight: theme.fontWeight.semiBold,
  color: theme.colors.textMain,

  [theme.media.mobile]: {
    marginBottom: theme.spacing.lg,
    fontSize: theme.fontSize["2xl"],
  },
}));

export const SignupLink = styled(Link)(({ theme }) => ({
  display: "block",
  textAlign: "center",
  marginTop: theme.spacing.lg,
  fontSize: theme.fontSize.sm,
  textDecoration: "none",
  color: theme.colors.textMain,

  [theme.media.mobile]: {
    marginTop: "16px",
    fontSize: "13px",
  },
}));

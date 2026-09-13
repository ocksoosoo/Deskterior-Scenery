import styled from "@emotion/styled";

export const RecommendContainer = styled.section(({ theme }) => ({
  backgroundColor: theme.colors.cards,
  width: "100%",
  paddingTop: theme.spacing["3xl"],
  paddingBottom: "100px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.media.tablet]: {
    paddingTop: theme.spacing["2xl"],
    paddingBottom: theme.spacing["2xl"],
  },
}));

export const SectionTitle = styled.h2(({ theme }) => ({
  width: "100%",
  maxWidth: "896px",

  fontSize: theme.fontSize["4xl"],
  fontFamily: theme.fontFamily.display,
  color: theme.colors.textMain,
  marginBottom: theme.spacing.xl,
  textAlign: "left",
  [theme.media.tablet]: {
    padding: `0 ${theme.spacing.xl}`,
  },
}));

export const GridContainer = styled.div(({ theme }) => ({
  width: "100%",
  maxWidth: "896px",

  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "26px",
  boxSizing: "border-box",
  [theme.media.tablet]: {
    padding: `0 ${theme.spacing.xl}`,
    gap: theme.spacing.md,
  },
}));

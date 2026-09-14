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
  [theme.media.mobile]: {
    paddingTop: theme.spacing["2xl"],
    paddingBottom: theme.spacing["2xl"],
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
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
  [theme.media.mobile]: {
    padding: 0,
    fontSize: `clamp(${theme.fontSize["2xl"]}, calc(10.667px + 2.778vw), ${theme.fontSize["4xl"]})`,
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
  [theme.media.mobile]: {
    padding: 0,
    gap: theme.spacing.md,
    gridTemplateColumns: "repeat(2, 1fr)",
    //2열 변경
    "& > *:nth-of-type(3)": {
      display: "none",
    },
  },
}));

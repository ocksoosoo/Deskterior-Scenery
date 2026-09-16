import styled from "@emotion/styled";
import SafeImage from "../../components/common/SafeImage";

export const Section = styled.section(({ theme }) => ({
  width: "100vw",
  marginTop: "48px",
  marginLeft: "calc(50% - 50vw)",
  marginRight: "calc(50% - 50vw)",
  padding: "64px 0",
  background: theme.colors.cards, // #FDFDFD

  [theme.media.wide]: {
    marginTop: theme.spacing["3xl"], // 64
    padding: 0,
  },

  [theme.media.tablet]: {
    padding: `${theme.spacing["2xl"]} 0`,
  },

  [theme.media.mobile]: {
    marginTop: 0,
    padding: `${theme.spacing["2xl"]} ${theme.spacing.md}`,
    background: theme.colors.background,
  },
}));

export const Inner = styled.div(({ theme }) => ({
  maxWidth: "1024px",
  margin: "0 auto",
  padding: "0 144px",

  [theme.media.wide]: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "stretch",
    gap: theme.spacing.xl, // 32
    padding: `${theme.spacing["3xl"]} 9rem`, // 64 144
  },

  [theme.media.mobile]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: theme.spacing.lg, // 24
    padding: 0,
  },
}));

export const Title = styled.h2(({ theme }) => ({
  margin: "0 0 24px",
  fontFamily: theme.fontFamily.display,
  fontSize: theme.fontSize["4xl"], // 2rem (32px)
  fontStyle: "normal",
  fontWeight: theme.fontWeight.regular, // 400
  lineHeight: "normal",
  letterSpacing: "-0.01em",
  color: theme.colors.textMain, // #1F211F

  [theme.media.wide]: {
    letterSpacing: "normal",
  },

  [theme.media.mobile]: {
    margin: 0,
    letterSpacing: "normal",
  },
}));

export const DetailImage = styled(SafeImage)(({ theme }) => ({
  display: "block",
  width: "100%",
  maxWidth: "100%",
  aspectRatio: "1 / 1",
  objectFit: "cover",
  margin: "0 auto",
  borderRadius: 8,

  [theme.media.mobile]: {
    width: "85%",
    maxWidth: "85%",
  },
}));

export const Article = styled.article(({ theme }) => ({
  marginBottom: "32px",

  [theme.media.tablet]: {
    marginBottom: theme.spacing.lg,
  },

  [theme.media.mobile]: {
    marginBottom: 0,
    alignSelf: "stretch",
  },
}));

export const SectionTitle = styled.h3(({ theme }) => ({
  margin: "20px 0 8px",
  fontSize: theme.fontSize.lg, // 1.125rem (18px)
  fontStyle: "normal",
  fontWeight: theme.fontWeight.medium, // 500 — Label/MD
  lineHeight: "normal",
  letterSpacing: "-0.00875rem",
  color: theme.colors.textMain, // #1F211F

  [theme.media.mobile]: {
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
  },

  [theme.media.smallMobile]: {
    fontSize: theme.fontSize.md, // 1rem (16px)
  },
}));

export const SectionBody = styled.p(({ theme }) => ({
  margin: 0,
  fontSize: theme.fontSize.lg, // 1.125rem (18px)
  fontStyle: "normal",
  fontWeight: theme.fontWeight.regular, // 400 — Body/MD
  lineHeight: "normal",
  letterSpacing: "-0.00875rem",
  color: theme.colors.secondText, // #74766F

  [theme.media.mobile]: {
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
  },

  [theme.media.smallMobile]: {
    fontSize: theme.fontSize.md, // 1rem (16px)
  },
}));

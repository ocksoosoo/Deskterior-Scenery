import styled from "@emotion/styled";
import { Link } from "react-router";

export const MypageBox = styled.main(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  margin: "0 auto",
  padding: "60px clamp(16px, 6vw, 64px)",
  backgroundColor: theme.colors.background,
}));

export const MypageInner = styled.div({
  width: "100%",
  maxWidth: "896px",
  margin: "0 auto",
});

export const MypageTitle = styled.h1(({ theme }) => ({
  fontFamily: theme.fontFamily.display,
  margin: `0 0 ${theme.spacing.xl}`,
  fontSize: theme.fontSize["4xl"],
  fontWeight: theme.fontWeight.regular,
  color: theme.colors.textMain,
  lineHeight: 1.2,
}));

export const CardBox = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.xl,
  width: "100%",
}));

export const UserCard = styled.section(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minHeight: "180px",
  padding: theme.spacing.xl,
  backgroundColor: theme.colors.cards,
  borderRadius: theme.radius.md,
  border: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
  boxSizing: "border-box",
}));

export const UserName = styled.p(({ theme }) => ({
  margin: 0,
  fontSize: theme.fontSize["4xl"],
  fontWeight: theme.fontWeight.semiBold,
  color: theme.colors.textMain,
  lineHeight: 1.4,
  letterSpacing: "2px",
  overflowWrap: "anywhere",

  [theme.media.smallMobile]: {
    fontSize: `clamp(${theme.fontSize.xl}, calc(7.5vw - 4px), ${theme.fontSize["4xl"]})`,
  },
}));

export const UserBottom = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  marginTop: "auto",
  paddingTop: theme.spacing.lg,

  [theme.media.smallMobile]: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: theme.spacing.lg,
  },
}));

export const UserLogOut = styled.button(({ theme }) => ({
  padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
  border: "none",
  borderRadius: theme.radius.md,
  backgroundColor: theme.colors.textMain,
  color: theme.colors.cards,
  fontSize: theme.fontSize.lg,
  fontWeight: theme.fontWeight.medium,
  cursor: "pointer",
  cursor: "pointer",
  "&:hover": {
    filter: "brightness(1.5)",
  },
}));

export const UserId = styled.p(({ theme }) => ({
  margin: 0,
  fontSize: theme.fontSize.md,
  fontWeight: theme.fontWeight.regular,
  color: theme.colors.secondText,

  [theme.media.smallMobile]: {
    alignSelf: "flex-start",
  },
}));

export const AccountCard = styled.section(({ theme }) => ({
  width: "100%",
  minHeight: "380px",
  padding: theme.spacing.xl,
  backgroundColor: theme.colors.cards,
  border: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
  borderRadius: theme.radius.md,
}));

export const AccountTitle = styled.h2(({ theme }) => ({
  fontFamily: theme.fontFamily.display,
  marginBottom: theme.spacing.lg,
  paddingBottom: theme.spacing.md,
  borderBottom: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
  fontSize: theme.fontSize["3xl"],
  lineHeight: 1.2,

  [theme.media.smallMobile]: {
    fontSize: `clamp(${theme.fontSize.xl}, calc(5vw + 4px), ${theme.fontSize["3xl"]})`,
  },
}));

export const AccountForm = styled.form({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const AccountGrid = styled.div(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  columnGap: theme.spacing.xl,
  rowGap: theme.spacing.lg,
  width: "100%",

  [theme.media.smallMobile]: {
    gridTemplateColumns: "1fr",
    columnGap: 0,
    rowGap: "24px",
  },
}));

export const AccountField = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.xs,
  minWidth: 0,
}));

export const AddressField = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.xs,
  gridColumn: "1 / -1",
}));

export const ReadonlyText = styled.span(({ theme }) => ({
  marginLeft: theme.spacing["2xs"],
  fontSize: theme.fontSize.xs,
  fontWeight: theme.fontWeight.regular,
  color: theme.colors.secondText,
}));

export const AccountLabel = styled.label(({ theme }) => ({
  fontSize: theme.fontSize.sm,
  fontWeight: theme.fontWeight.medium,
  color: theme.colors.textMain,
}));

export const Required = styled.span(({ theme }) => ({
  color: theme.colors.emphasis,
}));

export const AccountInput = styled.input(({ theme }) => ({
  width: "100%",
  padding: `${theme.spacing.xs} 0`,
  border: "none",
  borderBottom: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
  outline: "none",
  backgroundColor: "transparent",
  fontSize: theme.colors.textMain,
  lineHeight: 1.4,
  color: theme.colors.textMain,
  transition: "border-color 0.2s ease",

  "&:focus": {
    borderBottomWidth: theme.borderWidth.focus,
    borderBottomColor: theme.colors.textMain,
  },
  "&:placeholder": {
    color: theme.colors.secondText,
  },
  "&[readonly]": {
    color: theme.colors.secondText,
    cursor: "default",
  },
}));

export const SaveArea = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  marginTop: theme.spacing.xl,

  [theme.media.mobile]: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: theme.spacing.sm,
  },
}));

export const ErrorIconWrapper = styled.span(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  color: theme.colors.error,

  "& svg": {
    width: "18px",
    height: "18px",
  },

  [theme.media.smallMobile]: {
    "& svg": {
      width: "15px",
      height: "15px",
    },
  },
}));

export const ErrorText = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.xs,
  padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
  borderRadius: theme.radius.md,
  backgroundColor: "#f8d1bd",
  color: theme.colors.textMain,
  fontSize: theme.fontSize.xs,

  [theme.media.mobile]: {
    width: "100%",
    boxSizing: "border-box",
  },

  [theme.media.smallMobile]: {
    fontSize: "clamp(10px, calc(1.875vw + 4px), 13px)",
    gap: "2px",
  },
}));

export const SaveButton = styled.button(({ theme }) => ({
  marginLeft: "auto",
  padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
  border: "none",
  borderRadius: theme.radius.md,
  backgroundColor: theme.colors.textMain,
  color: theme.colors.cards,
  fontSize: theme.fontSize.lg,
  fontWeight: theme.fontWeight.medium,
  cursor: "pointer",
  transition: "opacity 0.2s ease",
  "&:hover": {
    filter: "brightness(1.5)",
  },

  [theme.media.mobile]: { width: "100%", marginLeft: 0 },

  "@media (prefers-reduced-motion: no-preference)": {
    "&.shake": {
      animation: "shake 0.35s ease-in-out",
    },
  },
  "@media (prefers-reduced-motion: reduce)": {
    "&.shake": {
      animation: "none",
    },
  },
  "@keyframes shake": {
    "0%": {
      transform: "translateX(0)",
    },
    "20%": {
      transform: "translateX(-6px)",
    },
    "40%": {
      transform: "translateX(6px)",
    },
    "60%": {
      transform: "translateX(-4px)",
    },
    "80%": {
      transform: "translateX(4px)",
    },
    "100%": {
      transform: "translateX(0)",
    },
  },
}));

export const SettingsCard = styled.section(({ theme }) => ({
  width: "100%",
  minHeight: "240px",
  padding: theme.spacing.xl,
  backgroundColor: theme.colors.cards,
  borderRadius: theme.radius.md,
  border: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
}));

export const SettingsTitle = styled.h2(({ theme }) => ({
  fontFamily: theme.fontFamily.display,
  margin: `0 0 ${theme.spacing.xl}`,
  fontSize: theme.fontSize["4xl"],
  fontWeight: theme.fontWeight.regular,
  color: theme.colors.textMain,
  lineHeight: 1.2,

  [theme.media.smallMobile]: {
    fontSize: theme.fontSize["2xl"],
  },
}));

export const Settingstext = styled.p(({ theme }) => ({
  margin: `0 0 ${theme.spacing.xl}`,
  fontSize: theme.fontSize.sm,
  lineHeight: 1.5,
  color: theme.colors.secondText,

  "@media (width < 506px)": {
    fontSize: theme.fontSize.xs,
  },
}));

export const SettingsBtnGroup = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.md,

  [theme.media.smallMobile]: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: theme.spacing.sm,
  },
}));

export const SettingsDeleteBtn = styled.button(({ theme }) => ({
  padding: `${theme.spacing.sm} ${theme.spacing.md}`,
  border: `${theme.borderWidth.default} solid ${theme.colors.error}`,
  borderRadius: theme.radius.md,
  backgroundColor: theme.colors.cards,
  color: theme.colors.error,
  fontSize: theme.fontSize.sm,
  fontWeight: theme.fontWeight.medium,
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  "&:hover": {
    filter: "brightness(1.02)",
  },
  [theme.media.smallMobile]: {
    width: "100%",
  },
}));

export const SettingsChangeBtn = styled.button(({ theme }) => ({
  padding: `${theme.spacing.sm} ${theme.spacing.md}`,
  border: "none",
  borderRadius: theme.radius.md,
  backgroundColor: theme.colors.subtle,
  color: theme.colors.textMain,
  fontSize: theme.fontSize.sm,
  fontWeight: theme.fontWeight.medium,
  cursor: "pointer",
  "&:hover": {
    filter: "brightness(1.02)",
  },
  [theme.media.smallMobile]: {
    width: "100%",
  },
}));

export const PasswordFormBox = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.lg,
  width: "100%",
  padding: `${theme.spacing.lg} ${theme.spacing.md}`,
  marginTop: theme.spacing.lg,
  marginBottom: "36px",
  boxSizing: "border-box",
}));

export const PasswordField = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.xs,
  width: "100%",
}));

export const PasswordLabel = styled.label(({ theme }) => ({
  fontSize: theme.fontSize.md,
  fontWeight: theme.fontWeight.medium,
  color: theme.colors.textMain,
}));

export const CurrentPasswordGroup = styled.div({
  position: "relative",
  width: "100%",
});

export const NewPasswordGroup = styled.div({
  position: "relative",
  width: "100%",
});

export const PasswordInput = styled.input(({ theme }) => ({
  width: "100%",
  height: "54px",
  padding: `0 ${theme.spacing["2xl"]} 0 ${theme.spacing.md}`,
  boxSizing: "border-box",
  border: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
  borderRadius: theme.radius.sm,
  outline: "none",
  backgroundColor: theme.colors.cards,
  fontSize: theme.fontSize.sm,
  color: theme.colors.textMain,
  transition: "border-color 0.2s ease",
  "&::placeholder": {
    color: theme.colors.secondText,
  },

  "&:focus": {
    borderColor: theme.colors.textMain,
  },
}));

export const CurrentPasswordHidenButton = styled.button(({ theme }) => ({
  position: "absolute",
  top: "50%",
  right: theme.spacing.sm,
  transform: "translateY(-50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  border: "none",
  backgroundColor: "transparent",
  color: theme.colors.secondText,
  cursor: "pointer",
}));

export const NewPasswordHidenButton = styled.button(({ theme }) => ({
  position: "absolute",
  top: "50%",
  right: "14px",
  transform: "translateY(-50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  border: "none",
  backgroundColor: "transparent",
  color: theme.colors.secondText,
  cursor: "pointer",
}));

export const PasswordError = styled.p(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.xs,
  width: "100%",
  padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
  boxSizing: "border-box",
  backgroundColor: "#f8d1bd",
  color: theme.colors.textMain,
  fontSize: theme.fontSize.xs,
  borderRadius: theme.radius.sm,
  color: theme.colors.textMain,
  fontSize: theme.fontSize.xs,
}));

export const MypageBreadcrumb = styled.nav(({ theme }) => ({
  marginBottom: theme.spacing.sm,
  fontSize: theme.fontSize.md,
  fontWeight: theme.fontWeight.regular,
  color: theme.colors.secondText,

  [theme.media.mobile]: {
    fontSize: theme.fontSize.xs,
  },
}));

export const MypageBreadcrumbLink = styled(Link)({
  color: "inherit",

  "&:hover": {
    textDecoration: "underline",
  },
});

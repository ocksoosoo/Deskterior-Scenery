import styled from "@emotion/styled";

export const FooterContainer = styled.footer(({ theme }) => ({
  width: "100%",
  // color-text-primary: 태블릿/PC/와이드/모바일 전 구간 통일
  backgroundColor: "#1F211F",
  padding: "70px 0 30px",
  boxSizing: "border-box",

  [theme.media.mobile]: {
    display: "flex",
    // spacing-2xl(48) spacing-md(16) spacing-xl(32) spacing-md(16)
    paddingTop: "48px",
    paddingRight: "calc(16px + env(safe-area-inset-right))",
    paddingBottom: "calc(32px + env(safe-area-inset-bottom))",
    paddingLeft: "calc(16px + env(safe-area-inset-left))",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "32px", // spacing-xl
    alignSelf: "stretch",
  },
}));

export const FooterInner = styled.div(({ theme }) => ({
  width: "85%",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",

  [theme.media.mobile]: {
    width: "100%",
    margin: 0,
    flexDirection: "column",
    alignItems: "flex-start",
    // FooterContainer 자체가 32px gap을 가진 flex column이 되면서, FooterInfo/FooterSupport가
    // 이 안에 있어도 같은 32px 간격으로 보이도록 여기 gap도 동일하게 맞춤(spacing-xl)
    gap: "32px",
  },
}));

export const FooterInfo = styled.section(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "15px",

  [theme.media.mobile]: {
    gap: "12px",
  },
}));

export const FooterLogo = styled.h2(({ theme }) => ({
  margin: 0,
  color: "#FDFDFD", // Cards
  fontFamily: "'DM Serif Text', serif", // 헤더 로고(theme.fontFamily.display)와 동일한 폰트
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "normal",
  textAlign: "left",

  // 헤더 로고도 모바일에서만 -1px, 그 외(태블릿/데스크탑/와이드)엔 letterSpacing을
  // 안 줘서(normal) 두 로고가 같은 폰트·크기일 때 똑같이 보이는데, 여긴 -1px가
  // 항상 걸려있어서 폰트사이즈가 같아도(24px) 글자 간격 때문에 더 좁아 보였음
  [theme.media.wide]: {
    fontSize: "24px",
  },

  [theme.media.mobile]: {
    fontSize: "16px",
    letterSpacing: "-1px",
  },
}));

export const FooterDescription = styled.p(({ theme }) => ({
  margin: 0,
  color: "#74766F", // Secondary Text
  fontSize: "16px",
  lineHeight: 1.4,
  textAlign: "left",

  [theme.media.mobile]: {
    fontSize: "13px",
    lineHeight: 1.5,
  },
}));

export const FooterSupport = styled.section(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "5px",

  [theme.media.wide]: {
    gap: theme.spacing.sm,
  },

  [theme.media.mobile]: {
    flexDirection: "row",
    alignItems: "center",
    gap: "15px",
  },
}));

export const SupportTitle = styled.h3(({ theme }) => ({
  margin: 0,
  color: "#74766F", // Secondary Text
  fontSize: "16px",
  fontWeight: 500,
  textAlign: "left",
  cursor: "pointer",
  transition: "color 0.2s ease",

  "&:hover": {
    color: "#FDFDFD", // Cards
  },

  [theme.media.mobile]: {
    fontWeight: 0,
    fontSize: "13px",
  },
}));

export const SupportText = styled.p(({ theme }) => ({
  margin: 0,
  color: "#74766F", // Secondary Text
  fontSize: "16px",
  textAlign: "left",
  cursor: "pointer",
  transition: "color 0.2s ease",

  "&:hover": {
    color: "#FDFDFD", // Cards
  },

  [theme.media.mobile]: {
    fontSize: "13px",
  },
}));

export const Copyright = styled.p(({ theme }) => ({
  width: "85%",
  margin: "60px auto 0",
  color: "#74766F", // Secondary Text
  fontSize: "14px",
  textAlign: "left",

  [theme.media.mobile]: {
    width: "100%",
    // FooterContainer의 gap(32px)이 이미 위쪽 간격을 만들어주므로 margin은 없앰
    margin: 0,
    fontSize: "12px",
  },
}));

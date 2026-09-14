import styled from "@emotion/styled";
import { Link } from "react-router";

export const HeaderSection = styled.header(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: 50,
  width: "100%",
  height: theme.layout.headerHeight,
  padding: `0 ${theme.spacing.xl}`,
  display: "flex",
  alignItems: "center",
  backgroundColor: `${theme.colors.background}BF`, // BF: 불투명도 약 80%

  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)", // 사파리 호환용

  "@media ((min-width: 320px) and (width < 768px))": {
    // 모바일도 햄버거 메뉴·아이콘을 스크롤 중에 계속 눌러야 하므로 sticky 유지
    position: "sticky",
    height: "64px",
    padding: `0 ${theme.spacing.md}`,
    // 로고가 화면 정중앙에 오도록 3분할 grid 사용. absolute + left:50%는 아이콘
    // 묶음 폭이 넓어질 때 로고와 겹치는 문제가 있었음.
    // 1fr auto 1fr로 하면 좌우 두 fr 트랙이 "같은 비율"일 뿐 "같은 폭"이 아니라서,
    // 아이콘 묶음(88px)이 햄버거(44px)보다 넓은 만큼 좌측 트랙까지 같이 늘어나며
    // 가운데 로고 공간을 좁혀 로고와 아이콘이 거의 붙어버리는 문제가 있었음.
    // 양쪽을 아이콘 묶음 폭(88px)으로 고정해 완전히 대칭시켜야 로고가 정확히
    // 중앙에 오면서도 여백이 확보됨 (Figma 스펙상 아이콘 컨테이너 시작 x=216과 일치)
    display: "grid",
    gridTemplateColumns: "88px 1fr 88px",
    borderBottom: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
    // color-surface-card: 모바일은 블러 없이 불투명 배경
    backgroundColor: theme.colors.cards,
    backdropFilter: "none",
    WebkitBackdropFilter: "none",
  },
}));

export const Logo = styled.h1(({ theme }) => ({
  flex: "0 0 96px",
  color: theme.colors.textMain,
  fontSize: theme.fontSize.xl,
  fontFamily: theme.fontFamily.display,

  "@media (min-width: 320px) and (width < 768px)": {
    flex: "none",
    justifySelf: "center",
    fontSize: "24px",
    fontStyle: "normal",
    fontWeight: theme.fontWeight.regular,
    lineHeight: "normal",
    letterSpacing: "-1px",
  },

  // 320px 근처 좁은 화면에서는 로고 글자 크기도 함께 줄임
  [theme.media.smallMobile]: {
    fontSize: "20px",
  },
}));

export const Navigation = styled.nav({
  display: "flex",
  flex: 1,
  justifyContent: "center",

  "@media (min-width: 320px) and (width < 768px)": {
    display: "none",
  },
});

export const NavList = styled.ul(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.lg,
}));

export const NavItem = styled.li({});

export const NavButton = styled("a", {
  shouldForwardProp: (prop) => prop !== "isActive" && prop !== "as",
})(({ theme, isActive }) => ({
  position: "relative",
  fontSize: `clamp(12px, 1.1vw, ${theme.fontSize.sm})`,
  fontWeight: isActive ? theme.fontWeight.semiBold : theme.fontWeight.regular,
  color: isActive ? theme.colors.textMain : theme.colors.secondText,
  cursor: "pointer",
  whiteSpace: "nowrap",
  "&:hover": {
    color: theme.colors.textMain,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    left: "50%",
    bottom: `-${theme.spacing["2xs"]}`,
    height: "1.5px",
    background: theme.colors.textMain,
    width: "0%",
    transform: "translateX(-50%)",
    transition: "width 0.25s ease",
  },
  "&:hover::after": {
    width: "100%",
  },
}));

export const IconContainer = styled.div(({ theme }) => ({
  display: "flex",
  flex: "0 0 96px",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: theme.spacing.sm,

  "@media (min-width: 320px) and (width < 768px)": {
    flex: "none",
    justifySelf: "end",
    height: "44px",
    justifyContent: "center",
    gap: theme.spacing.xs,
  },
}));

export const IconButton = styled.button({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
});

// 로그인/로그아웃, 마이페이지 버튼 - 모바일은 햄버거 메뉴 안에 로그인/로그아웃/
// 마이페이지가 이미 있어서 헤더에 중복으로 노출할 필요가 없어 숨김
export const AuthIconButton = styled(IconButton)(({ theme }) => ({
  [theme.media.mobile]: {
    display: "none",
  },
}));

// 장바구니 버튼 - 모바일에서는 로그인/마이페이지 버튼이 빠지고 이것만 남으므로,
// 왼쪽 햄버거 메뉴 버튼(44x44)과 클릭 영역은 맞추되, 바구니 아이콘은 실선(선 굵기)이
// 아니라 채워진 도형이라 44px 그대로 두면 햄버거보다 훨씬 커 보여서 아이콘만 살짝 줄임
export const CartIconButton = styled(IconButton)(({ theme }) => ({
  [theme.media.mobile]: {
    width: "44px",
    height: "44px",
    "& svg": {
      width: "32px",
      height: "32px",
    },
  },
}));

export const MenuButton = styled.button({
  display: "none",

  "@media (min-width: 320px) and (width < 768px)": {
    display: "flex",
    justifySelf: "start",
    alignItems: "center",
    justifyContent: "center",
    width: "44px",
    height: "44px",
    padding: 0,
    cursor: "pointer",
  },
});

export const CartIconWrapper = styled.div({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const CartBadge = styled.span(({ theme }) => ({
  position: "absolute",
  top: "-4px",
  right: "-8px",
  backgroundColor: theme.colors.emphasis,
  color: "#FFFFFF",
  fontSize: "12px",
  fontWeight: 700,
  minWidth: "18px",
  height: "18px",
  padding: "0 4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "999px",
  boxSizing: "border-box",
}));

// 모바일 햄버거 메뉴를 눌렀을 때 뜨는 드로어
export const MobileMenuOverlay = styled.div({
  position: "fixed",
  inset: 0,
  zIndex: 100,
  background: "rgba(0, 0, 0, 0.5)",
  opacity: 0,
  transition: "opacity 0.28s ease",

  "&[data-open='true']": {
    opacity: 1,
  },
});

export const MobileMenuPanel = styled.div(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  // Figma 목업의 520px는 그 캔버스 자체의 높이일 뿐이라, 실제 폰(대부분 600~900px)
  // 에서는 top+bottom으로 화면 전체를 채워야 드로어 아래로 어두운 오버레이가
  // 비쳐 보이는 문제가 없음
  bottom: 0,
  zIndex: 101,
  width: "320px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: theme.spacing.lg,
  gap: theme.spacing.lg,
  background: theme.colors.cards,
  overflowY: "auto",
  transform: "translateX(-100%)",
  transition: "transform 0.28s ease",

  "&[data-open='true']": {
    transform: "translateX(0)",
  },
}));

export const MobileMenuHeader = styled.div({
  display: "flex",
  width: "100%",
  height: "44px",
  justifyContent: "space-between",
  alignItems: "center",
  flexShrink: 0,
});

export const MobileMenuLogo = styled.span(({ theme }) => ({
  color: theme.colors.textMain,
  fontFamily: theme.fontFamily.display,
  fontSize: theme.fontSize.xl,
  fontStyle: "normal",
  fontWeight: theme.fontWeight.regular,
  lineHeight: "normal",
  letterSpacing: "-0.4px",
}));

export const MobileMenuCloseButton = styled.button({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  border: "none",
  background: "none",
  color: "inherit",
  cursor: "pointer",
});

export const MobileMenuAuthRow = styled.div(({ theme }) => ({
  display: "flex",
  height: "44px",
  alignItems: "center",
  gap: theme.spacing.sm,
  flexShrink: 0,
  alignSelf: "stretch",
}));

export const MobileMenuAuthButton = styled(Link)(({ theme }) => ({
  display: "flex",
  flex: 1,
  height: "40px",
  padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing.xs,
  borderRadius: theme.radius.md,
  border: "none",
  background: theme.colors.textMain,
  color: "#fff",
  textAlign: "center",
  fontFamily: theme.fontFamily.base,
  fontSize: theme.fontSize.sm,
  fontStyle: "normal",
  fontWeight: theme.fontWeight.medium,
  lineHeight: "normal",
  letterSpacing: "-0.14px",
  cursor: "pointer",
}));

// 원형 아이콘 링크 버튼 (마이페이지 등 - 장바구니는 헤더에 항상 보이므로 여기선 뺌)
export const MobileMenuIconLinkButton = styled(Link)(({ theme }) => ({
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  width: "44px",
  height: "44px",
  borderRadius: theme.radius.full,
  border: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
  background: theme.colors.cards,
  color: theme.colors.textMain,
}));

export const MobileMenuPersonButton = styled(MobileMenuIconLinkButton)({});

export const MobileMenuDivider = styled.hr(({ theme }) => ({
  width: "100%",
  border: "none",
  borderTop: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
  margin: 0,
}));

export const MobileMenuCategoryList = styled.nav(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing.md,
  alignSelf: "stretch",
}));

export const MobileMenuCategoryLink = styled(Link)(({ theme }) => ({
  display: "flex",
  width: "100%",
  height: "40px",
  alignItems: "center",
  fontSize: theme.fontSize.lg,
  fontWeight: theme.fontWeight.regular,
  color: theme.colors.textMain,
}));

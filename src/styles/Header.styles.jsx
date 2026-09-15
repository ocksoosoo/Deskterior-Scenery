import styled from "@emotion/styled";
import { Link } from "react-router";

export const HeaderSection = styled.header(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: 50,
  width: "100%",
  height: theme.layout.headerHeight,
  padding: `0 ${theme.spacing["3xl"]}`,
  display: "flex",
  alignItems: "center",
  backgroundColor: `${theme.colors.background}BF`, // BF: 불투명도 약 80%

  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)", // 사파리 호환용

  // 768px 근처는 로고(96px 고정)+아이콘(96px 고정)+양쪽 padding(64px씩)을 빼면
  // 카테고리 5개가 들어갈 공간이 얼마 안 남아서, 네비게이션이 로고/아이콘에
  // 거의 붙어버렸다. padding을 줄이고, 세 영역(로고/네비/아이콘) 사이 최소
  // 간격을 gap으로 보장해서 아무리 좁아도 서로 붙지 않게 함
  [theme.media.tablet]: {
    padding: `0 ${theme.spacing.lg}`,
    gap: theme.spacing.md,
  },

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

  [theme.media.wide]: {
    fontSize: "24px",
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

  // 768px 근처는 카테고리 5개가 다 들어갈 폭이 빠듯해서, 항목 사이 간격을
  // 살짝 줄여 전체적으로 덜 답답해 보이게 함
  [theme.media.tablet]: {
    gap: theme.spacing.md,
  },
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
    // 지금 보고 있는 카테고리는 굵기 효과처럼 밑줄도 항상 보이게 함
    width: isActive ? "100%" : "0%",
    transform: "translateX(-50%)",
    transition: "width 0.25s ease",
  },
  "&:hover::after": {
    width: "100%",
  },

  // clamp(12px, 1.1vw, 14px)라 1024px 근처에서는 1.1vw(약 11.3px)가 12px보다
  // 작아서 최소값(12px)으로 눌려버린다. pc 구간(1024~1439px)에서는 14px 고정
  [theme.media.pc]: {
    fontSize: theme.fontSize.sm,
  },

  [theme.media.wide]: {
    fontSize: theme.fontSize.md,
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
  // 아이콘 자체는 24x24로 작아서 정교하게 눌러야 하는 불편함이 있어, 버튼
  // 터치 영역만 44x44(햄버거 버튼과 동일)로 넓힘 - 아이콘은 가운데 정렬 유지
  width: "44px",
  height: "44px",
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

// emotion의 as prop은 styled(Link)처럼 컴포넌트를 감싼 경우 런타임에 다른
// 태그로 바꿔치기가 안 먹혀서(ProductCard.styles.jsx에서도 같은 문제로 컴포넌트를
// 나눴었음), Logout처럼 실제로는 링크가 아니라 버튼이어야 하는 곳에 as="button"을
// 줘도 여전히 <a>로 렌더링돼버린다. 스타일만 공유하고 컴포넌트 자체를 둘로 나눔
const mobileMenuAuthButtonStyle = (theme) => ({
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
});

// Login/Sign Up처럼 실제 페이지로 이동하는 링크
export const MobileMenuAuthButton = styled(Link)(({ theme }) =>
  mobileMenuAuthButtonStyle(theme),
);
// Logout처럼 이동 없이 동작만 하는, 진짜 <button>이어야 하는 경우
export const MobileMenuAuthActionButton = styled.button(({ theme }) =>
  mobileMenuAuthButtonStyle(theme),
);

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

export const MobileMenuCategoryLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== "isActive",
})(({ theme, isActive }) => ({
  display: "flex",
  width: "100%",
  height: "40px",
  alignItems: "center",
  position: "relative",
  // 활성 표시 막대가 들어갈 자리를 항상 비워둬서, 어떤 카테고리가 활성화되든
  // 텍스트 시작 위치가 흔들리지 않게 함
  paddingLeft: theme.spacing.md,
  fontSize: theme.fontSize.lg,
  fontWeight: theme.fontWeight.regular,
  color: theme.colors.textMain,

  // 메뉴를 다시 열었을 때 지금 보고 있는 카테고리를 텍스트 왼쪽 막대로 표시
  ...(isActive && {
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: "50%",
      transform: "translateY(-50%)",
      width: "3px",
      height: "1em",
      borderRadius: 0,
      backgroundColor: theme.colors.emphasis,
    },
  }),
}));

import styled from "@emotion/styled";
import { SearchIcon, CloseIcon } from "../../components/icons/Icons";

export const StyledSearchIcon = styled(SearchIcon)({
  flexShrink: 0,
});

// 돋보기도 호버/클릭이 되는 버튼으로 감싸서 검색을 즉시 실행할 수 있게 함
// (색상은 버튼 쪽에 두고 아이콘은 currentColor로 상속받아 호버에 같이 반응)
export const SearchSubmitButton = styled.button(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  padding: 0,
  border: "none",
  background: "none",
  color: theme.colors.secondText,
  cursor: "pointer",

  "&:hover": {
    color: theme.colors.textMain,
  },
}));

// 입력한 검색어를 한 번에 지우는 버튼 - 돋보기 왼쪽에 위치, 입력값이 있을 때만 보임
export const ClearButton = styled.button(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: "22px",
  height: "22px",
  padding: 0,
  border: "none",
  background: "none",
  color: theme.colors.secondText,
  cursor: "pointer",

  "&:hover": {
    color: theme.colors.textMain,
  },
}));

export const ClearIcon = styled(CloseIcon)({
  width: "22px",
  height: "22px",
  // CloseIcon의 path가 stroke="#74766F"로 색이 고정돼있어서, 부모 버튼(hover
  // 포함)의 color를 바꿔도 반영이 안 됐다. currentColor로 덮어써서 상속되게 함
  "& path": {
    stroke: "currentColor",
  },
});

// X 버튼과 돋보기 아이콘을 구분하는 세로선
export const SearchDivider = styled.span(({ theme }) => ({
  flexShrink: 0,
  width: "1px",
  height: "18px",
  background: theme.colors.subtle,
}));

export const ToolbarWrapper = styled.div(({ theme }) => ({
  display: "flex",
  width: "100%",
  maxWidth: "896px",
  padding: `0 ${theme.spacing.md}`,
  justifyContent: "space-between",
  alignItems: "flex-start",
  alignSelf: "center",

  [theme.media.tablet]: {
    maxWidth: "100%",
    padding: 0,
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
    gap: theme.spacing.sm,
  },

  [theme.media.mobile]: {
    maxWidth: "100%",
    padding: 0,
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
    gap: theme.spacing.sm,
  },
}));

export const SearchBox = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  alignSelf: "stretch",
  gap: theme.spacing.xs,
  border: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
  borderRadius: theme.radius.full,
  background: theme.colors.cards,
  padding: `${theme.spacing.sm} ${theme.spacing.md}`,
  // 가장 긴 상품명("Minimal Bluetooth Mechanical Keyboard" 등, 약 250px)이
  // X버튼+구분선+돋보기(약 60px)까지 다 뜬 상태에서도 안 잘리게 여유있게 잡음
  width: "400px",
  // X버튼(22px)이 입력창 줄 높이보다 커서, 검색어 유무에 따라 flex의
  // "가장 큰 자식" 기준 높이가 달라져 박스가 미세하게 커졌다 작아졌다 했다.
  // 높이를 고정해서 X버튼이 나타나도 박스 크기가 흔들리지 않게 함
  height: "46px",
  boxSizing: "border-box",

  [theme.media.tablet]: {
    width: "100%",
  },

  [theme.media.mobile]: {
    width: "100%",
  },
}));

export const SearchInput = styled.input(({ theme }) => ({
  border: "none",
  outline: "none",
  fontSize: theme.fontSize.sm,
  flex: 1,
  minWidth: 0,
  background: "transparent",
  color: theme.colors.textMain,

  "&::placeholder": {
    color: theme.colors.secondText,
  },

  // 클릭(포커스)하는 동안엔 힌트 텍스트를 숨기고, 다른 곳을 클릭(블러)하면
  // 입력값이 비어있을 때 다시 보이게 함 (기본 동작은 값이 없어도 포커스 중엔 계속 보임)
  "&:focus::placeholder": {
    opacity: 0,
  },
}));

export const SortBox = styled.div(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.xs,
  border: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
  borderRadius: theme.radius.sm,
  background: theme.colors.cards,
  padding: `${theme.spacing.sm} ${theme.spacing.md}`,
  fontSize: theme.fontSize.sm,
  cursor: "pointer",

  [theme.media.tablet]: {
    minWidth: "118px",
    height: "41px",
    padding: `0 ${theme.spacing.sm}`,
    justifyContent: "center",
    border: "none",
    borderRadius: theme.radius.md,

    "& strong": {
      whiteSpace: "nowrap",
    },
    background: "#fff",
    alignSelf: "flex-end",
  },

  [theme.media.mobile]: {
    minWidth: "118px",
    height: "41px",
    padding: `0 ${theme.spacing.sm}`,
    justifyContent: "center",
    border: "none",
    borderRadius: theme.radius.md,

    "& strong": {
      whiteSpace: "nowrap",
    },
    background: "#fff",
    alignSelf: "flex-end",
  },
}));

export const SortLabel = styled.span(({ theme }) => ({
  color: theme.colors.secondText,
}));

export const SortMenu = styled.ul(({ theme }) => ({
  position: "absolute",
  top: "calc(100% + 4px)",
  right: 0,
  minWidth: "140px",
  background: theme.colors.cards,
  border: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
  borderRadius: theme.radius.md,
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.12)",
  listStyle: "none",
  margin: 0,
  padding: theme.spacing["2xs"],
  zIndex: 10,
}));

export const SortMenuItem = styled.li(({ theme, $active }) => ({
  padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
  borderRadius: theme.radius.sm,
  cursor: "pointer",
  fontFamily: theme.fontFamily.base,
  fontSize: theme.fontSize.sm,
  fontWeight: theme.fontWeight.medium,
  lineHeight: "normal",
  letterSpacing: "-0.14px",
  color: theme.colors.textMain,
  background: $active ? theme.colors.subtle : "transparent",

  "&:hover": {
    background: theme.colors.subtle,
  },
}));

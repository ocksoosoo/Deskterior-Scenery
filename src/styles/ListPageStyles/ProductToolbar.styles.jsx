import styled from "@emotion/styled";
import { SearchIcon, CloseIcon } from "../../components/icons/Icons";

export const StyledSearchIcon = styled(SearchIcon)({
  flexShrink: 0,
});

// 돋보기를 버튼으로 감싸서 클릭 시 즉시 검색 실행 (색은 버튼→아이콘 currentColor 상속)
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
  // CloseIcon의 path stroke가 고정색이라 부모 color 변화가 반영 안 되던 것을 상속되게 함
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
  // 가장 긴 상품명 + X버튼/구분선/돋보기까지 다 떠도 안 잘리게 여유있게 잡음
  width: "400px",
  // X버튼 유무로 박스 높이가 미세하게 흔들리는 것 방지
  height: "46px",
  boxSizing: "border-box",

  [theme.media.tablet]: {
    width: "100%",
  },

  [theme.media.mobile]: {
    width: "100%",
  },

  // input의 outline을 지웠으므로 박스 테두리 색으로 포커스 여부를 대신 드러낸다
  "&:focus-within": {
    borderColor: theme.colors.emphasis,
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

  // 포커스 중엔 placeholder 숨기고, blur 시 값이 비어있으면 다시 표시
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

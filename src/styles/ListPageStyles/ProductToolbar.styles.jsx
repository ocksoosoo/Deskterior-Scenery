import styled from "@emotion/styled";
import { SearchIcon } from "../../components/icons/Icons";

export const StyledSearchIcon = styled(SearchIcon)(({ theme }) => ({
  color: theme.colors.secondText,
  flexShrink: 0,
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
  width: "260px",

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

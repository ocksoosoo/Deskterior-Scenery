import styled from "@emotion/styled";
import { ChevronLeftIcon, ChevronRightIcon } from "../../components/icons/Icons";

export const PaginationWrapper = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing.xs,
  alignSelf: "stretch",
}));

const forwardNonTransientProp = (prop) => !prop.startsWith("$");

const chevronStyle = ({ theme, $disabled }) => ({
  width: "22px",
  height: "22px",
  cursor: $disabled ? "default" : "pointer",
  pointerEvents: $disabled ? "none" : "auto",
  color: $disabled ? theme.colors.secondText : theme.colors.textMain,
  padding: theme.spacing["2xs"],
  transition: "transform 0.15s ease",

  // 마우스 클릭 시엔 테두리(포커스 아웃라인) 없이, 키보드 탐색일 때만 보이게
  "&:focus": {
    outline: "none",
  },
  "&:focus-visible": {
    outline: `2px solid ${theme.colors.emphasis}`,
    outlineOffset: "2px",
  },
});

export const StyledChevronLeftIcon = styled(ChevronLeftIcon, {
  shouldForwardProp: forwardNonTransientProp,
})(chevronStyle, ({ $disabled }) => ({
  "&:hover": {
    transform: $disabled ? "none" : "translateX(-2px)",
  },
}));
export const StyledChevronRightIcon = styled(ChevronRightIcon, {
  shouldForwardProp: forwardNonTransientProp,
})(chevronStyle, ({ $disabled }) => ({
  "&:hover": {
    transform: $disabled ? "none" : "translateX(2px)",
  },
}));

export const Ellipsis = styled.span(({ theme }) => ({
  color: theme.colors.secondText,
}));

export const PageButton = styled.button(({ theme, $active }) => ({
  width: "28px",
  height: "28px",
  borderRadius: theme.radius.full,
  border: "none",
  cursor: "pointer",
  fontSize: theme.fontSize.sm,
  background: $active ? theme.colors.textMain : "transparent",
  color: $active ? "#fff" : theme.colors.textMain,
  transition: "background 0.15s ease, transform 0.15s ease",

  "&:hover": {
    background: $active ? theme.colors.textMain : theme.colors.subtle,
    transform: $active ? "none" : "translateY(-2px)",
  },
}));

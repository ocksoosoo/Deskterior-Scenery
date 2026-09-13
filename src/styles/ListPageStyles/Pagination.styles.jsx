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
  cursor: $disabled ? "default" : "pointer",
  pointerEvents: $disabled ? "none" : "auto",
  color: $disabled ? theme.colors.secondText : theme.colors.textMain,
  padding: theme.spacing["2xs"],
});

export const StyledChevronLeftIcon = styled(ChevronLeftIcon, {
  shouldForwardProp: forwardNonTransientProp,
})(chevronStyle);
export const StyledChevronRightIcon = styled(ChevronRightIcon, {
  shouldForwardProp: forwardNonTransientProp,
})(chevronStyle);

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
  transition: "background 0.15s ease",

  "&:hover": {
    background: $active ? theme.colors.textMain : theme.colors.subtle,
  },
}));

import styled from "@emotion/styled";

export const Form = styled.form(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: theme.spacing.xl,
}));

export const NameGroup = styled.div(({ theme }) => ({
  display: "flex",
  width: "100%",
  gap: theme.spacing.md,
}));

export const AllTerms = styled.div(({ theme }) => ({
  marginBottom: theme.spacing.md,
}));

export const Label = styled.label(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing["2xs"],
  color: theme.colors.textMain,
  fontSize: "clamp(13px, calc(11px + 0.625vw), 15px)",
  fontWeight: theme.fontWeight.medium,
  flex: 1,
}));

export const Input = styled.input(({ theme }) => ({
  width: "100%",
  padding: `${theme.spacing.xs} 0`,
  border: "none",
  borderBottom: `${theme.borderWidth.focus} solid ${theme.colors.subtle}`,
  outline: "none",
  backgroundColor: "transparent",
  transition: "border-color 0.2s ease",
  "&:focus": {
    borderBottomColor: theme.colors.textMain,
  },
  "&::placeholder": {
    color: theme.colors.secondText,
    fontSize: "clamp(13px, calc(11px + 0.625vw), 15px)",
  },

  "@media (min-width: 768px) and (width < 1024px)": {
    "&.id-input::placeholder": {
      fontSize: "clamp(9.5px, calc(2.352941vw - 9.070588px), 15px)",
    },
  },
  [theme.media.smallMobile]: {
    "&.id-input::placeholder": {
      fontSize: "clamp(7.5px, calc(4.0625vw - 5.5px), 14px)",
    },
  },
}));

export const InputIdGroup = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderBottom: `${theme.borderWidth.focus} solid ${theme.colors.subtle}`,
  transition: "border-color 0.2s ease",
  "& input": {
    flex: 1,
    minWidth: 0,
    width: "auto",
    borderBottom: "none",
  },
  "&:focus-within": {
    borderBottomColor: theme.colors.textMain,
  },
}));

export const IdCheckButton = styled.button(({ theme }) => ({
  flexShrink: 0,
  padding: "6px 14px",
  border: "none",
  borderRadius: theme.radius.full,
  backgroundColor: theme.colors.textMain,
  color: theme.colors.cards,
  fontSize: theme.fontSize.sm,
  fontWeight: theme.fontWeight.medium,
  lineHeight: 1,
  cursor: "pointer",
  willChange: "transform",

  "&:hover": {
    filter: "brightness(1.5)",
  },
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

export const PasswordGroup = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderBottom: `${theme.borderWidth.focus} solid ${theme.colors.subtle}`,
  "& input": {
    flex: 1,
    minWidth: 0,
    width: "auto",
    borderBottom: "none",
  },
  "&:focus-within": {
    borderBottomColor: theme.colors.textMain,
  },
}));

export const PasswordHidenButton = styled.button(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  padding: theme.spacing["2xs"],
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
}));

export const TermsGroup = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  fontSize: "clamp(13px, calc(11px + 0.625vw), 15px)",
  gap: theme.spacing.xs,
  color: theme.colors.secondText,
  textAlign: "left",
  "& p": {
    color: theme.colors.textMain,
    fontWeight: theme.fontWeight.semiBold,
    marginBottom: theme.spacing["2xs"],
  },
  "& label": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing.xs,
  },
}));

export const ItemCheckbox = styled.input(({ theme }) => ({
  flexShrink: 0,
  width: "20px",
  height: "20px",
  margin: 0,
  transform: "translateY(1px)",
  accentColor: theme.colors.emphasis,
  cursor: "pointer",
}));

const messageStyle = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  marginTop: "15px",
  gap: "12px",
  padding: "8px 10px",
  boxSizing: "border-box",
  borderRadius: "6px",
  fontSize: "clamp(12px, calc(10px + 0.625vw), 14px)",
  color: "#1F211F",
  textAlign: "left",
};

export const SuccessMessage = styled.div(({ theme }) => ({
  ...messageStyle,
  color: theme.colors.textMain,
  backgroundColor: "#d9f3df",
  textAlign: "left",
  "& svg": {
    color: "#18a83b",
    flexShrink: 0,
  },
}));

export const ErrorMessage = styled.div(({ theme }) => ({
  ...messageStyle,
  color: theme.colors.textMain,
  backgroundColor: "#f8d1bd",
  "@media (width < 409px)": {
    fontSize: "clamp(11px, calc(3.37vw - 1.79px), 12px)",
    padding: "8px",
    gap: "6px",
  },
}));

export const ErrorIcon = styled.span(({ theme }) => ({
  position: "relative",
  width: "20px",
  height: "20px",
  flexShrink: 0,
  border: `1.5px solid ${theme.colors.error}`,
  borderRadius: theme.radius.full,
  "&::before, &::after": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "52%",
    width: "9px",
    height: "1.5px",
    backgroundColor: theme.colors.error,
  },
  "&::before": {
    transform: "translate(-50%, -50%) rotate(45deg)",
  },
  "&::after": {
    transform: "translate(-50%, -50%) rotate(-45deg)",
  },

  "@media (width < 409px)": {
    width: "16px",
    height: "16px",
    borderWidth: "1.2px",

    "&::before, &::after": {
      width: "7px",
      height: "1.2px",
    },
  },
}));

export const Button = styled.button(({ theme }) => ({
  width: "100%",
  padding: theme.spacing.sm,
  marginTop: theme.spacing.md,
  border: "none",
  borderRadius: theme.radius.sm,
  backgroundColor: theme.colors.textMain,
  fontWeight: theme.fontWeight.medium,
  color: theme.colors.cards,
  cursor: "pointer",
  willChange: "transform",

  "&:hover": {
    filter: "brightness(1.5)",
  },
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

export const Message = styled.p(({ theme }) => ({
  marginTop: theme.spacing["2xs"],
  fontSize: "clamp(10px, calc(8px + 0.625vw), 12px)",
}));

export const Required = styled.span(({ theme }) => ({
  color: theme.colors.emphasis,
}));

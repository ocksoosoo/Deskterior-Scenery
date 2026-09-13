import styled from "@emotion/styled";

export const Form = styled.form({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "30px",
});

export const NameGroup = styled.div({
  display: "flex",
  width: "100%",
  gap: "20px",
});

export const AllTerms = styled.div({
  marginBottom: "15px",
});

export const Label = styled.label({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "5px",
  //fontSize: "15px",
  fontSize: "clamp(13px, calc(11px + 0.625vw), 15px)",
  color: "#000000",
  fontWeight: 600,
  flex: 1,
});

export const Input = styled.input({
  width: "100%",
  padding: "8px 0",
  border: "none",
  borderBottom: "2px solid #e6e6e6",
  outline: "none",
  backgroundColor: "transparent",
  "&:focus": {
    borderBottomColor: "#000000",
  },
  "&::placeholder": {
    color: "#b0b0b0",
    fontSize: "clamp(13px, calc(11px + 0.625vw), 15px)",
  },

  "@media (min-width: 768px) and (width < 1024px)": {
    "&.id-input::placeholder": {
      fontSize: "clamp(10px, calc(2.352941vw - 9.070588px), 15px)",
    },
  },
  "@media (min-width: 320px) and (width < 480px)": {
    "&.id-input::placeholder": {
      fontSize: "clamp(10px, calc(2px + 2.5vw), 14px)",
    },
  },
});

export const InputIdGroup = styled.div({
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderBottom: "2px solid #e6e6e6",
  "& input": {
    flex: 1,
    minWidth: 0,
    width: "auto",
    borderBottom: "none",
  },

  "&:focus-within": {
    borderBottomColor: "#000000",
  },
});

export const IdCheckButton = styled.button({
  flexShrink: 0,
  padding: "6px 14px",
  border: "none",
  borderRadius: "20px",
  backgroundColor: "#000000",
  color: "#ffffff",
  fontSize: "12px",
  lineHeight: 1,
  cursor: "pointer",
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
});

export const PasswordGroup = styled.div({
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderBottom: "2px solid #e6e6e6",
  "& input": {
    flex: 1,
    minWidth: 0,
    width: "auto",
    borderBottom: "none",
  },
  "&:focus-within": {
    borderBottomColor: "#000",
  },
});

export const PasswordHidenButton = styled.button({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  padding: "6px",
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
});

export const TermsGroup = styled.div({
  display: "flex",
  flexDirection: "column",
  fontSize: "clamp(13px, calc(11px + 0.625vw), 15px)",
  gap: "10px",
  color: "#5f5e5e",
  textAlign: "left",
  "& p": {
    color: "#000000",
    fontWeight: 600,
    marginBottom: "5px",
  },
  "& label": {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
});

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
  color: "#000000",
  textAlign: "left",
};

export const SuccessMessage = styled.div({
  ...messageStyle,
  backgroundColor: "#d9f3df",
  textAlign: "left",
  "& svg": {
    color: "#18a83b",
    flexShrink: 0,
  },
});

export const ErrorMessage = styled.div({
  ...messageStyle,
  backgroundColor: "#f8d1bd",
});

export const ErrorIcon = styled.span({
  position: "relative",
  width: "20px",
  height: "20px",
  flexShrink: 0,
  border: "1.5px solid #e32626",
  borderRadius: "50%",
  "&::before, &::after": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "52%",
    width: "9px",
    height: "1.5px",
    backgroundColor: "#e32626",
  },
  "&::before": {
    transform: "translate(-50%, -50%) rotate(45deg)",
  },
  "&::after": {
    transform: "translate(-50%, -50%) rotate(-45deg)",
  },
});

export const Button = styled.button({
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#000000",
  color: "#fff",
  cursor: "pointer",
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
});

export const Message = styled.p({
  marginTop: "8px",
  fontSize: "clamp(10px, calc(8px + 0.625vw), 12px)",
});

export const Required = styled.span({
  color: "#ff6b35",
});

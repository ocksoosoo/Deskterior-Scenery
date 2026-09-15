import styled from "@emotion/styled";

export const MypageBox = styled.main({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  margin: "0 auto",
  padding: "60px clamp(16px, 6vw, 64px)",
  backgroundColor: "#f7f5ef",
});

export const MypageTitle = styled.h1({
  margin: "0 0 32px",
  fontSize: "40px",
  fontWeight: 700,
  lineHeight: 1.2,
});

export const CardBox = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "30px",
  width: "100%",
});

export const UserCard = styled.section({
  width: "100%",
  minHeight: "180px",
  padding: "30px",
  backgroundColor: "#fff",
  borderRadius: "8px",
});

export const UserHead = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  width: "100%",
  marginBottom: "10px",
});

export const UserName = styled.p({
  margin: 0,
  fontSize: "35px",
  fontWeight: 700,
  lineHeight: 1.4,
  letterSpacing: 10,
});

export const UserLogOut = styled.button({
  width: "120px",
  height: "50px",
  padding: "10px 18px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#222320",
  color: "#fff",
  fontSize: "16px",
  cursor: "pointer",
  transform: "translateY(60%)",
  cursor: "pointer",
  "&:hover": {
    filter: "brightness(1.5)",
  },
});

export const UserId = styled.p({
  marginTop: "45px",
  fontSize: "20px",
  color: "#777",
});

export const AccountCard = styled.section({
  width: "100%",
  minHeight: "380px",
  padding: "32px 28px",
  backgroundColor: "#fff",
  borderRadius: "8px",
});

export const AccountTitle = styled.h2({
  margin: "0 0 28px",
  paddingBottom: "16px",
  borderBottom: "3px solid #e5e5e5",
  fontSize: "28px",
  fontWeight: 700,
  lineHeight: 1.2,
});

export const AccountForm = styled.form({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const AccountGrid = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  columnGap: "36px",
  rowGap: "32px",
  width: "100%",
});

export const AccountField = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  minWidth: 0,
});

export const AddressField = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  gridColumn: "1 / -1",
});

export const ReadonlyText = styled.span({
  marginLeft: "4px",
  fontSize: "12px",
  fontWeight: 400,
  color: "#999",
});

export const AccountLabel = styled.label({
  fontSize: "14px",
  fontWeight: 600,
  color: "#222320",
});

export const Required = styled.span({
  color: "#ff6b35",
});

export const AccountInput = styled.input({
  width: "100%",
  padding: "0 0 10px",
  border: "none",
  borderBottom: "2px solid #ddd",
  outline: "none",
  backgroundColor: "transparent",
  fontSize: "14px",
  lineHeight: 1.4,
  color: "#555",

  "&:focus": {
    borderBottomColor: "#222320",
  },
  "&:placeholder": {
    color: "#d4d4d4",
  },
  "&[readonly]": {
    color: "#777",
    cursor: "default",
  },
});

export const SaveArea = styled.div({
  display: "flex",
  alignItems: "center",
  width: "100%",
  marginTop: "40px",
});

export const ErrorText = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "10px 14px",
  border: "1px solid #f0b49b",
  borderRadius: "5px",
  backgroundColor: "#f8d0bb",
  color: "#222",
  fontSize: "13px",
});

export const SaveButton = styled.button({
  marginLeft: "auto",
  padding: "14px 24px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#222320",
  color: "#fff",
  fontSize: "14px",
  cursor: "pointer",

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

export const SettingsCard = styled.section({
  width: "100%",
  minHeight: "240px",
  padding: "32px 28px",
  backgroundColor: "#fff",
  borderRadius: "8px",
});

export const SettingsTitle = styled.h2({
  margin: "0 0 30px",
  fontSize: "28px",
  fontWeight: 700,
  lineHeight: 1.2,
});

export const Settingstext = styled.p({
  margin: "0 0 30px",
  fontSize: "14px",
  lineHeight: 1.5,
  color: "#777",
});

export const SettingsBtnGroup = styled.div({
  display: "flex",
  alignItems: "center",
  gap: "16px",
});

export const SettingsDeleteBtn = styled.button({
  padding: "12px 18px",
  border: "1px solid #ef4d4d",
  borderRadius: "8px",
  backgroundColor: "#fff",
  color: "#ef4d4d",
  fontSize: "14px",
  cursor: "pointer",
});

export const SettingsChangeBtn = styled.button({
  padding: "12px 18px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#efede7",
  color: "#666",
  fontSize: "14px",
  cursor: "pointer",
});

export const PasswordFormBox = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "100%",
  padding: "0 32px",
  marginTop: "32px",
  marginBottom: "36px",
  boxSizing: "border-box",
});

export const PasswordField = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "100%",
});

export const PasswordLabel = styled.label({
  fontSize: "16px",
  fontWeight: 500,
  color: "#222",
});

export const CurrentPasswordGroup = styled.div({
  position: "relative",
  width: "100%",
});

export const NewPasswordGroup = styled.div({
  position: "relative",
  width: "100%",
});

export const PasswordInput = styled.input({
  width: "100%",
  height: "54px",
  padding: "0 48px 0 16px",
  boxSizing: "border-box",
  border: "1px solid #e4e1db",
  borderRadius: "5px",
  outline: "none",
  backgroundColor: "#fff",
  fontSize: "14px",
  color: "#222",

  "&::placeholder": {
    color: "#888",
  },

  "&:focus": {
    borderColor: "#999",
  },
});

export const CurrentPasswordHidenButton = styled.button({
  position: "absolute",
  top: "50%",
  right: "14px",
  transform: "translateY(-50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  border: "none",
  backgroundColor: "transparent",
  color: "#777",
  cursor: "pointer",
});

export const NewPasswordHidenButton = styled.button({
  position: "absolute",
  top: "50%",
  right: "14px",
  transform: "translateY(-50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  border: "none",
  backgroundColor: "transparent",
  color: "#777",
  cursor: "pointer",
});

export const PasswordError = styled.p({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginTop: "12px",
  width: "100%",
  padding: "10px 12px",
  boxSizing: "border-box",
  border: "1px solid #f0b49b",
  borderRadius: "5px",
  backgroundColor: "#f8d0bb",
  color: "#222",
  fontSize: "13px",
});

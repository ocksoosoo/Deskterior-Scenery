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
  "&[readonly]": {
    color: "#777",
    cursor: "default",
  },
});

export const SaveButton = styled.button({
  alignSelf: "flex-end",
  marginTop: "40px",
  padding: "12px 22px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#222320",
  color: "#fff",
  fontSize: "14px",
  cursor: "pointer",
});

export const WishlistCard = styled.section({
  width: "100%",
  minHeight: "380px",
  padding: "32px 28px",
  backgroundColor: "#fff",
  borderRadius: "8px",
});

export const WishlistTitle = styled.h3({
  margin: "0 0 28px",
  paddingBottom: "16px",
  borderBottom: "3px solid #e5e5e5",
  fontSize: "28px",
  fontWeight: 700,
  lineHeight: 1.2,
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

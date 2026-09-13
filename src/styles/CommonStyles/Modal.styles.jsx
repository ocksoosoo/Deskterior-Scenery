import styled from "@emotion/styled";

// 어두운 배경
export const ModalOverlay = styled.div({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(31, 33, 31, 0.5)",
  zIndex: 100,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

// 모달
export const ModalBox = styled.div(({ theme }) => ({
  backgroundColor: theme.colors.cards,
  padding: `${theme.spacing.lg} 0`,
  borderRadius: theme.radius.lg,
  width: "420px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

// 아이콘
export const IconWrapper = styled.div(({ theme }) => ({
  marginBottom: theme.spacing.xs,
  display: "flex",
  justifyContent: "center",
}));

// 제목
export const ModalTitle = styled.h3(({ theme }) => ({
  margin: "0 0 20px 0",
  color: theme.colors.textMain,
  fontSize: theme.fontSize.xl,
  fontWeight: theme.fontWeight.semiBold,
}));

// 설명
export const ModalDescription = styled.p(({ theme }) => ({
  margin: "0 0 20px 0",
  color: theme.colors.secondText,
  fontSize: theme.fontSize.sm,
}));

// 버튼
export const ButtonGroup = styled.div(({ theme }) => ({
  display: "flex",
  gap: theme.spacing.lg,
  justifyContent: "center",
}));

// 취소 버튼
export const CancelButton = styled.button(({ theme }) => ({
  minWidth: "78px",
  padding: `${theme.spacing.sm} ${theme.spacing.md}`,
  border: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
  borderRadius: theme.radius.md,
  color: theme.colors.textMain,
  backgroundColor: theme.colors.cards,
  fontSize: theme.fontSize.sm,
  fontWeight: theme.fontWeight.medium,
}));

// 확인 버튼
export const ConfirmButton = styled.button(({ theme }) => ({
  minWidth: "78px",
  padding: `${theme.spacing.sm} ${theme.spacing.md}`,
  backgroundColor: theme.colors.textMain,
  color: theme.colors.cards,
  borderRadius: theme.radius.md,
  border: "none",
  fontSize: theme.fontSize.sm,
  fontWeight: theme.fontWeight.medium,
}));

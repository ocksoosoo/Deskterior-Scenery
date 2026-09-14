import styled from "@emotion/styled";

// 어두운 배경
export const ModalOverlay = styled.div({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(31, 33, 31, 0.5)",
  // 모바일 햄버거 메뉴 오버레이(zIndex 100)와 같은 값이면 DOM 삽입 순서에 따라
  // 드로어가 열려있는 동안 뜬 모달의 클릭이 씹힐 수 있어, 앱의 다른 오버레이보다
  // 항상 위에 오도록 확실히 높은 값을 준다
  zIndex: 200,
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
  whiteSpace: "pre-line",
  textAlign: "center",
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

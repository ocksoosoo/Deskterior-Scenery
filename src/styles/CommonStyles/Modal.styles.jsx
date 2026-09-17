import styled from "@emotion/styled";
import { motion } from "motion/react";

// 어두운 배경
export const ModalOverlay = styled(motion.div)({
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
export const ModalBox = styled(motion.div)(({ theme }) => ({
  backgroundColor: theme.colors.cards,
  padding: `${theme.spacing.lg} 0`,
  borderRadius: theme.radius.lg,
  // 420px 고정폭이면 그보다 좁은 화면(320px 등)에서 좌우 여백 없이 넘쳐버려서,
  // 뷰포트 폭의 90%를 쓰되 420px보다 커지지는 않게 함 (좁은 화면에서 자동으로
  // 양쪽 여백이 생기고, 420px 이상인 화면에서는 그대로 420px 고정폭처럼 동작)
  width: "90%",
  maxWidth: "420px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  // 와이드 화면에서 상대적으로 작아 보여서 전체적으로 살짝 키움
  [theme.media.wide]: {
    maxWidth: "480px",
    padding: `${theme.spacing.xl} 0`,
  },
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

  [theme.media.wide]: {
    fontSize: theme.fontSize["2xl"],
  },
}));

// 설명
export const ModalDescription = styled.p(({ theme }) => ({
  margin: "0 0 20px 0",
  color: theme.colors.secondText,
  fontSize: theme.fontSize.sm,
  whiteSpace: "pre-line",
  textAlign: "center",

  [theme.media.wide]: {
    fontSize: theme.fontSize.md,
  },
  [theme.media.smallMobile]: {
    fontSize: "13px",
    wordBreak: "keep-all",
    letterSpacing: "-0.5px",
  },
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

  [theme.media.wide]: {
    minWidth: "96px",
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    fontSize: theme.fontSize.md,
  },
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

  [theme.media.wide]: {
    minWidth: "96px",
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    fontSize: theme.fontSize.md,
  },
  "&:hover": {
    filter: "brightness(1.5)",
  },
}));

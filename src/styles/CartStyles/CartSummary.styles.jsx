import styled from "@emotion/styled";

// 소계 and 버튼 컨테이너
export const SummaryContainer = styled.div(({ theme }) => ({
  marginTop: `clamp(${theme.spacing.lg}, calc(10.667px + 2.778vw), ${theme.spacing.xl})`,
  marginBottom: theme.spacing["3xl"],
  [theme.media.mobile]: {
    marginBottom: 0,
  },
}));

// 토탈 박스
export const SummaryInfoBox = styled.div(({ theme }) => ({
  backgroundColor: theme.colors.cards,
  padding: theme.spacing.md,
  borderRadius: theme.radius.md,
}));

// 행
export const SummaryRow = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

// 소계
export const SubtotalRow = styled(SummaryRow)(({ theme }) => ({
  marginBottom: theme.spacing.xs,
}));

// 배송비
export const DeliveryRow = styled(SummaryRow)(({ theme }) => ({
  marginBottom: theme.spacing.xs,
  [theme.media.tablet]: {
    position: "relative",
    marginBottom: "72px",
  },
  [theme.media.mobile]: {
    position: "relative",
    marginBottom: "72px",
  },
  "@media (max-width: 327px)": {
    marginBottom: "96px",
  },
}));

// 총합
export const TotalRow = styled(SummaryRow)({});

// 소계, 배송비 text
export const LabelText = styled.span(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  fontSize: theme.fontSize.md,
  color: theme.colors.secondText,
  fontWeight: theme.fontWeight.regular,
}));

// 툴팁
export const IconWrapper = styled.div(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  marginLeft: "5px",
  paddingTop: "2px",
  paddingRight: "4px",
  cursor: "pointer",
  [theme.media.wide]: {
    "&:hover > div": {
      display: "block",
    },
  },
  [theme.media.pc]: {
    "&:hover > div": {
      display: "block",
    },
  },
  [theme.media.tablet]: {
    position: "static",
  },
  [theme.media.mobile]: {
    position: "static",
  },
}));

// 툴팁 박스
export const TooltipBox = styled.div(({ theme }) => ({
  display: "none",
  position: "absolute",
  left: "20px", //오른쪽
  backgroundColor: theme.colors.subtle,
  padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
  borderRadius: theme.radius.sm,
  fontSize: theme.fontSize.xs,
  fontWeight: theme.fontWeight.regular,
  color: theme.colors.secondText,
  whiteSpace: "nowrap",
  zIndex: 9,
  [theme.media.tablet]: {
    display: "block",
    top: theme.spacing.xl,
    left: 0,
    width: "100%",
    whiteSpace: "normal",
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.background,
  },
  [theme.media.mobile]: {
    display: "block",
    top: theme.spacing.xl,
    left: 0,
    width: "100%",
    whiteSpace: "normal",
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.background,
  },
}));

// 소계 배송비 가격
export const PriceText = styled.span(({ theme }) => ({
  fontSize: theme.fontSize.md,
  color: theme.colors.secondText,
  fontWeight: theme.fontWeight.regular,
}));

// 총합 text
export const TotalLabel = styled.strong(({ theme }) => ({
  fontSize: theme.fontSize.xl,
  color: theme.colors.textMain,
  fontWeight: theme.fontWeight.semiBold,
}));

// 총합 가격
export const TotalPriceText = styled.strong(({ theme }) => ({
  fontSize: theme.fontSize.xl,
  color: theme.colors.textMain,
  fontWeight: theme.fontWeight.semiBold,
}));

// 결제 버튼
export const CheckoutButton = styled.button(({ theme }) => ({
  width: "100%",
  height: "48px",
  marginTop: `clamp(${theme.spacing.lg}, calc(10.667px + 2.778vw), ${theme.spacing.xl})`,
  padding: `${theme.spacing.sm} 0`,
  backgroundColor: theme.colors.textMain,
  color: theme.colors.cards,
  fontSize: theme.fontSize.lg,
  fontWeight: theme.fontWeight.medium,
  border: "none",
  borderRadius: theme.radius.md,
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  //Sold out
  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  "&:hover": {
    filter: "brightness(1.5)",
  },
}));

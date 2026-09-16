import styled from "@emotion/styled";

// 한 줄
export const ItemWrapper = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing.lg,
  padding: `${theme.spacing.lg} 0`,
  borderBottom: `1px solid ${theme.colors.subtle}`,
  "&:last-of-type": {
    borderBottom: "none",
  },
  [theme.media.tablet]: {
    gap: theme.spacing.md,
  },
  [theme.media.mobile]: {
    position: "relative",
    padding: "16px 0",
    gap: "12px",
    alignItems: "stretch",
    height: "clamp(177px, calc(145.33px + 6.6vw), 196px)",
  },
}));

// 체크박스
export const ItemCheckbox = styled.input(({ theme }) => ({
  width: "20px",
  height: "20px",
  flexShrink: 0,
  accentColor: theme.colors.emphasis,
  cursor: "pointer",
  // 비활성화
  "&:disabled": {
    cursor: "not-allowed",
    opacity: 0.35,
  },
}));

// 좌
export const ItemLeft = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing.lg,
  [theme.media.tablet]: {
    gap: theme.spacing.md,
    flex: 1,
  },
  [theme.media.mobile]: {
    gap: "12px",
    flex: 1,
    minWidth: 0,
  },
}));

// 이미지
export const ImageBox = styled.div(({ theme }) => ({
  position: "relative",
  width: "clamp(80px, calc(-6.67px + 18.06vw), 132px)",
  height: "clamp(80px, calc(-6.67px + 18.06vw), 132px)",
  flexShrink: 0,
  transition: "width 0.25s ease, height 0.25s ease",
  borderRadius: theme.radius.md,
  overflow: "hidden",
  "&:hover img": {
    transform: "scale(1.06)",
  },
}));

export const ImageLoading = styled.div({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "14px",
  color: "#666",
});

// 이미지 태그 스타일
export const ItemImage = styled.img(({ theme, $isLoaded }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  opacity: $isLoaded ? 1 : 0,
  transition: "opacity 0.2s ease, transform 0.3s ease",
}));

// 뱃지 묶음 (Sold out / Best / New 가로 배치)
export const BadgeGroup = styled.div(({ theme }) => ({
  position: "absolute",
  top: theme.spacing.xs,
  left: theme.spacing.xs,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing["2xs"],
  zIndex: 10,
  [theme.media.mobile]: {
    flexDirection: "column",
    alignItems: "flex-start",
    transform: "scale(0.75)",
    transformOrigin: "top left",
    gap: "4px",
  },
}));

// 솔드아웃 이미지 블러
export const ImageOverlay = styled.div(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: theme.colors.textMain,
  opacity: 0.35,
}));

// 인포
export const InfoBox = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "310px",
  gap: theme.spacing.xs,
  [theme.media.tablet]: {
    width: "100%",
    minWidth: "167px",
  },
  [theme.media.mobile]: {
    width: "100%",
    minWidth: 0,
    gap: "8px",
  },
}));

// 상품명
export const ItemName = styled.h4(({ theme }) => ({
  margin: 0,
  width: "100%",
  textAlign: "left",
  wordBreak: "keep-all",
  overflowWrap: "anywhere",
  fontSize: theme.fontSize.xl,
  fontWeight: theme.fontWeight.semiBold,
  color: theme.colors.textMain,
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
  [theme.media.tablet]: {
    fontSize: `clamp(${theme.fontSize.lg}, 2vw, ${theme.fontSize.xl})`,
  },
  [theme.media.mobile]: {
    width: "clamp(100px, calc(-11.67px + 23.26vw), 167px)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: `clamp(${theme.fontSize.md}, 2.5vw, ${theme.fontSize.lg})`,
  },
}));

// 원가
export const ItemPrice = styled.p(({ theme }) => ({
  margin: 0,
  fontSize: theme.fontSize.md,
  fontWeight: theme.fontWeight.regular,
  color: theme.colors.textMain,
  [theme.media.tablet]: {
    fontSize: theme.fontSize.sm,
  },
  [theme.media.mobile]: {
    whiteSpace: "nowrap",
  },
}));

// 우
export const ItemRight = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  flex: 1,
  gap: theme.spacing.lg,
  marginTop: "4px", // 정렬 1
  [theme.media.tablet]: {
    gap: theme.spacing.md,
    flex: "none",
  },
  [theme.media.mobile]: {
    flex: "none",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    gap: 0,
    marginTop: 0,
  },
}));

// 수량
export const QuantityBox = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "130px",
  [theme.media.mobile]: {
    width: "clamp(92px, calc(28.69px + 13.19vw), 130px)",
    flexShrink: 0,
    position: "absolute",
    left: "calc(44px + clamp(80px, calc(-6.67px + 18.06vw), 132px))",
    top: "75px",
  },
}));

// 수량 버튼
export const QuantityButton = styled.button(({ theme }) => ({
  width: "35px",
  height: "35px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 0 3.5px 0", // 1024이상 고정 반응형 바꾸어야함
  cursor: "pointer",
  backgroundColor: theme.colors.cards,
  border: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
  borderRadius: theme.radius.full,
  color: theme.colors.textMain,
  fontSize: theme.fontSize.md,
  fontWeight: theme.fontWeight.regular,
  lineHeight: "normal",
  // 비활성
  "&:disabled": {
    color: theme.colors.subtle,
    cursor: "not-allowed",
  },
  [theme.media.mobile]: {
    width: "clamp(24px, calc(5.67px + 3.82vw), 35px)",
    height: "clamp(24px, calc(5.67px + 3.82vw), 35px)",
  },
}));

// 수량 텍스트
export const QuantityText = styled.span(({ theme }) => ({
  fontSize: `clamp(18px, calc(12px + 0.78vw), 20px)`,
  fontWeight: theme.fontWeight.semiBold,
  width: "28px",
  flexShrink: 0,
  textAlign: "center", //숫자 두 자리여도 자리 고정
  color: theme.colors.textMain,
}));

// 총합
export const TotalPrice = styled.div(({ theme }) => ({
  width: "120px",
  textAlign: "right",
  paddingTop: "4px", // 정렬 1
}));

// 총합 텍스트
export const TotalPriceText = styled.strong(({ theme }) => ({
  fontSize: theme.fontSize.xl,
  fontWeight: theme.fontWeight.semiBold,
  color: theme.colors.textMain,
  [theme.media.tablet]: {
    fontSize: `clamp(${theme.fontSize.lg}, 2vw, ${theme.fontSize.xl})`,
  },
  [theme.media.mobile]: {
    fontSize: `clamp(${theme.fontSize.md}, 2.5vw, ${theme.fontSize.lg})`,
  },
}));

// 삭제 버튼
export const DeleteButton = styled.button(({ theme }) => ({
  background: "none",
  border: "none",
  cursor: "pointer",
  paddingTop: "6px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.colors.secondText,
  marginLeft: "auto",
  [theme.media.mobile]: {
    position: "absolute", // 우측 상단으로 띄우기
    top: "16px",
    right: "0",
    paddingTop: 0,
    marginLeft: 0,
  },
}));

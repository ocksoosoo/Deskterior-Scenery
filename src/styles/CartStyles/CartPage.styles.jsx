import styled from "@emotion/styled";

// 메인박스
export const CartContainer = styled.div(({ theme }) => ({
  width: "100%",
  maxWidth: "896px",
  margin: "0 auto",
  padding: `${theme.spacing["3xl"]} 0`,
  display: "flex",
  flexDirection: "column",
  [theme.media.tablet]: {
    padding: `${theme.spacing["2xl"]} ${theme.spacing.xl}`,
  },
  [theme.media.mobile]: {
    padding: `${theme.spacing["2xl"]} ${theme.spacing.md}`,
  },
}));

// 타이틀
export const TitleWrapper = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  paddingBottom: "36px",
  borderBottom: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
  marginBottom: theme.spacing.xl,
}));

// 경로 박스
export const Course = styled.span(({ theme }) => ({
  fontSize: theme.fontSize.md,
  fontWeight: theme.fontWeight.regular,
  color: theme.colors.secondText,
  marginBottom: theme.spacing.xs,
  [theme.media.mobile]: {
    fontSize: theme.fontSize.xs,
  },
}));

// 경로 태그 - 클릭 가능한 링크임을 알 수 있게 기본 상태에서도 밑줄 표시
export const BreadcrumbLink = styled.a({
  cursor: "pointer",
  color: "inherit",
  textDecoration: "underline",
});

// Cart
export const PageTitle = styled.h2(({ theme }) => ({
  fontFamily: theme.fontFamily.display,
  fontSize: theme.fontSize.dpMd,
  fontWeight: theme.fontWeight.regular,
  color: theme.colors.textMain,
  margin: 0,
  textAlign: "left",
  width: "100%",
}));

// 전체바
export const ActionBar = styled.div(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: `clamp(${theme.spacing.lg}, calc(10.667px + 2.778vw), ${theme.spacing.xl})`,
  paddingLeft: theme.spacing.md,
}));

// 전체
export const SelectAllLabel = styled.label(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.xs,
  fontSize: theme.fontSize.lg,
  fontWeight: theme.fontWeight.medium,
  color: theme.colors.blue,
  cursor: "pointer",
  [theme.media.tablet]: {
    fontSize: `clamp(${theme.fontSize.md}, 2.5vw, ${theme.fontSize.lg})`,
  },
  [theme.media.mobile]: {
    fontSize: `clamp(${theme.fontSize.sm}, calc(10.67px + 0.69vw), ${theme.fontSize.md})`,
  },
}));

// 왼쪽 버튼 두개
export const LeftActionGroup = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  [theme.media.mobile]: {
    display: "contents",
  },
}));

// 전체 선택 체크박스
export const SelectAllCheckbox = styled.input(({ theme }) => ({
  width: "18px",
  height: "18px",
  accentColor: theme.colors.emphasis,
  cursor: "pointer",
}));

// 선택 삭제
export const SelectedDeleteButton = styled.button(({ theme }) => ({
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 0,
  fontSize: theme.fontSize.lg,
  fontWeight: theme.fontWeight.medium,
  color: theme.colors.secondText,
  [theme.media.tablet]: {
    fontSize: `clamp(${theme.fontSize.md}, 2.5vw, ${theme.fontSize.lg})`,
  },
  [theme.media.mobile]: {
    fontSize: `clamp(${theme.fontSize.sm}, calc(10.67px + 0.69vw), ${theme.fontSize.md})`,
  },
}));

// 전체 삭제
export const ClearAllButton = styled.button(({ theme }) => ({
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 0,
  fontSize: theme.fontSize.lg,
  fontWeight: theme.fontWeight.medium,
  color: theme.colors.error,
  [theme.media.tablet]: {
    fontSize: `clamp(${theme.fontSize.md}, 2.5vw, ${theme.fontSize.lg})`,
  },
  [theme.media.mobile]: {
    fontSize: `clamp(${theme.fontSize.sm}, calc(10.67px + 0.69vw), ${theme.fontSize.md})`,
  },
}));

// 박스 안 박스
export const ItemListSection = styled.section(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: `0 ${theme.spacing.md}`,
  backgroundColor: theme.colors.cards,
  borderRadius: theme.radius.md,
  overflow: "hidden",
}));

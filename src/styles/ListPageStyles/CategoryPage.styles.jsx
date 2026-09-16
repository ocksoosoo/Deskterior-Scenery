import styled from "@emotion/styled";
import { Link } from "react-router";
import { NoResultIcon } from "../../components/icons/Icons";

const headingStyle = (theme) => ({
  fontFamily: theme.fontFamily.display,
  fontWeight: 700,
});

// PC~와이드 구간에서 부드럽게 줄어들도록 보간
const fluidContentMaxWidth =
  "clamp(1024px, calc(1245.54px - 15.385vw), 1088px)";

export const Main = styled.main(({ theme }) => ({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  fontFamily: theme.fontFamily.base,
}));

export const Header = styled.div(({ theme }) => ({
  display: "flex",
  width: "100%",
  maxWidth: fluidContentMaxWidth,
  height: "233px",
  margin: "0 auto",
  padding: `${theme.spacing["2xl"]} ${theme.spacing["3xl"]} 48px ${theme.spacing["3xl"]}`,
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
  borderBottom: `1px solid ${theme.colors.subtle}`,
  background: theme.colors.background,

  [theme.media.tablet]: {
    maxWidth: "100%",
    height: "auto",
    padding: `${theme.spacing["2xl"]} ${theme.spacing.xl}`,
    alignItems: "flex-start",
    gap: theme.spacing.sm,
    borderBottom: "none",
  },

  [theme.media.mobile]: {
    maxWidth: "100%",
    height: "auto",
    padding: `${theme.spacing["2xl"]} ${theme.spacing.md}`,
    alignItems: "flex-start",
    gap: theme.spacing.sm,
    borderBottom: "none",
  },
}));

export const Breadcrumb = styled.nav({
  display: "flex",
  justifyContent: "center",
});

export const Trail = styled.ol(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  fontFamily: theme.fontFamily.base,
  fontSize: theme.fontSize.md,
  fontWeight: theme.fontWeight.regular,
  lineHeight: "normal",
  letterSpacing: "-0.12px",
  color: theme.colors.secondText,

  [theme.media.mobile]: {
    letterSpacing: "normal",
  },
}));

export const Crumb = styled.li(({ theme }) => ({
  "&:not(:first-of-type)::before": {
    content: '">"',
    margin: `0 ${theme.spacing["2xs"]}`,
  },
}));

export const CrumbLink = styled(Link)({
  "&:hover": { textDecoration: "underline" },
});

export const PageTitle = styled.h2(({ theme }) => ({
  ...headingStyle(theme),
  fontSize: theme.fontSize.dpMd,
  fontWeight: theme.fontWeight.regular,
  lineHeight: "normal",
  letterSpacing: "-1px",
  color: "#000",
  textAlign: "center",
  margin: 0,

  [theme.media.mobile]: {
    // 데스크탑(48px)로 뚝 끊기지 않게 34~44px 구간 보간
    fontSize: "clamp(34px, 2.2vw + 27px, 44px)",
    fontWeight: theme.fontWeight.regular,
    letterSpacing: "normal",
    lineHeight: "normal",
    color: theme.colors.textMain,
  },
}));

export const PageSubtitle = styled.p(({ theme }) => ({
  fontFamily: theme.fontFamily.base,
  fontSize: theme.fontSize.md,
  fontWeight: theme.fontWeight.regular,
  lineHeight: "normal",
  letterSpacing: "-0.14px",
  color: "#000",
  textAlign: "center",
  margin: 0,

  [theme.media.mobile]: {
    letterSpacing: "normal",
    color: theme.colors.textMain,
  },
}));

export const Content = styled.div(({ theme }) => ({
  display: "flex",
  width: "100%",
  maxWidth: fluidContentMaxWidth,
  margin: "0 auto",
  padding: `${theme.spacing["2xl"]} ${theme.spacing["3xl"]} ${theme.spacing["3xl"]} ${theme.spacing["3xl"]}`,
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing.xl,
  alignSelf: "stretch",

  [theme.media.tablet]: {
    maxWidth: "100%",
    padding: `${theme.spacing["2xl"]} ${theme.spacing.xl}`,
    gap: theme.spacing.lg,
  },

  [theme.media.mobile]: {
    maxWidth: "100%",
    alignItems: "flex-start",
    padding: `${theme.spacing.xl} ${theme.spacing.md} ${theme.spacing["2xl"]} ${theme.spacing.md}`,
    gap: theme.spacing.lg,
    borderTop: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
    background: theme.colors.background,
  },
}));

export const EmptyState = styled.div(({ theme }) => ({
  display: "flex",
  width: "100%",
  // 상품 2행 그리드와 높이 동일 (카드 높이 * 2 + 행 간격, 실측값)
  minHeight: "848px",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: `${theme.spacing["4xl"]} 0`,
  background: theme.colors.cards,
  border: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
  borderRadius: theme.radius.md,
}));

export const StyledNoResultIcon = styled(NoResultIcon)(({ theme }) => ({
  color: theme.colors.imagePlaceholder,
}));

export const EmptyTitle = styled.p(({ theme }) => ({
  marginTop: theme.spacing.lg,
  fontSize: theme.fontSize.lg,
  fontWeight: theme.fontWeight.semiBold,
  color: theme.colors.textMain,
}));

export const EmptySubtitle = styled.p(({ theme }) => ({
  marginTop: theme.spacing.xs,
  fontSize: theme.fontSize.sm,
  color: theme.colors.secondText,
}));

export const ProductGrid = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "896px",
  justifyContent: "center",
  alignItems: "flex-start",
  alignSelf: "center",
  gap: theme.spacing["2xl"],

  [theme.media.tablet]: {
    maxWidth: "100%",
    gap: theme.spacing.lg,
  },

  [theme.media.mobile]: {
    maxWidth: "100%",
    // 상품 행(Row) 사이 간격은 32px(xl) - Content 자체의 gap(lg)과는 다른 값
    gap: theme.spacing.xl,
  },
}));

export const Row = styled.div(({ theme }) => ({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing.md,

  [theme.media.tablet]: {
    alignItems: "flex-start",
    gap: theme.spacing.md,

    "&& > *": {
      flex: "1 0 0",
      minWidth: 0,
      gap: theme.spacing.xs,
    },

    "&& > * > div:nth-of-type(2)": {
      padding: `0 ${theme.spacing.sm}`,
      gap: theme.spacing["2xs"],
    },

    // 찜/장바구니 버튼 크기만 축소 - 위치는 기존 IconStack이 이미지 우하단에 붙이는 방식 그대로 유지
    "&& button[aria-label='찜하기'], && button[aria-label='장바구니 담기']": {
      width: "30px",
      height: "30px",
      borderRadius: "15px",
    },
  },

  // 모바일은 한 행에 2개(태블릿의 3개짜리 유연한 행과 같은 방식, 개수만 다름)
  [theme.media.mobile]: {
    alignItems: "flex-start",
    // 카드 2개 + 간격이 콘텐츠 폭에 맞도록 태블릿보다 좁은 xs 간격 사용
    gap: theme.spacing.xs,

    "&& > *": {
      flex: "1 0 0",
      minWidth: 0,
      gap: theme.spacing.xs,
    },

    "&& > * > div:nth-of-type(2)": {
      padding: `0 ${theme.spacing.sm}`,
      gap: theme.spacing["2xs"],
    },

    "&& button[aria-label='찜하기'], && button[aria-label='장바구니 담기']": {
      width: "34px",
      height: "34px",
      borderRadius: theme.radius.full,
    },
  },
}));

export const GridPlaceholder = styled.div({
  visibility: "hidden",
});

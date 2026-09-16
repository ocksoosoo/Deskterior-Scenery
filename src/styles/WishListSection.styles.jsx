import styled from "@emotion/styled";
import { Link } from "react-router";

export const WishlistContainer = styled.div(({ theme }) => ({
  width: "100%",
  padding: theme.spacing.xl,
  backgroundColor: theme.colors.cards,
  borderRadius: theme.radius.md,
  boxSizing: "border-box",

  [theme.media.mobile]: {
    padding: theme.spacing.md,
  },
}));

export const WishlistTitle = styled.h2(({ theme }) => ({
    fontFamily: theme.fontFamily.display,
    fontSize: theme.fontSize["4xl"], // 32
    fontWeight: theme.fontWeight.regular,
    color: theme.colors.textMain,
    margin: 0,
    lineHeight: 1.2,

    [theme.media.mobile]: {
        fontSize: theme.fontSize["3xl"],
    },
}));

export const WishlistHeader = styled.div(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: theme.spacing.md, // 16
    marginBottom: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    borderBottom: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,

    [theme.media.mobile]: {
        marginBottom: theme.spacing.lg,
        paddingBottom: theme.spacing.sm,
    }
}));

// export const TitleWrapper = styled.div(({ theme }) => ({
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "flex-start",
//   paddingBottom: "36px",
//   borderBottom: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
//   marginBottom: theme.spacing.xl,
// }));


export const DeleteAllButton = styled.button(({ theme }) => ({
    backgroundColor: "none",
    border: "none",
    color: theme.colors.error,
    fontSize: theme.fontSize.lg, // 16
    fontWeight: theme.fontWeight.medium,
    cursor: "pointer",
    padding: 0,

    "&:hover": {
        textDecoration: "underline",
    }
}));

export const WishlistContent = styled.div({
    width: "100%",
    position: "relative",
    minHeight: "260px",
});

// 카드들을 묶는 컨테이너
export const WishlistList = styled.div(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing.md,

    [theme.media.mobile]: {
        gap: theme.spacing.xs,
    }
}));

// 카드들을 감싸는 3열 Wrapper
export const WishlistItem = styled.div(({ theme }) => ({
    // 전체 폭 - (간격 16px * 2)를 3으로 나눔
    flex: `0 0 calc((100% - ${theme.spacing.md} * 2) / 3)`,
    maxWidth: `calc((100% - ${theme.spacing.md} * 2) / 3)`,
    boxSizing: "border-box",
    display: "flex",

    // ProductCard의 Card 자체가 고정 width: 280px를 갖고 있어 동일 우선순위의
    // 일반 자손 선택자로는 덮어쓰기가 불안정하므로, !important로 이 래퍼 폭에
    // 맞춰 늘어나도록 강제한다
    "& > *": {
    width: "100% !important",
    maxWidth: "100% !important",
    minWidth: 0,
  },

  [theme.media.mobile]: {
    flex: `0 0 calc((100% - ${theme.spacing.xs}) / 2)`,
    maxWidth: `calc((100% - ${theme.spacing.xs}) / 2)`,  }
}));

// 하단 '+' 더보기 버튼 영역
export const MoreButtonWrapper = styled.div(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: theme.spacing.xl,
}));

export const MoreButton = styled.button(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "44px",
    height: "44px",
    padding: 0,
    border: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
    borderRadius: theme.radius.full,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
    backgroundColor: theme.colors.cards,
    color: theme.colors.textMain,
    fontSize: theme.fontSize["2xl"],
    cursor: "pointer",

    "&:hover": {
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.12)",
    },
}));

// empty state
export const EmptyState = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  minHeight: "400px",
  padding: `${theme.spacing["3xl"]} ${theme.spacing.md}`,
  textAlign: "center",

  [theme.media.mobile]: {
    minHeight: "300px",
    padding: `${theme.spacing["2xl"]} ${theme.spacing.xs}`,
  },
}));

export const EmptyIconWrapper = styled.div(({theme}) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.xl, // 24
    color: theme.colors.imagePlaceholder,
}));

export const EmptyText = styled.p(({theme}) => ({
    fontSize: theme.fontSize.lg, // 18
    fontWeight: theme.fontWeight.regular,
    color: theme.colors.secondText,
    margin: 0,
}));

export const ExploreButton = styled(Link)(({theme}) => ({
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: theme.spacing.md,
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`, // 12 24
    backgroundColor: theme.colors.textMain,
    color: theme.colors.cards,
    borderRadius: theme.radius.md,
    fontWeight: theme.fontWeight.medium,
    fontSize: theme.fontSize.lg,
    textDecoration: "none",
    cursor: "pointer",

    "&:hover": {
        filter: "brightness(1.5)",
    },

    [theme.media.mobile]: {
    fontSize: theme.fontSize.md,
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    },
}));
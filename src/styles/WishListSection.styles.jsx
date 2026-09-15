import styled from "@emotion/styled";
import { Link } from "react-router";

export const WishlistContainer = styled.section(({ theme }) => ({
    width: "100%",
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.cards,
    borderRadius: theme.radius.md,

    [theme.media.mobile]: {
        padding: theme.spacing.md,
    }
}));

export const WishlistTitle = styled.h2(({ theme }) => ({
    fontFamily: theme.fontFamily.display,
    fontSize: theme.fontSize["4xl"], // 32
    color: theme.colors.textMain,

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
        marginBottom: theme.spacing.md,
    }
}));

export const DeleteAllButton = styled.button(({ theme }) => ({
    backgroundColor: "transparent",
    color: theme.colors.error,
    fontSize: theme.fontSize.md, // 16
    fontWeight: theme.fontWeight.medium,
    cursor: "pointer",
}));

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

    "& > *": {
    width: "100%",
    maxWidth: "100%",
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
export const EmptyState = styled.div(({theme}) => ({
    display: "flex",
    width: "100%",
    minHeight: "400px",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.xs,
}));

export const EmptyIconWrapper = styled.div(({theme}) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.lg, // 24
    color: theme.colors.imagePlaceholder,
}));

export const EmptyText = styled.p(({theme}) => ({
    fontSize: theme.fontSize.lg, // 18
    fontWeight: theme.fontWeight.regular,
    color: theme.colors.secondText,
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
    fontSize: theme.fontSize.md,

    "&:hover": {
        filter: "brightness(1.5)",
    }
}));
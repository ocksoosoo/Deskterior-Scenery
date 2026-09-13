import styled from "@emotion/styled";

// full-bleed(100vw) 요소가 만드는 가로 스크롤을 이 페이지 범위에서만 잘라냄.
// overflow-x: clip 은 스크롤 컨테이너를 만들지 않아 조상 sticky 를 깨지 않음.
export const Wrapper = styled.div({
  overflowX: "clip",
});

export const Page = styled.div(({ theme }) => ({
  maxWidth: "1088px",
  margin: "0 auto",
  padding: theme.spacing["3xl"],
  textAlign: "left",

  [theme.media.tablet]: {
    padding: `${theme.spacing["2xl"]} ${theme.spacing.xl}`,
  },

  [theme.media.mobile]: {
    padding: `${theme.spacing["2xl"]} ${theme.spacing.md}`,
    paddingBottom: `calc(${theme.spacing["2xl"]} + 81px + env(safe-area-inset-bottom, 0px))`,
  },
}));

export const TopSection = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing["2xl"], // 48

  [theme.media.tablet]: {
    gap: theme.spacing.lg, // 24
  },

  [theme.media.mobile]: {
    flexDirection: "column",
    gap: theme.spacing.md,
  },
}));

export const GalleryColumn = styled.div(({ theme }) => ({
  flex: "0 1 31.25rem",
  minWidth: 0,

  [theme.media.tablet]: { flex: "1 1 0", width: "auto" },
  [theme.media.mobile]: { flex: "none", width: "100%" },
}));

export const InfoColumn = styled.div(({ theme }) => ({
  flex: "0 0 21.75rem",
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.lg,

  [theme.media.mobile]: {
    flex: "none",
    width: "100%",
    gap: theme.spacing.md,
  },
}));

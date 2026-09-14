import styled from "@emotion/styled";

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
    // MobileCtaBar가 스크롤 중엔 화면 하단에 붙어(sticky) 콘텐츠 위에
    // 겹쳐 보이므로, 마지막 콘텐츠가 가리지 않게 여유 공간 확보
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

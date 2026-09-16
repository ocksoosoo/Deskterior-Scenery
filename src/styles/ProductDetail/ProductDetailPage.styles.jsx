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

// 브레드크럼(crumb)이 갤러리(이미지) 칼럼과 같은 폭을 공유하도록 그리드로 구성 —
export const TopGrid = styled.div(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "minmax(0, 31.25rem) 21.75rem",
  gridTemplateAreas: `"crumb ." "gallery info"`,
  columnGap: theme.spacing["2xl"], // 48
  rowGap: theme.spacing.sm,

  [theme.media.tablet]: {
    gridTemplateColumns: "minmax(0, 1fr) 21.75rem",
    columnGap: theme.spacing.lg, // 24
  },

  [theme.media.mobile]: {
    gridTemplateColumns: "minmax(0, 1fr)",
    gridTemplateAreas: `"crumb" "gallery" "info"`,
    rowGap: theme.spacing.md,
  },
}));

export const CrumbSlot = styled.div({
  gridArea: "crumb",
  minWidth: 0,
});

export const GalleryColumn = styled.div({
  gridArea: "gallery",
  minWidth: 0,
});

export const InfoColumn = styled.div(({ theme }) => ({
  gridArea: "info",
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.lg,

  [theme.media.mobile]: {
    gap: theme.spacing.md,
  },
}));

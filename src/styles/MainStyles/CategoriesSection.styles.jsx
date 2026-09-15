import styled from "@emotion/styled";

export const CategoriesContainer = styled.section(({ theme }) => ({
  width: "100%",
  padding: theme.spacing["3xl"],
  backgroundColor: theme.colors.cards,
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",

  // tablet(768-1023)
  [theme.media.tablet] : {
    padding: `${theme.spacing["2xl"]} ${theme.spacing.xl}`,
  },

  [theme.media.mobile]: {
    padding: `${theme.spacing["2xl"]} ${theme.spacing.lg}`,
  },

  [theme.media.smallMobile]: {
  padding: `${theme.spacing["2xl"]} ${theme.spacing.md}`,
  }
}));

export const CategoriesInner = styled.div(({theme}) => ({
  width: "100%",
  maxWidth: "1024px",
  marginInline: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing.xl,

  [theme.media.mobile]: {
    gap: theme.spacing.lg,
  },
}))


export const SectionTitle = styled.h2(({ theme }) => ({
  alignSelf: "flex-start",
  fontFamily: theme.fontFamily.display,
  fontSize: theme.fontSize["4xl"], // 32px
  fontWeight: theme.fontWeight.regular,
  color: theme.colors.textMain,

  [theme.media.mobile]: {
    fontSize: theme.fontSize["3xl"],
  },

  [theme.media.smallMobile]: {
    fontSize: theme.fontSize["2xl"],
  },
}));

export const CategoryList = styled.div(({ theme }) => ({
  display: "flex",
  gap: theme.spacing["2xl"], 
  width: "100%",

  // tablet(768-1023)
  [theme.media.tablet]: {
    width: "100%",
    maxWidth: "578px",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  [theme.media.mobile]: {
    width: "100%",
    maxWidth: "480px",
    flexWrap: "wrap",
    justifyContent: "center",
    columnGap: theme.spacing.md,
    rowGap: theme.spacing.lg,
  },

  [theme.media.smallMobile]: {
    columnGap: theme.spacing.sm,
  }
}));

export const CategoryItem = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "150px",
  alignItems: "center",
  gap: theme.spacing.md, // 16px
  cursor: "pointer",

  [theme.media.mobile]: {
    width: `calc((100% - ${theme.spacing.md} * 2) / 3)`,
  },

  [theme.media.smallMobile]: {
    width: `calc((100% - ${theme.spacing.sm} * 2) / 3)`,
  },
}));

export const CategoryImage = styled.img(({ theme }) => ({
  width: "145px",
  height: "145px",
  borderRadius: theme.radius.full,
  objectFit: "cover",
  // 사진 배경이 페이지 배경과 비슷해 경계가 안 보이는 경우를 대비해
  // 은은한 그림자로 항상 원과 배경이 구분되게 함
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",

  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.12)",
  },

  [theme.media.mobile]: {
    width: "100%",
    maxWidth: "120px",
    height: "auto",
    aspectRatio: "1 / 1",
  },

  [theme.media.smallMobile]: {
    maxWidth: "100px",
  },
}));

export const CategoryName = styled.div(({ theme }) => ({
  fontFamily: theme.fontFamily.base,
  fontSize: theme.fontSize.sm, // 14px
  fontWeight: theme.fontWeight.semiBold,
  color: theme.colors.textMain,
  textAlign: "center",

  [theme.media.mobile]: {
    fontSize: theme.fontSize.sm,
  },

  [theme.media.smallMobile]: {
    fontSize: theme.fontSize.xs,
  },
}));
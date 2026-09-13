import styled from "@emotion/styled";

export const CurationSection = styled.section(({ theme }) => ({
  padding: theme.spacing["3xl"], //64

  [theme.media.tablet]: {
    padding: `${theme.spacing["2xl"]} ${theme.spacing.xl}`,
  }
}))

export const CurationTitleBox = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing.md, // 16px
}));

export const CurationSubtitle = styled.p(({ theme }) => ({
  fontFamily: theme.fontFamily.base,
  fontSize: theme.fontSize.md, // 16px
  fontWeight: theme.fontWeight.medium,
  color: theme.colors.emphasis,
}));

export const CurationTitle = styled.h2(({ theme }) => ({
  fontSize: theme.fontSize["4xl"], // 32px
  fontWeight: theme.fontWeight.semiBold,
  color: theme.colors.textMain,
  marginBottom: theme.spacing.lg,
}));

export const CurationTitle2 = styled.h2(({ theme }) => ({
  fontFamily: theme.fontFamily.display,
  fontSize: theme.fontSize["4xl"], // 32px
  color: theme.colors.textMain,
  marginBottom: theme.spacing.lg,
}));

// mood keyword area
export const MoodKeywordBox = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing.xs,
}));

export const MoodKeywordText = styled.p(({ theme }) => ({
  fontFamily: theme.fontFamily.base,
  fontSize: theme.fontSize.md, // 16px
  fontWeight: theme.fontWeight.regular,
  color: theme.colors.secondText,
}));

export const KeywordChipContainer = styled.div(({ theme }) => ({
  margin: `${theme.spacing.md} 0 ${theme.spacing["2xl"]}`, // 16px 0 48px
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-start",
  gap: theme.spacing.md, // 16px
}));

export const KeywordButton = styled.button(({ theme, isSelected }) => ({
  padding: `${theme.spacing.sm} ${theme.spacing.md}`, // 12px 16px
  borderRadius: theme.radius.full,
  backgroundColor: isSelected
    ? theme.colors.emphasis
    : `${theme.colors.subtle}80`, // secondText color에 opacity 50%
  color: theme.colors.textMain,
  fontWeight: isSelected ? theme.fontWeight.semiBold : theme.fontWeight.regular,
  fontSize: theme.fontSize.xs,
}));

export const ClickableProductMap = styled.div(({ theme }) => ({
  display: "flex",
  gap: theme.spacing.lg,

  [theme.media.tablet]: {
    flexDirection: "column",
    alignItems: "center",
  }
}));

// DeskArea
export const DeskArea = styled.div(({ theme }) => ({
  height: "720px",
  position: "relative",
  flex: 2,
  aspectRatio: "4 / 3",
  overflow: "hidden",
  backgroundColor: theme.colors.imagePlaceholder,
  borderRadius: theme.radius.md,

  [theme.media.tablet]: {
    flex: "none",
    width: "100%",
    height: "auto",
    aspectRatio: "1 / 1",
  }
}));

export const HotspotButton = styled.button(({ theme, isSelected }) => ({
  position: "absolute",
  transform: "translate(-50%, -50%)",
  width: "40px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: isSelected ? theme.colors.emphasis : theme.colors.cards,
  borderRadius: theme.radius.full,
  fontSize: theme.fontSize.sm,
  fontWeight: theme.fontWeight.semiBold,
  colors: theme.colors.textMain,
  cursor: "pointer",
}));

export const DeskImage = styled.img({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

// ProductArea
export const ProductArea = styled.div(({ theme }) => ({
  padding: theme.spacing.lg,
  height: "720px",
  display: "flex",
  flexDirection: "column",
  flex: 1,
  backgroundColor: theme.colors.cards,
  borderRadius: theme.radius.md,
  overflow: "hidden",

  [theme.media.tablet]: {
    position: "relative",
    flex: "none",
    width: "80%",
    maxWidth: "750px",
    minWidth: "550px",
    height: "auto",
    minHeight: "280px",
    justifyContent: "space-between",
    overflow: "visible",
  }
}))

export const ProductContent = styled.div(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    width: "100%",

    [theme.media.tablet]: {
      flexDirection: "row",
      alignItems: "stretch",
      gap: theme.spacing.lg,
    }
}));

export const ProductLoading = styled.p({
  width: "100%",
  minHeight: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "16px",
  fontWeight: 500,
  textAlign: "center",
});

export const ProductTitleBox = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: theme.spacing.xs,
  marginBottom: theme.spacing.xl, //32

  [theme.media.tablet]: {
    marginBottom: theme.spacing.md,
  }
}));

export const ProductNumber = styled.div(({ theme }) => ({
  width: "32px",
  height: "32px",
  display: "flex",
  flexShrin: 0,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.radius.full,
  backgroundColor: theme.colors.emphasis,
  color: theme.colors.textMain,
  fontSize: theme.fontSize.sm,
  fontWeight: theme.fontWeight.semiBold,
}));

export const ProductTitle = styled.h3(({ theme }) => ({
  color: theme.colors.textMain,
  fontWeight: theme.fontWeight.semiBold,
  fontSize: theme.fontSize.xl, // 20px
}));

export const ProductImage = styled.img(({ theme }) => ({
  display: "block",
  width: "100%",
  objectFit: "cover",
  objectPosition: "center",
  aspectRatio: "16 / 9",
  marginBottom: theme.spacing.xl, //32

  [theme.media.tablet]: {
    width: "160px",
    height: "160px",
    aspectRatio: "1 / 1",
    borderRadius: theme.radius.sm,
  }
}));

export const ProductInfo = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.lg, // 24px

  [theme.media.tablet]: {
    gap: theme.spacing.sm, // 12
  }
}))

export const ProductName = styled.h4(({ theme }) => ({
  color: theme.colors.textMain,
  fontWeight: theme.fontWeight.semiBold,
  fontSize: theme.fontSize["2xl"],
}));

export const ProductPrice = styled.p(({ theme }) => ({
  color: theme.colors.textMain,
  fontWeight: theme.fontWeight.semiBold,
  fontSize: theme.fontSize.xl, // 20px
}));

export const ProductDescription = styled.p(({ theme }) => ({
  color: theme.colors.secondText,
  fontWeight: theme.fontWeight.regular,
  fontSize: theme.fontSize.sm, // 14px
  lineHeight: 1.5,
}));

export const ProductTagContainer = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.xs,
  marginBottom: theme.spacing.xl, //32

  // [theme.media.tablet]: {
  //   display: "none",
  // }
}));

export const ProductTag = styled.span(({ theme }) => ({
  padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
  color: theme.colors.textMain,
  background: theme.colors.subtle,
  borderRadius: theme.radius.full,
  fontSize: theme.fontSize.sm,
  fontWeight: theme.fontWeight.regular,
}));

export const ProductBottomArea = styled.div(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.lg,
  marginTop: "auto",
  flexShrink: 0,
}));

export const ViewMoreButton = styled.button(({ theme }) => ({
  width: "100%",
  height: "48px",
  padding: `${theme.spacing.sm} 0`,
  backgroundColor: theme.colors.textMain,
  color: theme.colors.cards,
  fontSize: theme.fontSize.sm, //14
  fontWeight: theme.fontWeight.medium,
  borderRadius: theme.radius.md, //8
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

// ProductPagination
export const ProductPagination = styled.div(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  [theme.media.tablet]: {
    display: "contents",
  }
}));

export const PaginationButton = styled.button(({ theme }) => ({
  width: "24px",
  height: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  backgroundColor: "transparent",
  color: theme.colors.textMain,
  cursor: "pointer",

  "&:disabled": {
    opacity: 0.3,
    cursor: "default",
  },

  [theme.media.tablet]: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: "44px",
      height: "44px",
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.cards,
      border: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
      zIndex: 10,

      "&:first-of-type": {
        left: "-66px",
      },
      "&:last-of-type": {
        right: "-66px",
      },
    },
}));

export const PaginationText = styled.span(({ theme }) => ({
  color: theme.colors.textMain,
  fontSize: theme.fontSize.sm, //14
  fontWeight:theme.fontWeight.semiBold,

  [theme.media.tablet]: {
    display: "none",
  }
}));

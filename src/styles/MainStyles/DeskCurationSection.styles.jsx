import styled from "@emotion/styled";

export const CurationSection = styled.section(({ theme }) => ({
  padding: theme.spacing["3xl"], //64
  width: "100%",
  boxSizing: "border-box",
  backgroundColor: theme.colors.background,

  [theme.media.tablet]: {
    padding: `${theme.spacing["2xl"]} ${theme.spacing.xl}`,
  },

  [theme.media.mobile]: {
    padding: `${theme.spacing["2xl"]} ${theme.spacing.lg}`,
  },

  [theme.media.smallMobile]: {
    padding: `${theme.spacing["2xl"]} ${theme.spacing.md}`,
  }
}));

export const CurationInner = styled.div({
  width: "100%",
  maxWidth: "896px",
  marginInline: "auto",
})

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

  [theme.media.mobile]: {
    fontSize: theme.fontSize.sm,
  },
}));

export const CurationTitle = styled.h2(({ theme }) => ({
  fontSize: theme.fontSize["4xl"], // 32px
  fontWeight: theme.fontWeight.semiBold,
  color: theme.colors.textMain,
  marginBottom: theme.spacing.lg,

  [theme.media.mobile]: {
    fontSize: theme.fontSize["3xl"],
  },

  [theme.media.smallMobile]: {
    fontSize: theme.fontSize["2xl"],
  },
}));

export const CurationTitle2 = styled.h2(({ theme }) => ({
  fontFamily: theme.fontFamily.display,
  fontSize: theme.fontSize["4xl"], // 32px
  color: theme.colors.textMain,
  marginBottom: theme.spacing.lg,

  [theme.media.mobile]: {
    fontSize: theme.fontSize["3xl"],
  },

  [theme.media.smallMobile]: {
    fontSize: theme.fontSize["2xl"],
  },
}));

// mood keyword area
export const MoodKeywordBox = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: theme.spacing.xs,

  [theme.media.mobile]: {
    marginBottom: theme.spacing.lg,
  },
}));

export const KeywordChipContainer = styled.div(({ theme }) => ({
  margin: `${theme.spacing.md} 0 ${theme.spacing["2xl"]}`, // 16px 0 48px
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "flex-start",
  gap: theme.spacing.md, // 16px

  [theme.media.mobile]: {
    display: "none",
  }
}));

export const MoodKeywordText = styled.p(({ theme }) => ({
  fontFamily: theme.fontFamily.base,
  fontSize: theme.fontSize.md, // 16px
  fontWeight: theme.fontWeight.regular,
  color: theme.colors.secondText,

  [theme.media.mobile]: {
    fontSize: theme.fontSize.sm,
  },
}));

export const KeywordButton = styled.button(({ theme, isSelected }) => ({
  padding: `${theme.spacing.sm} ${theme.spacing.md}`, // 12px 16px
  borderRadius: theme.radius.full,
  backgroundColor: isSelected
    ? theme.colors.emphasis
    : `${theme.colors.subtle}80`, // secondText color에 opacity 50%
  color: theme.colors.textMain,
  fontWeight: isSelected ? theme.fontWeight.semiBold : theme.fontWeight.regular,
  fontSize: theme.fontSize.sm,
}));

export const ClickableProductMap = styled.div(({ theme }) => ({
  display: "flex",
  gap: theme.spacing.lg,

  [theme.media.tablet]: {
    flexDirection: "column",
    alignItems: "center",
  },

  [theme.media.mobile]: {
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing.lg,
  },
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
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",

  [theme.media.tablet]: {
    flex: "none",
    width: "100%",
    height: "auto",
    aspectRatio: "1 / 1",
  },

  [theme.media.mobile]: {
    flex: "none",
    width: "100%",
    height: "auto",
    aspectRatio: "1 / 1",
  },
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
  color: theme.colors.textMain,
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
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
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
  },

  [theme.media.mobile]: {
    position: "relative",
    flex: "none",
    width: "100%",
    maxWidth: "none",
    minWidth: 0,
    height: "auto",
    padding: `${theme.spacing.md} ${theme.spacing.xl}`,
    overflow: "visible",
  },

  [theme.media.smallMobile]: {
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
  },
}))

export const ProductContent = styled.div(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    width: "100%",

    [theme.media.tablet]: {
      flexDirection: "row",
      alignItems: "stretch",
      gap: theme.spacing.lg,
    },

    [theme.media.mobile]: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: theme.spacing.md,
    },

    [theme.media.smallMobile]: {
      flexDirection: "column",
      gap: theme.spacing.sm,
    },
}));

export const ProductLoading = styled.div(({ theme }) => ({
  width: "100%",
  height: "100%",
  minHeight: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing.md, // 스피너와 텍스트 사이 간격
  color: theme.colors.secondText,
  fontFamily: theme.fontFamily.base,
  fontSize: theme.fontSize.sm,
  fontWeight: theme.fontWeight.medium,
  textAlign: "center",
  boxSizing: "border-box",

  [theme.media.tablet]: {
    minHeight: "280px",
  },

  [theme.media.mobile]: {
    minHeight: "220px",
    padding: 0,
  },
}));

export const ProductTitleBox = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: theme.spacing.xs,
  marginBottom: theme.spacing.xl, //32

  [theme.media.tablet]: {
    marginBottom: theme.spacing.md,
  },

  [theme.media.mobile]: {
    marginBottom: theme.spacing.md,
  }
}));

export const ProductNumber = styled.div(({ theme }) => ({
  width: "32px",
  height: "32px",
  display: "flex",
  flexShrink: 0,
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

  [theme.media.tablet]: {
    fontSize: theme.fontSize.xl,
  },

  [theme.media.mobile]: {
    fontSize: theme.fontSize.xl,
  }
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
  },

  [theme.media.mobile]: {
    width: "32%",
    maxWidth: "160px",
    height: "auto",
    aspectRatio: "1 / 1",
    objectFit: "contain",
    flexShrink: 0,
    marginBottom: 0,
    borderRadius: theme.radius.sm,
  },

  [theme.media.smallMobile]: {
    width: "100%",
    maxWidth: "none",
    height: "auto",
  }
}));

export const ProductInfo = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.lg, // 24px

  [theme.media.tablet]: {
    gap: theme.spacing.sm, // 12
  },

  [theme.media.mobile]: {
    flex: 1,
    minWidth: 0,
    gap: theme.spacing.xs,
  },

  [theme.media.smallMobile]: {
    width: "100%",
    flex: "none",
  }
}))

export const ProductName = styled.h4(({ theme }) => ({
  color: theme.colors.textMain,
  fontWeight: theme.fontWeight.semiBold,
  fontSize: theme.fontSize["2xl"],

  [theme.media.tablet]: {
    fontSize: theme.fontSize.xl,
  },

  [theme.media.mobile]: {
    fontSize: theme.fontSize.xl,
  },

  [theme.media.smallMobile]: {
    fontSize: theme.fontSize.lg,
  }
}));

export const ProductPrice = styled.p(({ theme }) => ({
  color: theme.colors.textMain,
  fontWeight: theme.fontWeight.semiBold,
  fontSize: theme.fontSize.xl, // 20px

  [theme.media.tablet]: {
    fontSize: theme.fontSize.lg,
  },

  [theme.media.mobile]: {
    fontSize: theme.fontSize.lg,
  },

  [theme.media.smallMobile]: {
    fontSize: theme.fontSize.md,
  },
}));

export const ProductDescription = styled.p(({ theme }) => ({
  color: theme.colors.secondText,
  fontWeight: theme.fontWeight.regular,
  fontSize: theme.fontSize.sm, // 14px
  lineHeight: 1.5,

  [theme.media.mobile]: {
    fontSize: theme.fontSize.sm,
  }
}));

export const ProductTagContainer = styled.div(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.xs,
  marginBottom: theme.spacing.xl, //32

  [theme.media.mobile]: {
    flexWrap: "wrap",
    gap: theme.spacing["2xs"],
    marginBottom: 0,
  },
}));

export const ProductTag = styled.span(({ theme }) => ({
  padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
  color: theme.colors.textMain,
  background: theme.colors.subtle,
  borderRadius: theme.radius.full,
  fontSize: theme.fontSize.sm,
  fontWeight: theme.fontWeight.regular,

  [theme.media.mobile]: {
  padding: `${theme.spacing["2xs"]} ${theme.spacing.xs}`,
  fontSize: theme.fontSize.sm,
  maxWidth: "100%",
},

[theme.media.smallMobile]: {
  fontSize: theme.fontSize.sm,
}
}));

export const ProductBottomArea = styled.div(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.lg,
  marginTop: "auto",
  flexShrink: 0,

  [theme.media.mobile]: {
    marginTop: theme.spacing.md,
  },
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

  // 호버
  "&:hover": {
    filter: "brightness(1.5)",
  },
}));

// ProductPagination
export const ProductPagination = styled.div(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  [theme.media.tablet]: {
    display: "contents",
  },

  [theme.media.mobile]: {
    display: "contents",
  },
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

  "&:hover": {
    opacity: "0.7",
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

    [theme.media.mobile]: {
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
          left: `calc(0px - ${theme.spacing.md})`,
        },

        "&:last-of-type": {
          right: `calc(0px - ${theme.spacing.md})`,
        },
    },
}));

export const PaginationText = styled.span(({ theme }) => ({
  color: theme.colors.textMain,
  fontSize: theme.fontSize.sm, //14
  fontWeight:theme.fontWeight.semiBold,

  [theme.media.tablet]: {
    display: "none",
  },

  [theme.media.mobile]: {
    display: "none",
  }
}));

export const KeywordDropdown = styled.div(({ theme }) => ({
  display: "none",
  position: "relative",
  alignSelf: "flex-start",

  [theme.media.mobile]: {
    display: "block",
  },
}));

export const KeywordTrigger = styled.button(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing.xs,
  minWidth: "118px",
  height: "40px",
  padding: theme.spacing.xs,
  border: "none",
  borderRadius: theme.radius.md,
  backgroundColor: theme.colors.cards,
  color: theme.colors.textMain,
  fontFamily: theme.fontFamily.base,
  fontSize: theme.fontSize.sm,
  cursor: "pointer",

  "& strong": {
    fontWeight: theme.fontWeight.medium,
    whiteSpace: "nowrap",
    display: "inline-flex",
    alignItems: "center",
    lineHeight: 1,
  },
}));

export const KeywordMenu = styled.ul(({ theme }) => ({
  position: "absolute",
  top: `calc(100% + ${theme.spacing["2xs"]})`,
  left: 0,
  minWidth: "140px",
  backgroundColor: theme.colors.cards,
  border: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
  borderRadius: theme.radius.md,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
  listStyle: "none",
  margin: 0,
  padding: theme.spacing["2xs"],
  zIndex: 20,
}));

export const KeywordMenuButton = styled.button(({ theme }) => ({
  display: "block",
  width: "100%",
  padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
  border: "none",
  borderRadius: theme.radius.sm,
  textAlign: "left",
  cursor: "pointer",
  fontFamily: theme.fontFamily.base,
  fontSize: theme.fontSize.sm,
  fontWeight: theme.fontWeight.medium,
  lineHeight: "normal",
  letterSpacing: "-0.14px",
  color: theme.colors.textMain,
  backgroundColor: "transparent",

  '&[aria-pressed="true"]': {
    backgroundColor: theme.colors.subtle,
  },

  "&:hover": {
    backgroundColor: theme.colors.subtle,
  },

  "&:focus-visible": {
    outline: `${theme.borderWidth.focus} solid ${theme.colors.emphasis}`,
    outlineOffset: "-2px",
  },
}));
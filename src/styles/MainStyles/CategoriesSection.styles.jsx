import styled from "@emotion/styled";

export const CategoriesContainer = styled.section(({ theme }) => ({
  width: "100%",
  padding: theme.spacing["3xl"],
  backgroundColor: theme.colors.cards,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing.xl, //32

  // tablet(768-1023)
  [theme.media.tablet] : {
    padding: `${theme.spacing["2xl"]} ${theme.spacing.xl}`,
  }
}));

export const SectionTitle = styled.h2(({ theme }) => ({
  alignSelf: "flex-start",
  fontFamily: theme.fontFamily.display,
  fontSize: theme.fontSize["4xl"], // 32px
  fontWeight: theme.fontWeight.regular,
  color: theme.colors.textMain,
}));

export const CategoryList = styled.div(({ theme }) => ({
  display: "flex",
  gap: theme.spacing["2xl"], // 48px

  // tablet(768-1023)
  [theme.media.tablet]: {
    width: "100%",
    maxWidth: "578px",
    flexWrap: "wrap",
    justifyContent: "center",
  }
}));

export const CategoryItem = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "150px",
  alignItems: "center",
  gap: theme.spacing.xs, // 8px
  cursor: "pointer",
}));

export const CategoryImage = styled.img(({ theme }) => ({
  width: "150px",
  height: "150px",
  borderRadius: theme.radius.full,
  objectFit: "cover",
  // 사진 배경이 페이지 배경과 비슷해 경계가 안 보이는 경우를 대비해
  // 은은한 그림자로 항상 원과 배경이 구분되게 함
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",

  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0 6px 14px rgba(0, 0, 0, 0.12)",
  }
}));

export const CategoryName = styled.div(({ theme }) => ({
  fontFamily: theme.fontFamily.base,
  fontSize: theme.fontSize.sm, // 14px
  fontWeight: theme.fontWeight.semiBold,
  color: theme.colors.textMain,
  textAlign: "center",
}));
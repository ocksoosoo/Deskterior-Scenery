import styled from "@emotion/styled";

// 큰 이미지 프레임
export const MainImageFrame = styled.div(({ theme }) => ({
  position: "relative",
  width: "100%",
  maxWidth: "31.25rem", // 500
  aspectRatio: "1 / 1",
  borderRadius: theme.radius.md,
  overflow: "hidden",
  background: theme.colors.imagePlaceholder,

  [theme.media.tablet]: {
    maxWidth: "none",
  },

  [theme.media.mobile]: {
    maxWidth: "none",
  },
}));

export const ImageOverlay = styled.div(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: theme.colors.textMain,
  opacity: 0.35,
}));

export const BadgeGroup = styled.div(({ theme }) => ({
  position: "absolute",
  top: theme.spacing.xs,
  left: theme.spacing.xs,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.xs,
  zIndex: 10,
}));

// 썸네일이 4장 이상일 때만 큰 이미지(MainImageFrame) 폭을 꽉 채워서 남는 공간을
// 균등하게 나눠 갖고, 3장 이하는 원래 고정 크기 그대로 둠 (적은 장수를 억지로
// 늘리면 오히려 어색해서)
export const ThumbRow = styled.div(({ theme, $fill }) => ({
  display: "flex",
  flexWrap: $fill ? "nowrap" : "wrap",
  gap: theme.spacing.sm,
  marginTop: theme.spacing.md,
}));

export const ThumbButton = styled.button(({ theme, $active, $fill }) => ({
  ...($fill
    ? { flex: "1 1 0", minWidth: 0, aspectRatio: "1 / 1" }
    : {
        flex: "0 0 auto",
        width: "5.625rem",
        height: "5.625rem",

        [theme.media.tablet]: {
          width: "3.55rem",
          height: "3.55rem",
        },

        [theme.media.mobile]: {
          width: "4.8125rem",
          height: "4.8125rem",
        },
      }),
  padding: 0,
  lineHeight: 0,
  overflow: "hidden",
  borderRadius: theme.radius.sm,
  background: theme.colors.imagePlaceholder,
  border: `${theme.borderWidth.focus} solid ${
    $active ? theme.colors.emphasis : "transparent"
  }`,
  cursor: "pointer",

  "&:focus-visible": {
    outline: `${theme.borderWidth.focus} solid ${theme.colors.textMain}`,
    outlineOffset: "2px",
  },
}));

export const mainImage = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

export const fillImage = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

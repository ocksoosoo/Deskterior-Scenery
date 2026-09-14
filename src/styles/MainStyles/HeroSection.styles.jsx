import styled from "@emotion/styled";
import { motion } from "motion/react";

export const HeroContainer = styled.section(({ theme }) => ({
  width: "100%",
  maxHeight: "900px",
  height: "100vh",
  background: `radial-gradient(circle at 50% 50%, ${theme.colors.cards} 0%, ${theme.colors.background || "#F8F7F2"} 70%)`,

  [theme.media.tablet]: {
    height: "720px",
    minHeight: 0,
    maxHeight: "none",},

    [theme.media.mobile]: {
      height: "380px",
    },

    [theme.media.smallMobile]: {
      height: "380px",
    }
  }));

// 히어로 이미지 배너 또는 영상 삽입
export const HeroMedia = styled.div({
  position: "relative",
  width: "100%",
  height: "100%",
});

export const ObjectInteractionArea = styled.div({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "70%",
  background: "transparent",
  zIndex: 20,
});

export const HeroTitle = styled(motion.h2)(({theme}) => ({
  position: "absolute",
  left: 0,
  top: "32%",
  width: "100%",
  textAlign: "center",
  fontSize: "clamp(4.5rem, 11vw, 11.5rem)",
  fontWeight: theme.fontWeight.bold,
  letterSpacing: "-0.04em",
  color: theme.colors.emphasis,
  pointerEvents: "none",
  zIndex: 10,

  [theme.media.tablet]: {
    top: "38%",
    fontSize: "clamp(72px, 10vw, 102px)",
    lineHeight: 1,
    margin: 0,
  },

  [theme.media.mobile]: {
    top: "40%",
    fontSize: "clamp(48px, 10vw, 76px",
    margin: 0,
  },

  [theme.media.smallMobile]: {
    top: "40%",
    margin: 0,
    fontSize: "clamp(28px, 10vw, 48px)",
  }
}));

// image
export const DeskLampButton = styled(motion.button)(({theme}) => ({
  position: "absolute",
  left: "5%",
  top: "-2%",
  width: "25%",
  border: "none",
  cursor: "pointer",

  [theme.media.tablet]: {
    top: "10%",
  },

}));

export const DeskLampImage = styled(motion.img)({
  width: "100%",
  height: "auto",
  display: "block",
});

export const HeadphonesButton = styled(motion.button)(({theme}) => ({
  
  position: "absolute",
  right: "7%",
  top: "-8%",
  width: "24%",
  border: "none",
  cursor: "pointer",

  [theme.media.tablet]: {
  top: "5%",
  },
}));

export const HeadphonesImage =  styled(motion.img)({
  width: "100%",
  height: "auto",
  display: "block",
  zIndex: "4",
});

export const PenTrayButton = styled(motion.button)(({theme}) => ({

  position: "absolute",
  right: "7%",
  top: "45%",
  width: "25%",
  border: "none",
  cursor: "pointer",

  [theme.media.tablet]: {
  right: "5%",
  top: "43%",
},
}));

export const PenTrayImage =  styled(motion.img)({
  width: "100%",
  height: "auto",
  display: "block",
  zIndex: "3",
});

export const DiaryButton = styled(motion.button)(({theme}) => ({
  position: "absolute",
  right: "67%",
  top: "48%",
  width: "32%",
  border: "none",
  cursor: "pointer",

  [theme.media.tablet]: {
  top: "47%",
},
}));

export const DiaryImage =  styled(motion.img)({
  height: "auto",
  width: "100%",
  display: "block",
});

export const FlowerVaseButton = styled(motion.button)(({theme}) => ({
  position: "absolute",
  right: "48%",
  top: "38%",
  width: "15%",
  border: "none",
  cursor: "pointer",

  [theme.media.tablet]: {
  top: "46%",
},
}));


export const FlowerVaseImage =  styled(motion.img)({
  width: "100%",
  height: "auto",
  display: "block",
  zIndex: "5",
});

// label, number, name
export const ObjectNumber = styled.span(({theme}) => ({
  display: "block",
  fontSize: theme.fontSize.xl,
  fontFamily: theme.fontFamily.display,
  color: theme.colors.textMain,

  [theme.media.tablet]: {
    fontSize: theme.fontSize.lg,
  }
}));

export const Objectname = styled.span(({theme}) => ({
  display: "block",
  marginTop: theme.spacing.xs,
  fontSize: theme.fontSize.sm,
  color: theme.colors.secondText,

  [theme.media.tablet]: {
    fontSize: theme.fontSize.xs,
    marginTop: theme.spacing["2xs"],
  }
}));

export const DeskLampLabel = styled(motion.div)(({theme}) => ({
  position: "absolute",
  left: "3%",
  top: "15%",
  color: theme.colors.textMain,

  [theme.media.tablet]: {
    left: "24%",
  }
}));

export const HeadphonesLabel = styled(motion.div)(({theme}) => ({
  position: "absolute",
  right: "28%",
  top: "8%",
  color: theme.colors.textMain,

  [theme.media.tablet]: {
    top: "15%",
  }
}));

export const PenTrayLabel = styled(motion.div)(({theme}) => ({
  position: "absolute",
  right: "15%",
  top: "47%",
  color: theme.colors.textMain,

  [theme.media.tablet]: {
  top: "45%",    
  }
}));

export const DiaryLabel = styled(motion.div)(({theme}) => ({
  position: "absolute",
  left: "5%",
  top: "50%",
  color: theme.colors.textMain,

  [theme.media.tablet]: {
    top: "49%",
  }
}));

export const FlowerVaseLabel = styled(motion.div)(({theme}) => ({
  position: "absolute",
  left: "52%",
  top: "64%",
  color: theme.colors.textMain,

  [theme.media.tablet]: {
    top: "60%",
  }
}));


export const CollectionLabel = styled.p(({theme}) => ({
  position: "absolute",
  left: "6%",
  top: "5%",
  fontSize: theme.fontSize.sm,
  fontWeight: theme.fontWeight.semiBold,
  letterSpacing: "2px",
  color: theme.colors.secondText,

  [theme.media.tablet]: {
    left: "4%",
    top: "4%",
    fontSize: theme.fontSize.xs,
    margin: 0,
  }
}));

export const GuideText = styled(motion.span)(({theme}) => ({
  position: "absolute",
  left: "58%",
  top: "30%",
  transform: "translateX(-50%)",
  fontSize: `clamp(${theme.fontSize.xs}, 1.2vw, ${theme.fontSize.sm})`,
  fontWeight: theme.fontWeight.regular,
  letterSpacing: "0.1875rem", //3px
  color: theme.colors.secondText,
  pointerEvents: "none",
  zIndex: 10,
  textDecoration: "underline",

  [theme.media.tablet]: {
    left: "63%",
  }
}));

export const MobileHeroVideo = styled.video(({theme}) => ({

  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  
  [theme.media.smallMobile]: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
}));
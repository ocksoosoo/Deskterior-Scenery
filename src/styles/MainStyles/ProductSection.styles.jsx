import styled from "@emotion/styled";
import { motion } from "motion/react";

export const ProductsSection = styled.section(({theme, isBest}) => ({
  padding: theme.spacing["3xl"], //64
  backgroundColor: isBest
    ? theme.colors.cards
    : theme.colors.background,

    [theme.media.tablet]: {
        padding: `${theme.spacing["2xl"]} ${theme.spacing.xl}`,
    },
}));

export const ProductTitle = styled.h2(({theme}) => ({
    marginBottom: theme.spacing.xl,
    fontFamily: theme.fontFamily.display,
    fontSize: theme.fontSize["4xl"], //32
    color: theme.colors.textMain,

    [theme.media.tablet]: {
        fontSize: theme.fontSize["3xl"],
        marginBottom: theme.spacing.lg,
    },
}));

// 화면에 보여줄 상품 카드 범위를 제한
export const SliderViewport = styled.div({
    width: "100%",
    overflow: "hidden",
    display: "grid",
    // 가운데 카드가 scale(1.08)로 커지는 만큼(카드 높이의 약 8%, 위아래로 절반씩)
    // 위아래 여유 공간을 둬서 overflow: hidden에 잘리지 않게 함
    padding: "20px 0",
});

export const SliderTrack = styled(motion.div)(({theme}) => ({
    gridArea: "1 / 1",
    justifySelf: "start",
    display: "flex",
    alignItems: "flex-start",
    alignSelf: "stretch",
    gap: theme.spacing.lg,
    width: "max-content",

    [theme.media.tablet]: {
        gap: theme.spacing.md,
        alignItems: "stretch",

        "& > div": {
            width: "min(260px, calc((100vw -160px) / 3))",
            height: "auto",
            minHeight: "350px",
        },
    },
}));

export const ProductCards = styled.div(({theme}) => ({
    width: "280px",
    height: "280px",
    background: theme.colors.imagePlaceholder,
}))

// 화살표 클릭 시 가운데로 오는 카드를 다른 카드보다 크게 강조해서
// "어떤 카드가 중앙인지" 한눈에 보이게 함.
// 카드 이동(SliderTrack의 스프링)과 확대/축소를 서로 다른 애니메이션 엔진(프레이머 motion vs
// CSS transition)으로 따로 굴리면, duration을 맞춰도 각자 곡선(이징) 모양이 달라서 매 순간
// 서로 어긋나 부자연스러워 보인다. 그래서 SlideItem도 motion.div로 바꿔서 같은 스프링 설정으로
// 위치·크기가 완전히 같은 리듬으로 움직이게 함 (구체적인 animate/transition은 ProductSection.jsx에서 지정)
export const SlideItem = styled(motion.div)({
    position: "relative",
    flexShrink: 0,
    transformOrigin: "center",
});

// 가운데(활성)가 아닌 카드는 상세이동/찜/담기 등 내부 클릭이 전혀 먹지 않게 덮는 투명 오버레이.
// 상품 탐색은 화살표로만 하도록, 클릭했을 때 가운데로 이동시키는 동작은 두지 않음
export const SlideOverlay = styled.div({
    position: "absolute",
    inset: 0,
    zIndex: 20,
});

// previous, next slider button
export const ProductSlider = styled.div(({theme}) => ({
    position: "relative",
    width: "min(1024px, 100vw)",
    left: "50%",
    transform: "translateX(-50%)",

    [theme.media.tablet]: {
        width: "100%",
        left: "auto",
        transform: "none",
    },
}));

export const SliderButton = styled.button(({theme}) => ({
    position: "absolute",
    top: "50%",
    width: "44px",
    height: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    border: `1px solid ${theme.colors.subtle}`,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.cards,
    color: theme.colors.textMain,
    cursor: "pointer",
    transform: "translateY(-50%)",
    zIndex: 10,
}));

// PageIndicator
export const PageIndicator = styled.div(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.xs,
    marginTop: theme.spacing.xl, //32
    color: theme.colors.secondText,
}));

export const IndicatorButton = styled.button(({theme}) => ({
    width: "8px",
    height: "8px",
    padding: 0,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.secondText,
    cursor: "pointer",
    transition: "width 0.2s ease, background-color 0.2s ease",

    // 현재 페이지의 indicator 스타일
    '&[aria-current="page"]': {
        width: "32px",
        backgroundColor: theme.colors.textMain,
    }
}))
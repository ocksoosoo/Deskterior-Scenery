import styled from "@emotion/styled";
import { motion } from "motion/react";

export const ProductsSection = styled.section(({theme, isBest}) => ({
    width: "100%",
    boxSizing: "border-box",
    padding: theme.spacing["3xl"], //64
    backgroundColor: isBest
        ? theme.colors.cards
        : theme.colors.background,

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

export const ProductTitle = styled.h2(({theme}) => ({
    width: "100%",
    maxWidth: "896px",
    marginInline: "auto",
    marginBottom: theme.spacing.xl,
    fontFamily: theme.fontFamily.display,
    fontSize: theme.fontSize["4xl"], //32
    color: theme.colors.textMain,

    [theme.media.tablet]: {
        fontSize: theme.fontSize["3xl"],
        marginBottom: theme.spacing.lg,
    },

    [theme.media.mobile]: {
        fontSize: theme.fontSize["3xl"],
        marginBottom: theme.spacing.lg,
    },

    [theme.media.smallMobile]: {
        fontSize: theme.fontSize["2xl"],
    }
}));

// 화면에 보여줄 상품 카드 범위를 제한
export const SliderViewport = styled.div({
    // 화살표 버튼과 겹치지 않도록 폭을 1024px로 제한하되, 화면이 그보다 좁으면
    // (버튼이 바깥에 설 자리가 없으면) flex-shrink로 같이 줄어들게 해서
    // 가로 스크롤이 생기지 않게 함 (고정 음수 offset 방식은 좁은 화면에서 넘침 발생)
    flex: "0 1 1024px",
    minWidth: 0,
    overflow: "hidden",
    display: "grid",
    // 위아래 여유 공간을 둬서 overflow: hidden에 카드 그림자 등이 잘리지 않게 함
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
            width: "min(260px, calc((100vw - 160px) / 3))",
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
// 화면에 보이는 좌우 이웃 카드(currentIndex/currentIndex+2)는 눌렀을 때 그 카드가
// 가운데로 오도록(=이전/다음 한 칸) 자체 클릭 핸들러가 붙는데, 화살표 옆으로 살짝
// 삐져나온(화면에 온전히 안 보이는) 나머지 여분 카드까지 포인터 커서가 뜨면 클릭
// 가능한 것처럼 보여 혼동을 주므로, 커서는 실제로 클릭 핸들러가 붙는 경우에만 표시
export const SlideOverlay = styled.div({
    position: "absolute",
    inset: 0,
    zIndex: 20,
});

// previous, next slider button
// 버튼을 카드 위에 절대 위치로 겹쳐 놓는 대신, flex row 안에서 카드 영역(SliderViewport)과
// 나란히 자기 자리를 차지하게 해서 화면 폭에 상관없이 겹치지 않게 함
export const ProductSlider = styled.div(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.md,

    [theme.media.tablet]: {
        gap: theme.spacing["2xs"],
    },
}));

export const SliderButton = styled.button(({theme}) => ({
    flexShrink: 0,
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
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
    transition: "box-shadow 0.15s ease, transform 0.2s ease",

    "&:hover": {
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.12)",
    },
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
}));

// mobile

export const MobileProductGrid = styled.div(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  columnGap: theme.spacing.md,
  rowGap: theme.spacing.lg,

  [theme.media.smallMobile]: {
    columnGap: theme.spacing.sm,
  },
}));

export const MobileCardSlot = styled.div(({ theme }) => ({
  minWidth: 0,

  // 이 영역 안의 상품 카드만 고정 너비 해제
  "& > div": {
    width: "100%",
    minWidth: 0,
    height: "100%",
    boxSizing: "border-box",
  },

  // 상품 정보 영역
  "& > div > div:last-child": {
    minWidth: 0,
    boxSizing: "border-box",
    padding: `0 ${theme.spacing.xs}`,
    overflowWrap: "anywhere",
    fontSize: "14px",
  },

  // 상품명
  "& strong": {
    width: "100%",
    fontSize: theme.fontSize.md,
    lineHeight: 1.4,
    minHeight: "2.8em",
  },

  // 카테고리명
  "& > div > div:last-child > span": {
    fontSize: theme.fontSize.xs,
  },

  // 가격
  "& > div > div:last-child > p:first-of-type": {
    fontSize: theme.fontSize.md,
  },

  // 리뷰
  "& > div > div:last-child > p:last-of-type": {
    marginTop: "auto",
    fontSize: theme.fontSize.sm,
  },
}));

export const MobileMoreButton = styled.button(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "44px",
  height: "44px",
  margin: `${theme.spacing.xl} auto 0`,
  padding: 0,
  border: `${theme.borderWidth.default} solid ${theme.colors.subtle}`,
  borderRadius: theme.radius.full,
  backgroundColor: theme.colors.cards,
  color: theme.colors.textMain,
  fontSize: theme.fontSize["2xl"],
  cursor: "pointer",

  "&:focus-visible": {
    outline: `${theme.borderWidth.focus} solid ${theme.colors.emphasis}`,
    outlineOffset: theme.spacing["2xs"],
  },
}));
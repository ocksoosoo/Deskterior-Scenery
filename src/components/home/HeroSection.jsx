import {
  HeroContainer,
  HeroMedia,
  DeskLampImage,
  HeadphonesImage,
  DiaryImage,
  FlowerVaseImage,
  PenTrayImage,
  HeroTitle,
  DeskLampLabel,
  DeskLampButton,
  HeadphonesLabel,
  HeadphonesButton,
  DiaryLabel,
  DiaryButton,
  PenTrayLabel,
  PenTrayButton,
  FlowerVaseLabel,
  FlowerVaseButton,
  ObjectNumber,
  Objectname,
  CollectionLabel,
  ObjectInteractionArea,
  GuideText,
  MobileHeroVideo,
} from "../../styles/MainStyles/HeroSection.styles";
import deskLamp from "../../assets/obj-desk-lamp.png";
import diary from "../../assets/obj-diary-pen.png";
import flowerVase from "../../assets/obj-flower-vase.png";
import headphones from "../../assets/obj-headphones.png";
import penTray from "../../assets/obj-pen-tray.png";
import { useEffect, useRef, useState } from "react";
import { useAnimate, motion } from "motion/react";
import heroPoster from "../../assets/Hero.png";
import mobileHeroVideo from "../../assets/hero-tangled-objects.mp4";

function AnimateHeroSection() {
  const [loadedCount, setLoadedCount] = useState(0);
  // 이미지 펼침 여부
  const [isExpanded, setIsexpanded] = useState(false);
  // 이미지(전체) 호버 상태
  const [isAreaHovered, setIsAreaHovered] = useState(false);
  // 생성한 애니메이션 제어 객체를 보관
  const floatingControls = useRef([]);

  // useAnimate(): Framer Motion에서 애니메이션을 세밀하게 제어할 수 있게 해주는 hook
  // scope: 애니메이션을 적용할 DOM의 기준점(ref)
  const [scope, animate] = useAnimate();

  const isReady = loadedCount >= 5;

  useEffect(() => {
    if(!isReady || isExpanded) return;

  const controlsList = [
    animate(
      ".floating-lamp",
      { y: [0, -9, 0], rotate: [0, 1.2, 0] },
      { duration: 2.8, delay: 0.1, repeat: Infinity, ease: "easeInOut" }
    ),
    animate(
      ".floating-headphones",
      { y: [0, -6, 0], rotate: [0, -1, 0] },
      { duration: 2.4, delay: 0.3, repeat: Infinity, ease: "easeInOut" }
    ),
    animate(
      ".floating-penTray",
      { y: [0, -7, 0], rotate: [0, 0.8, 0] },
      { duration: 3.1, delay: 0.6, repeat: Infinity, ease: "easeInOut" }
    ),
    animate(
      ".floating-diary",
      { y: [0, -5, 0], rotate: [0, -1.5, 0] },
      { duration: 2.6, delay: 0.2, repeat: Infinity, ease: "easeInOut" }
    ),
    animate(
      ".floating-flowerVase",
      { y: [0, -8, 0], rotate: [0, 1, 0] },
      { duration: 3.3, delay: 0.5, repeat: Infinity, ease: "easeInOut" }
    ),
  ];

  // 호버 상태에 따라 모든 아이템 일시정지 또는 재개
  floatingControls.current = controlsList;

  return() => {
    controlsList.forEach((controls) => controls.stop());
    floatingControls.current = [];
  };
}, [isReady, isExpanded, animate]);

  // 호버 제어 전용 effect
  useEffect(() => {
    if(!isReady || isExpanded) return;

    floatingControls.current.forEach((controls) => {
      if(isAreaHovered) {
        controls.pause();
      } else {
        controls.play();
      }
    });
  }, [isAreaHovered, isReady, isExpanded]);

  function handleImageLoad() {
    setLoadedCount((count) => count + 1);
  }

  return (
    <HeroContainer>
      <HeroMedia ref={scope}>
        
        <ObjectInteractionArea
        onMouseEnter={() => setIsAreaHovered(true)}
        onMouseLeave={() => setIsAreaHovered(false)}
        onClick={() => {
          if(isReady && !isExpanded) {
            setIsexpanded(true);
          }
        }}
        style={{
          cursor: isExpanded ? "default" : "pointer",
        }}
        >
        </ObjectInteractionArea>

        <GuideText
        initial={{opacity: 0, y: 5}}
        animate={{
          opacity: isReady && !isExpanded ? 0.75 : 0,
          y: isReady && !isExpanded ? 0 : -10,
        }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        >
          ↙ Click to arrange your SCENE
        </GuideText>

        <HeroTitle
        initial={{ letterSpacing: "-6px" }}
        animate={
          isExpanded
          ? { letterSpacing: ["-6px", "-16px", "16px"]}
          : { letterSpacing: "-6px"}
        }
        transition={{ duration: 1.35, times: [0, 0.25, 1], ease: "easeInOut"}}
        >
          SCENERY
        </HeroTitle>
        <CollectionLabel>NEW COLLECTION</CollectionLabel>


        <DeskLampButton
        type="button"
        aria-label="물건 펼치기"
        initial={{
          x: "130%",
          y: "10%",
          scale: 0.85,
          rotate: 15,
        }}
        animate={
          isReady && isExpanded
          ? { x: 0, y: 0, scale: 1, rotate: 0 }
          : undefined
        }
        transition={{
          duration: isExpanded ? 1.35 : 0.4,
          ease: "easeInOut",
        }}
        onClick={() => {
          if(isReady) {
            setIsexpanded(true);
          }
        }}
        >
        <DeskLampImage
        src={deskLamp}
        alt="데스크 스탠드"
        className="floating-lamp"
        onLoad={handleImageLoad}
        onError={handleImageLoad}
        />
        </DeskLampButton>
        <DeskLampLabel
        initial={{opacity: 0}}
        animate={{
          opacity: isReady && isExpanded ? 1 : 0,
        }}
        transition={{
          delay: 1.45,
          duration: 0.3,
        }}
        >
          <ObjectNumber>01</ObjectNumber>
          <Objectname>DESK LAMP</Objectname>
        </DeskLampLabel>
        <HeadphonesButton
        type="button"
        aria-label="물건 펼치기"
        initial={{
          x: "-130%",
          y: "65%",
          scale: 0.85,
          rotate: 5,
        }}
        animate={
          isReady && isExpanded
          ? { x: 0, y: 0, scale: 1, rotate: 0 }
          : undefined
        }
        transition={{
          delay: 0.2,
          duration: 1.35,
          ease: "easeInOut",
        }}
        onClick={() => {
          if(isReady) {
            setIsexpanded(true);
          }
        }}
        >
        <HeadphonesImage
        src={headphones}
        alt="헤드폰"
        className="floating-headphones"
        onLoad={handleImageLoad}
        onError={handleImageLoad}
        onClick={() => {
          if(isReady) {
            setIsexpanded(true);
          }
        }}
        />
        </HeadphonesButton>
          
        <HeadphonesLabel
        initial={{opacity: 0}}
        animate={{
          opacity: isReady && isExpanded ? 1 : 0,
        }}
        transition={{
          delay: 1.45,
          duration: 0.3,
        }}
        >
          <ObjectNumber>02</ObjectNumber>
          <Objectname>HEADPHONES</Objectname>
        </HeadphonesLabel>
        
        <PenTrayButton
        type="button"
        aria-label="물건 펼치기"
        onClick={() => {
          if(isReady) {
            setIsexpanded(true);
          }
        }}
        initial={{
          x: "-125%",
          y: "-30%",
          scale: 0.85,
          rotate: -5,
        }}
        animate={
          isReady && isExpanded
          ? { x: 0, y: 0, scale: 1, rotat: 0 }
          : undefined
        }
        transition={{
          delay: 0.2,
          duration: 1.35,
          ease: "easeInOut"
        }}
        >
        <PenTrayImage
        src={penTray}
        alt="펜트레이" 
        className="floating-penTray"
        onLoad={handleImageLoad}
        onError={handleImageLoad}
        />
        </PenTrayButton>
        <PenTrayLabel
        initial={{opacity: 0}}
        animate={{
          opacity: isReady && isExpanded ? 1 : 0,
        }}
        transition={{
          delay: 1.45,
          duration: 0.3,
        }}
        >
          <ObjectNumber>03</ObjectNumber>
          <Objectname>PEN TRAY</Objectname>
        </PenTrayLabel>
        <DiaryButton
        type="button"
        aria-label="물건 펼치기"
        onClick={() => {
          if(isReady) {
            setIsexpanded(true);
          }
        }}
        initial={{
          x: "105%",
          y: "-20%",
          scale: 0.85,
          rotate: -5,
        }}
        animate={
          isReady && isExpanded
          ? { x: 0, y: 0, scale: 1, rotat: 0 }
          : undefined
        }
        transition={{
          delay: 0.2,
          duration: 1.35,
          ease: "easeInOut"
        }}
        >
        <DiaryImage
        src={diary}
        alt="다이어리"
        className="floating-diary"
        onLoad={handleImageLoad}
        onError={handleImageLoad}
        />
        </DiaryButton>
        <DiaryLabel
        initial={{opacity: 0}}
        animate={{
          opacity: isReady && isExpanded ? 1 : 0,
        }}
        transition={{
          delay: 1.45,
          duration: 0.3,
        }}
        >
          <ObjectNumber>04</ObjectNumber>
          <Objectname>DIARY</Objectname>
        </DiaryLabel>
        <FlowerVaseButton
        type="button"
        aria-label="물건 펼치기"
        onClick={() => {
          if(isReady) {
            setIsexpanded(true);
          }
        }}
        initial={{
          x: "45%",
          y: "-15%",
          scale: 0.85,
          rotate: -30,
        }}
        animate={
          isReady && isExpanded
          ? { x: 0, y: 0, scale: 1, rotat: 0 }
          : undefined
        }
        transition={{
          delay: 0.2,
          duration: 1.35,
          ease: "easeInOut"
        }}
        >
        <FlowerVaseImage
        src={flowerVase}
        alt="꽃병" 
        className="floating-flowerVase"
        onLoad={handleImageLoad}
        onError={handleImageLoad}
        />
        </FlowerVaseButton>
        <FlowerVaseLabel
        initial={{opacity: 0}}
        animate={{
          opacity: isReady && isExpanded ? 1 : 0,
        }}
        transition={{
          delay: 1.45,
          duration: 0.3,
        }}
        >
          <ObjectNumber>05</ObjectNumber>
          <Objectname>FLOWER VASE</Objectname>
        </FlowerVaseLabel>
      </HeroMedia>
    </HeroContainer>
  )
}

function HeroSection() {
  const [isMobile, setIsMobile] = useState(() =>
    window.matchMedia("(max-width: 767px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    function handleChange(event) {
      setIsMobile(event.matches);
    }

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  if (isMobile) {
    return (
      <HeroContainer>
        <MobileHeroVideo
          src={mobileHeroVideo}
          poster={heroPoster}
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
          aria-label="SCENERY 모바일 히어로 영상"
        />
      </HeroContainer>
    );
  }

  return <AnimateHeroSection />;
}

export { AnimateHeroSection };
export { HeroSection };

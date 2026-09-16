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
import deskLamp from "../../assets/obj_desk_lamp.webp";
import diary from "../../assets/obj_diary_pen.webp";
import flowerVase from "../../assets/obj_flower_vase.webp";
import headphones from "../../assets/obj_headphones.webp";
import penTray from "../../assets/obj_pen_tray.webp";
import heroPoster from "../../assets/Hero.png"
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAnimate, motion } from "motion/react";
import mobileHeroVideo from "../../assets/hero-tangled-objects.mp4";
import useIsMobile from "../../hook/useIsMobile";

// 각 오브젝트와 이름이 가장 비슷한 실제 상품으로 연결 (이미지 자체는 상품
// 데이터와 연결되어 있지 않은 정적 에셋이라 수동으로 매핑)
const HERO_PRODUCT_IDS = {
  deskLamp: 8, // Wood Shade Articulated Desk Lamp
  headphones: 16, // Matte Gray Wireless Headphones
  penTray: 39, // Gunmetal Aluminum Pen Tray
  diary: 40, // Classic Gold Fountain Pen
  flowerVase: 30, // Clear Cylinder Glass Vase
};

function AnimateHeroSection() {
  const navigate = useNavigate();
  const [loadedCount, setLoadedCount] = useState(0);
  // 이미지 펼침 여부
  const [isExpanded, setIsexpanded] = useState(false);
  // 이미지(전체) 호버 상태
  const [isAreaHovered, setIsAreaHovered] = useState(false);
  // 생성한 애니메이션 제어 객체를 보관
  const floatingControls = useRef([]);
  // 각 오브젝트 라벨의 DOM 노드 (펼치기 직후 포커스 이동에 사용)
  const labelRefs = useRef({});
  // 펼치기를 실행한 오브젝트 (펼쳐지면 그 라벨로 포커스를 옮긴다). 리렌더를
  // 유발할 필요가 없는 값이라 state 대신 ref로 보관한다
  const pendingFocusKey = useRef(null);

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

  // 펼치기 직후, 방금 펼친 오브젝트의 라벨로 포커스를 옮겨서 키보드
  // 흐름이 끊기지 않게 한다 (Enter로 펼치기 → 바로 이어서 Enter로 이동)
  useEffect(() => {
    if (!isExpanded || !pendingFocusKey.current) return;
    labelRefs.current[pendingFocusKey.current]?.focus();
    pendingFocusKey.current = null;
  }, [isExpanded]);

  // 아직 안 펼쳐진 상태면 먼저 펼치고, 이미 펼쳐진 상태에서 다시 누르면 그
  // 상품의 상세페이지로 이동한다
  function handleObjectClick(event, key) {
    if (!isReady) return;

    // 두 경우(펼치기/이동) 모두 이 클릭 직후 버튼이 aria-hidden 처리되므로,
    // 포커스가 aria-hidden 요소에 남아있지 않도록 먼저 blur 처리한다
    event.currentTarget.blur();

    if (!isExpanded) {
      setIsexpanded(true);
      pendingFocusKey.current = key;
      return;
    }

    navigate(`/products/${HERO_PRODUCT_IDS[key]}`);
  }

  // 펼치기 전에는 오브젝트 버튼 5개가 전부 Tab 순서에 들어가 있으면, 어차피
  // 다 똑같이 "펼치기"만 하는 중복된 정지점이 5번 생겨서 키보드 사용자에게
  // 불필요하게 반복된다. 대신 이 안내 문구 하나만 Tab으로 접근 가능하게 해서
  // 펼치기 전엔 단일 진입점, 펼친 뒤엔 각 라벨이 진입점이 되게 한다
  function handleGuideActivate(event) {
    if (!isReady || isExpanded) return;
    // 펼쳐지는 순간 이 요소도 aria-hidden 처리되므로 먼저 blur 처리한다
    event.currentTarget.blur();
    setIsexpanded(true);
    pendingFocusKey.current = "deskLamp";
  }

  function handleGuideKeyDown(event) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    handleGuideActivate(event);
  }

  function handleLabelKeyDown(event, productId) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    navigate(`/products/${productId}`);
  }

  // 뜰 때는 빠르게, 원위치로 내려올 때는 천천히 (whileHover는 양방향 전환
  // 속도가 같아서, 방향별로 다른 속도를 주려면 직접 애니메이션을 건다)
  function handleObjectHoverStart(selector) {
    if (!isExpanded) return;
    animate(selector, { y: -10 }, { duration: 0.2, ease: "easeOut" });
  }

  function handleObjectHoverEnd(selector) {
    if (!isExpanded) return;
    animate(selector, { y: 0 }, { duration: 0.7, ease: "easeInOut" });
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
          pointerEvents: isExpanded ? "none" : "auto",
        }}
        >
        </ObjectInteractionArea>

        <GuideText
        role="button"
        tabIndex={isReady && !isExpanded ? 0 : -1}
        aria-hidden={isExpanded || undefined}
        aria-label="클릭해서 오브젝트 펼치기"
        onClick={handleGuideActivate}
        onKeyDown={handleGuideKeyDown}
        style={{ textDecoration: isAreaHovered ? "underline" : "none" }}
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
        aria-hidden="true"
        tabIndex={-1}
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
        onClick={(event) => handleObjectClick(event, "deskLamp")}
        onHoverStart={() => handleObjectHoverStart(".floating-lamp")}
        onHoverEnd={() => handleObjectHoverEnd(".floating-lamp")}
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
        ref={(el) => { labelRefs.current.deskLamp = el; }}
        role="button"
        tabIndex={isExpanded ? 0 : -1}
        aria-hidden={!isExpanded || undefined}
        aria-label="Desk Lamp 상세 보기"
        style={{ cursor: "pointer", pointerEvents: isExpanded ? "auto" : "none" }}
        onClick={() => navigate(`/products/${HERO_PRODUCT_IDS.deskLamp}`)}
        onKeyDown={(event) => handleLabelKeyDown(event, HERO_PRODUCT_IDS.deskLamp)}
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
        aria-hidden="true"
        tabIndex={-1}
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
        onClick={(event) => handleObjectClick(event, "headphones")}
        onHoverStart={() => handleObjectHoverStart(".floating-headphones")}
        onHoverEnd={() => handleObjectHoverEnd(".floating-headphones")}
        >
        <HeadphonesImage
        src={headphones}
        alt="헤드폰"
        className="floating-headphones"
        onLoad={handleImageLoad}
        onError={handleImageLoad}
        />
        </HeadphonesButton>
          
        <HeadphonesLabel
        ref={(el) => { labelRefs.current.headphones = el; }}
        role="button"
        tabIndex={isExpanded ? 0 : -1}
        aria-hidden={!isExpanded || undefined}
        aria-label="Headphones 상세 보기"
        style={{ cursor: "pointer", pointerEvents: isExpanded ? "auto" : "none" }}
        onClick={() => navigate(`/products/${HERO_PRODUCT_IDS.headphones}`)}
        onKeyDown={(event) => handleLabelKeyDown(event, HERO_PRODUCT_IDS.headphones)}
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
        aria-hidden="true"
        tabIndex={-1}
        onClick={(event) => handleObjectClick(event, "penTray")}
        onHoverStart={() => handleObjectHoverStart(".floating-penTray")}
        onHoverEnd={() => handleObjectHoverEnd(".floating-penTray")}
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
        ref={(el) => { labelRefs.current.penTray = el; }}
        role="button"
        tabIndex={isExpanded ? 0 : -1}
        aria-hidden={!isExpanded || undefined}
        aria-label="Pen Tray 상세 보기"
        style={{ cursor: "pointer", pointerEvents: isExpanded ? "auto" : "none" }}
        onClick={() => navigate(`/products/${HERO_PRODUCT_IDS.penTray}`)}
        onKeyDown={(event) => handleLabelKeyDown(event, HERO_PRODUCT_IDS.penTray)}
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
        aria-hidden="true"
        tabIndex={-1}
        onClick={(event) => handleObjectClick(event, "diary")}
        onHoverStart={() => handleObjectHoverStart(".floating-diary")}
        onHoverEnd={() => handleObjectHoverEnd(".floating-diary")}
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
        ref={(el) => { labelRefs.current.diary = el; }}
        role="button"
        tabIndex={isExpanded ? 0 : -1}
        aria-hidden={!isExpanded || undefined}
        aria-label="Diary Pen 상세 보기"
        style={{ cursor: "pointer", pointerEvents: isExpanded ? "auto" : "none" }}
        onClick={() => navigate(`/products/${HERO_PRODUCT_IDS.diary}`)}
        onKeyDown={(event) => handleLabelKeyDown(event, HERO_PRODUCT_IDS.diary)}
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
          <Objectname>DIARY PEN</Objectname>
        </DiaryLabel>
        <FlowerVaseButton
        type="button"
        aria-label="물건 펼치기"
        aria-hidden="true"
        tabIndex={-1}
        onClick={(event) => handleObjectClick(event, "flowerVase")}
        onHoverStart={() => handleObjectHoverStart(".floating-flowerVase")}
        onHoverEnd={() => handleObjectHoverEnd(".floating-flowerVase")}
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
        ref={(el) => { labelRefs.current.flowerVase = el; }}
        role="button"
        tabIndex={isExpanded ? 0 : -1}
        aria-hidden={!isExpanded || undefined}
        aria-label="Flower Vase 상세 보기"
        style={{ cursor: "pointer", pointerEvents: isExpanded ? "auto" : "none" }}
        onClick={() => navigate(`/products/${HERO_PRODUCT_IDS.flowerVase}`)}
        onKeyDown={(event) => handleLabelKeyDown(event, HERO_PRODUCT_IDS.flowerVase)}
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
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <HeroContainer>
        <MobileHeroVideo
          src={mobileHeroVideo}
          poster={heroPoster}
          autoPlay
          muted
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

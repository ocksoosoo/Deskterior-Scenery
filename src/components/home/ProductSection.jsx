import {
  ProductsSection,
  ProductTitle,
  ProductSlider,
  SliderButton,
  PageIndicator,
  IndicatorButton,
  SliderViewport,
  SliderTrack,
  SlideItem,
  SlideOverlay,
  MobileProductGrid,
  MobileCardSlot,
  MobileMoreButton,
} from "../../styles/MainStyles/ProductSection.styles";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons/Icons";
import ProductCard from "../product/ProductCard";
import categories from "../../data/categories";
import { getProducts, deriveBadgeFields } from "../../api/productsApi";
import { useState, useEffect, useRef } from "react";
import useCartStore from "../../store/cartStore";
import { showSuccessToast, showFailToast } from "../common/ShowToast";
import { useTheme } from "@emotion/react";

// 페이지별 상품 표시 개수
const ITEMS_PER_PAGE = 3;
// 새로고침 전까지만 모바일 표시 개수 기억
const mobileVisibleCounts = new Map();

// 카드 이동(트랙)과 확대/축소(가운데 카드 강조)를 같은 스프링 설정으로 움직여서
// 서로 다른 애니메이션 엔진(타이밍/이징 곡선)을 쓸 때 생기던 어긋남을 없앤다.
// 기존 damping(70)이 이 stiffness/mass 기준 임계감쇠(약 22)의 3배가 넘어서
// 실제로 멈추기까지 1.6초 가까이 걸렸음 - 임계감쇠에 가깝게 낮춰서 훨씬 빨리 멈추게 함
const SLIDE_SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 26,
  mass: 0.4,
  // 순간 이동(duration:0) 리셋 직후 이어지는 스프링이, 그 직전 애니메이션의
  // 속도를 이어받아 반대 방향으로 크게 튕겨나가는 것을 방지 (항상 정지 상태에서 시작)
  velocity: 0,
};

// getCategoryname(): 카테고리 이름을 찾는 함수, 일치하는 categoryId를 찾으면 category name을 반환하고 찾지 못하면 categoryId를 반환함
function getCategoryName(categoryId) {
  const category = categories.find((item) => item.id === categoryId);
  return category?.name ?? categoryId;
}

function DesktopProductGroup({ title, items, isBest = false, onAddToCart }) {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [, setDirection] = useState(1);
  const [isResetting, setIsResetting] = useState(false);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  // 끝(경계)에 도달하는 애니메이션이 아직 끝나지 않았는데 화살표를 또 눌렀을 때,
  // 그 클릭을 버리지 않고 리셋이 끝난 직후 이어서 처리하기 위한 예약
  const pendingDirectionRef = useRef(null);
  // 상품이 로드되기 전 currentIndex 초기값(1)은 두 번째 상품을 가리키므로,
  // 실제 상품이 도착하면 첫 번째 상품이 가운데에서 시작하도록 한 번만 보정
  const didInitRef = useRef(false);

  const [sliderSize, setSliderSize] = useState({
    step: 0, // 카드 한 장 이동 거리(카드 너비 + 간격)
    sideSpace: 0, // 카드를 가운데 두기 위한 왼쪽 여백
  });

  // 어느 페이지에 있었든 홈으로 돌아오면(헤더 로고 클릭, 뒤로가기, 새로고침
  // 등 경로에 상관없이) 항상 첫 상품이 가운데에 오도록, 이전 위치를 기억하지
  // 않고 매번 items.length(첫 상품 위치)로 초기화한다
  useEffect(() => {
    if (items.length > 0 && !didInitRef.current) {
      didInitRef.current = true;
      setIsResetting(true);
      setCurrentIndex(items.length);
    }
  }, [items]);

  useEffect(() => {
    if (!isResetting) return;

    const frameId = requestAnimationFrame(() => {
      setIsResetting(false);

      // 리셋(순간 이동)이 끝나자마자, 그동안 밀려 있던 클릭이 있으면 정상 애니메이션으로 이어서 처리
      const pendingDirection = pendingDirectionRef.current;
      if (pendingDirection) {
        pendingDirectionRef.current = null;
        setCurrentIndex((previousIndex) =>
          pendingDirection === "next" ? previousIndex + 1 : previousIndex - 1,
        );
      }
    });

    return () => cancelAnimationFrame(frameId);
  }, [isResetting]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) return;

    const firstCard = track.children[0];
    const secondCard = track.children[1];

    if (!firstCard || !secondCard) return;

    function measureSlider() {
      // offsetWidth: 가운데 카드를 강조하는 CSS transform(scale)의 영향을 받지 않는
      // 레이아웃 상의(변형 전) 너비를 가져오기 위해 getBoundingClientRect 대신 사용
      const cardWidth = firstCard.offsetWidth;
      const gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;

      const visibleWidth =
        cardWidth * ITEMS_PER_PAGE + gap * (ITEMS_PER_PAGE - 1);

      setSliderSize({
        step: cardWidth + gap,
        sideSpace: (viewport.clientWidth - visibleWidth) / 2,
      });
    }

    measureSlider();

    const observer = new ResizeObserver(measureSlider); // 요소 크기가 달라지면 재측정

    observer.observe(viewport);
    observer.observe(firstCard);

    return () => observer.disconnect();
  }, [items.length]); // 서버 상품이 도착해서 카드가 생겼을 때도 측정

  // 데이터 로딩 전에 슬라이더가 오류없이 불러와지게 설정
  if (items.length === 0) {
    return (
      <ProductsSection isBest={isBest}>
        <ProductTitle>{title}</ProductTitle>
        <p>표시할 상품이 없습니다.</p>
      </ProductsSection>
    );
  }

  const sliderProducts = [
    items[items.length - 1],
    ...items,
    items[0],
    items[1 % items.length],
    items[2 % items.length],
  ];

  // 현재 가운데(활성)에 와 있는 상품이 실제 상품 목록에서 몇 번째인지
  const activeItemIndex = currentIndex % items.length;

  // Page Indicator - 상품 개수만큼 점을 하나씩 생성
  const pageNumbers = [];

  for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
    pageNumbers.push(itemIndex);
  }

  // handlePrevious(): 제품 카드의 이전 페이지로 이동하는 함수
  function handlePrevious() {
    if (items.length <= 1) return;

    setDirection(-1);

    if (isResetting) {
      pendingDirectionRef.current = "previous";
      return;
    }

    // 끝(경계)에 도달하는 애니메이션이 아직 안 끝났는데 또 눌렀다면, 지금 애니메이션을
    // 도중에 끊어서 튀어 보이게 하지 않고, 리셋이 끝난 직후 자연스럽게 이어서 한 칸 더 이동되도록 예약만 해둔다
    if (currentIndex <= 0) {
      pendingDirectionRef.current = "previous";
      setIsResetting(true);
      setCurrentIndex(items.length);
      return;
    }

    setCurrentIndex((previousIndex) => previousIndex - 1);
  }

  // handleNext(): 제품 카드의 다음 페이지로 이동하는 함수
  function handleNext() {
    if (items.length <= 1) return;

    setDirection(1);

    if (isResetting) {
      pendingDirectionRef.current = "next";
      return;
    }

    // 끝(경계)에 도달하는 애니메이션이 아직 안 끝났는데 또 눌렀다면, 지금 애니메이션을
    // 도중에 끊어서 튀어 보이게 하지 않고, 리셋이 끝난 직후 자연스럽게 이어서 한 칸 더 이동되도록 예약만 해둔다
    if (currentIndex >= items.length + 1) {
      pendingDirectionRef.current = "next";
      setIsResetting(true);
      setCurrentIndex(1);
      return;
    }

    setCurrentIndex((previousIndex) => previousIndex + 1);
  }

  // handleAnimationComplete(): 애니메이션 완료 함수
  function handleAnimationComplete() {
    if (currentIndex === 0) {
      setIsResetting(true);
      setCurrentIndex(items.length);
    }

    if (currentIndex === items.length + 1) {
      setIsResetting(true);
      setCurrentIndex(1);
    }
  }

  return (
    <ProductsSection isBest={isBest}>
      <ProductTitle>{title}</ProductTitle>

      <ProductSlider>
        <SliderButton
          type="button"
          onClick={handlePrevious}
          aria-label={`${title} 이전 상품`}
        >
          <ChevronLeftIcon width={24} height={24} />
        </SliderButton>

        <SliderViewport ref={viewportRef}>
          <SliderTrack
            ref={trackRef}
            initial={false}
            animate={{
              x: sliderSize.sideSpace - currentIndex * sliderSize.step,
            }}
            transition={isResetting ? { duration: 0 } : SLIDE_SPRING}
            onAnimationComplete={handleAnimationComplete}
          >
            {sliderProducts.map((product, index) => {
              const badgeFields = deriveBadgeFields(product);
              // 3칸짜리 보이는 창(currentIndex, currentIndex+1, currentIndex+2) 중
              // 가운데(currentIndex+1)에 오는 카드가 시각적으로도 중앙에 위치함
              const isActive = index === currentIndex + 1;

              const isVisible =
                index >= currentIndex && index <= currentIndex + 2;

              return (
                <SlideItem
                  key={`${product.id}-${index}`}
                  initial={false}
                  animate={{
                    scale: isActive ? 1.0 : 0.88,
                    opacity: isActive ? 1 : 0.6,
                  }}
                  transition={isResetting ? { duration: 0 } : SLIDE_SPRING}
                  style={{ zIndex: isActive ? 2 : 1 }}
                >
                  {/* inert: 비활성 카드는 오버레이가 마우스 클릭은 막아주지만, 키보드
                      Tab 이동은 z-index(시각적 가림)와 무관하게 DOM 순서를 그대로 따라가서
                      가려진 카드 내부의 이미지/이름/찜/담기 버튼에 그대로 포커스가 가고
                      Enter로 실행까지 돼버리는 문제가 있었다. inert로 이 안쪽 전체를
                      포커스/클릭 대상에서 완전히 제외해 마우스·키보드 동작을 일치시킴 */}
                  <div inert={!isActive}>
                    <ProductCard
                      product={{
                        ...product,
                        categoryName: getCategoryName(product.categoryId),
                        ...badgeFields,
                      }}
                      showCategory
                      isBest={badgeFields.isBest}
                      isNew={badgeFields.isNew}
                      background={isBest ? theme.colors.background : undefined}
                      onAddToCart={onAddToCart}
                      imagePriority={isVisible} //
                    />
                  </div>
                  {!isActive &&
                    (() => {
                      // 화면엔 항상 currentIndex(왼쪽)/currentIndex+1(가운데)/
                      // currentIndex+2(오른쪽) 3장만 보이므로, 왼쪽 카드를 누르면
                      // "이전" 한 칸, 오른쪽 카드를 누르면 "다음" 한 칸과 정확히 같다
                      const isLeftNeighbor = index === currentIndex;
                      const isRightNeighbor = index === currentIndex + 2;
                      if (!isLeftNeighbor && !isRightNeighbor) {
                        // 화면에 보이지 않는(클립된) 여분의 카드는 그대로 클릭 차단만
                        return <SlideOverlay />;
                      }
                      const goToThisCard = isLeftNeighbor
                        ? handlePrevious
                        : handleNext;
                      return (
                        <SlideOverlay
                          role="button"
                          tabIndex={0}
                          style={{ cursor: "pointer" }}
                          aria-label={
                            isLeftNeighbor
                              ? `${product.name} - 이전 상품으로 이동`
                              : `${product.name} - 다음 상품으로 이동`
                          }
                          onClick={goToThisCard}
                          onKeyDown={(event) => {
                            if (event.key !== "Enter" && event.key !== " ") {
                              return;
                            }
                            event.preventDefault();
                            goToThisCard();
                          }}
                        />
                      );
                    })()}
                </SlideItem>
              );
            })}
          </SliderTrack>
        </SliderViewport>

        <SliderButton
          type="button"
          onClick={handleNext}
          aria-label={`${title} 다음 상품`}
        >
          <ChevronRightIcon width={24} height={24} />
        </SliderButton>
      </ProductSlider>

      <PageIndicator>
        {pageNumbers.map((itemIndex) => (
          <IndicatorButton
            key={itemIndex}
            type="button"
            aria-label={`${title} ${itemIndex + 1}번째 상품`}
            aria-current={itemIndex === activeItemIndex ? "page" : undefined}
            onClick={() => {
              // itemIndex번째 상품이 가운데로 오도록. 0번째는 currentIndex=0(경계용 임시 상태)이
              // 아니라 items.length로 매핑해야 정상 범위(1~items.length) 안에서 같은 상품을 가리킴
              const nextIndex = itemIndex === 0 ? items.length : itemIndex;

              setDirection(nextIndex >= currentIndex ? 1 : -1);

              setCurrentIndex(nextIndex);
            }}
          />
        ))}
      </PageIndicator>
    </ProductsSection>
  );
}

// mobile
function MobileProductGroup({ title, items, isBest = false, onAddToCart }) {
  const theme = useTheme();

  const [visibleCount, setVisibleCount] = useState(() => {
    return mobileVisibleCounts.get(title) ?? 2;
  });

  useEffect(() => {
    mobileVisibleCounts.set(title, visibleCount);
  }, [title, visibleCount]);
  const visibleProducts = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <ProductsSection isBest={isBest}>
      <ProductTitle>{title}</ProductTitle>

      {items.length === 0 ? (
        <p>표시할 상품이 없습니다.</p>
      ) : (
        <>
          <MobileProductGrid>
            {visibleProducts.map((product) => {
              const badgeFields = deriveBadgeFields(product);

              return (
                <MobileCardSlot key={product.id}>
                  <ProductCard
                    product={{
                      ...product,
                      categoryName: getCategoryName(product.categoryId),
                      ...badgeFields,
                    }}
                    showCategory
                    isBest={badgeFields.isBest}
                    isNew={badgeFields.isNew}
                    background={isBest ? theme.colors.background : undefined}
                    onAddToCart={onAddToCart}
                  />
                </MobileCardSlot>
              );
            })}
          </MobileProductGrid>

          {hasMore && (
            <MobileMoreButton
              type="button"
              aria-label={`${title} 상품 더 보기`}
              title={`${title} 상품 더 보기`}
              onClick={() => {
                setVisibleCount((count) => Math.min(count + 2, items.length));
              }}
            >
              <span aria-hidden="true">+</span>
            </MobileMoreButton>
          )}
        </>
      )}
    </ProductsSection>
  );
}

function ProductGroup({ title, items, isBest = false, onAddToCart }) {
  const theme = useTheme();
  const mobileQuery = theme.media.mobile.replace("@media", "").trim();

  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(mobileQuery).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(mobileQuery);

    setIsMobile(mediaQuery.matches);

    function handleChange(event) {
      setIsMobile(event.matches);
    }

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [mobileQuery]);

  if (isMobile) {
    return (
      <MobileProductGroup
        title={title}
        items={items}
        isBest={isBest}
        onAddToCart={onAddToCart}
      />
    );
  }

  return (
    <DesktopProductGroup
      title={title}
      items={items}
      isBest={isBest}
      onAddToCart={onAddToCart}
    />
  );
}

function ProductSection({ onInitialLoadComplete }) {
  const [bestProducts, setBestProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);

  const cartItems = useCartStore((s) => s.cartItems);
  const addToCart = useCartStore((s) => s.addToCart);
  const removeItem = useCartStore((s) => s.removeItem);

  // 서버 API 호출 및 상태 업데이트
  useEffect(() => {
    let alive = true;
    // 이미지 미리 로딩 중 페이지를 떠나도(unmount) 전역 로딩 카운트가 남지 않도록,
    // 자연 완료/언마운트 둘 중 먼저 오는 시점에 한 번만 endLoading을 호출한다

    const fetchMainProducts = async () => {
      try {
        const [bestResult, newResult] = await Promise.all([
          getProducts({
            isBest: true,
            soldOut: false,
            page: 1,
            limit: 12,
          }),

          getProducts({
            isNew: true,
            soldOut: false,
            page: 1,
            limit: 12,
          }),
        ]);

        const bestItems = bestResult.products || [];
        const newItems = newResult.products || [];

        if (!alive) return;

        setBestProducts(bestItems);
        setNewProducts(newItems);
      } catch (error) {
        console.error("상품 데이터 조회 실패", error);
      } finally {
        if (alive) {
          onInitialLoadComplete?.(true);
        }
      }
    };

    fetchMainProducts();

    return () => {
      alive = false;
    };
  }, [onInitialLoadComplete]);

  // 서버 데이터 기준으로 카트 추가
  const handleAddToCart = async (productId) => {
    const allLoadedProducts = [...bestProducts, ...newProducts];
    const product = allLoadedProducts.find((p) => p.id === productId);

    if (!product) return;

    try {
      // 장바구니에 해당 상품이 이미 있는지 검사
      const existingItem = cartItems.find(
        (item) => item.productId === product.id,
      );

      if (existingItem) {
        // 이미 담겨있으면 삭제
        await removeItem(existingItem.cartItemId);
        showSuccessToast("장바구니에서 삭제했습니다.");
      } else {
        // 안 담겨있으면 추가
        await addToCart({
          productId: product.id,
          name: product.name,
          price: product.discountPrice || product.price,
          imageUrl: product.imageUrl,
          isSoldOut: product.soldOut,
        });
        showSuccessToast("장바구니에 담았습니다.");
      }
    } catch (err) {
      console.error("장바구니 업데이트 실패:", err);
      showFailToast("장바구니 처리에 실패했습니다.");
    }
  };

  return (
    <>
      <ProductGroup
        title="Best Items"
        items={bestProducts}
        isBest
        onAddToCart={handleAddToCart}
      />
      <ProductGroup
        title="New Items"
        items={newProducts}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}

export { ProductSection };

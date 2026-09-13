import {
  ProductsSection,
  ProductTitle,
  ProductSlider,
  SliderButton,
  PageIndicator,
  IndicatorButton,
  SliderViewport,
  SliderTrack,
} from "../../styles/MainStyles/ProductSection.styles";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons/Icons";
import ProductCard from "../product/ProductCard";
import categories from "../../data/categories";
import { getProducts, deriveBadgeFields } from "../../api/productsApi";
import useLoadingStore from "../../store/UseLoadingStore";
import { preloadingImages } from "../../utils/preloadingImages";
import { useState, useEffect, useRef } from "react";
import useCartStore from "../../store/cartStore";
import { showSuccessToast, showFailToast } from "../common/ShowToast";

// 페이지별 상품 표시 개수
const ITEMS_PER_PAGE = 3;

// getCategoryname(): 카테고리 이름을 찾는 함수, 일치하는 categoryId를 찾으면 category name을 반환하고 찾지 못하면 categoryId를 반환함
function getCategoryName(categoryId) {
  const category = categories.find((item) => item.id === categoryId);
  return category?.name ?? categoryId;
}

function ProductGroup({ title, items, isBest = false, onAddToCart }) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [, setDirection] = useState(1);
  const [isResetting, setIsResetting] = useState(false);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  const [sliderSize, setSliderSize] = useState({
    step: 0, // 카드 한 장 이동 거리(카드 너비 + 간격)
    sideSpace: 0, // 카드를 가운데 두기 위한 왼쪽 여백
  })

  useEffect(() => {
    if (!isResetting) return;

    const frameId = requestAnimationFrame(() => {
      setIsResetting(false);
    });

    return () => cancelAnimationFrame(frameId);
  }, [isResetting]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if(!viewport || !track) return;

    const firstCard = track.children[0];
    const secondCard = track.children[1];

    if(!firstCard || !secondCard) return;

    function measureSlider() {
      const cardWidth = firstCard.getBoundingClientRect().width;
      const gap = parseFloat(window.getComputedStyle(track).columGap) || 0;

      const visibleWidth = cardWidth * ITEMS_PER_PAGE + gap * (ITEMS_PER_PAGE  - 1);

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

  // 제품 개수를 3으로 나누면 페이지 수가 나옴
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const actualIndex = (currentIndex - 1 + items.length) % items.length;
  const activePage = Math.floor(actualIndex / ITEMS_PER_PAGE);

  // Page Indicator
  const pageNumbers = [];

  for (let page = 0; page < totalPages; page++) {
    pageNumbers.push(page);
  }

  // handlePrevious(): 제품 카드의 이전 페이지로 이동하는 함수
  function handlePrevious() {
    if (items.length <= 1) return;

    setDirection(-1);

    setCurrentIndex((previousIndex) => {
      if (previousIndex <= 0) {
        return previousIndex;
      }
      return previousIndex - 1;
    });
  }

  // handleNext(): 제품 카드의 다음 페이지로 이동하는 함수
  function handleNext() {
    if (items.length <= 1) return;

    setDirection(1);

    setCurrentIndex((previousIndex) => {
      if (previousIndex >= items.length + 1) {
        return previousIndex;
      }
      return previousIndex + 1;
    });
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
          style={{
            left: 0,
            transform: "translate(-50%, -50%)",
          }}
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
            transition={
              isResetting
                ? { duration: 0 }
                : {
                    type: "spring",
                    stiffness: 300,
                    damping: 70,
                    mass: 0.4,
                  }
            }
            onAnimationComplete={handleAnimationComplete}
          >
            {sliderProducts.map((product, index) => {
              const badgeFields = deriveBadgeFields(product);
              return (
                <ProductCard
                  key={`${product.id}-${index}`}
                  product={{
                    ...product,
                    categoryName: getCategoryName(product.categoryId),
                    ...badgeFields,
                  }}
                  showCategory
                  isBest={badgeFields.isBest}
                  isNew={badgeFields.isNew}
                  onAddToCart={onAddToCart}
                />
              );
            })}
          </SliderTrack>
        </SliderViewport>

        <SliderButton
          type="button"
          onClick={handleNext}
          aria-label={`${title} 다음 상품`}
          style={{
            right: 0,
            transform: "translate(50%, -50%)",
          }}
        >
          <ChevronRightIcon width={24} height={24} />
        </SliderButton>
      </ProductSlider>

      <PageIndicator>
        {pageNumbers.map((pageIndex) => (
          <IndicatorButton
            key={pageIndex}
            type="button"
            aria-label={`${title} ${pageIndex + 1}페이지`}
            aria-current={pageIndex === activePage ? "page" : undefined}
            onClick={() => {
              const nextIndex = pageIndex * ITEMS_PER_PAGE + 1;

              setDirection(nextIndex > currentIndex ? 1 : -1);

              setCurrentIndex(nextIndex);
            }}
          />
        ))}
      </PageIndicator>
    </ProductsSection>
  );
}

function ProductSection() {
  const [bestProducts, setBestProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);

  const addToCart = useCartStore((s) => s.addToCart);

  const startLoading = useLoadingStore((state) => state.startLoading);
  const endLoading = useLoadingStore((state) => state.endLoading);

  // 서버 API 호출 및 상태 업데이트
  useEffect(() => {
    let alive = true;
    // 이미지 미리 로딩 중 페이지를 떠나도(unmount) 전역 로딩 카운트가 남지 않도록,
    // 자연 완료/언마운트 둘 중 먼저 오는 시점에 한 번만 endLoading을 호출한다
    let loadingEnded = false;
    const finishLoading = () => {
      if (loadingEnded) return;
      loadingEnded = true;
      endLoading();
    };

    async function fetchMainProducts() {
      startLoading();

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

        const imageUrls = [...bestItems, ...newItems].map(
          (product) => product.imageUrl,
        );

        await preloadingImages(imageUrls);

        if (!alive) return;

        setBestProducts(bestItems);
        setNewProducts(newItems);
      } catch (error) {
        console.error("상품 데이터 조회 실패", error);
      } finally {
        finishLoading();
      }
    }

    fetchMainProducts();

    return () => {
      alive = false;
      finishLoading();
    };
  }, [startLoading, endLoading]);

  // 서버 데이터 기준으로 카트 추가
  const handleAddToCart = async (productId) => {
    const allLoadedProducts = [...bestProducts, ...newProducts];
    const product = allLoadedProducts.find((p) => p.id === productId);

    if (!product) return;

    try {
      await addToCart({
        productId: product.id,
        name: product.name,
        price: product.discountPrice || product.price,
        imageUrl: product.imageUrl,
        isSoldOut: product.soldOut,
      });
      showSuccessToast("장바구니에 담겼습니다");
    } catch (err) {
      console.error("장바구니 담기 실패:", err);
      showFailToast("장바구니 담기에 실패했습니다");
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

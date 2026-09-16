import { useState, useEffect } from "react";
import {
  CurationSection,
  CurationTitleBox,
  CurationSubtitle,
  CurationTitle,
  CurationTitle2,
  MoodKeywordBox,
  MoodKeywordText,
  KeywordChipContainer,
  KeywordButton,
  ClickableProductMap,
  KeywordDropdown,
  KeywordTrigger,
  KeywordMenu,
  KeywordMenuButton,
  CurationInner,
} from "../../styles/MainStyles/DeskCurationSection.styles";
import { getProductRaw } from "../../api/productsApi";
import categories from "../../data/categories";
import { preloadingImages } from "../../utils/preloadingImages";
import { toResizedImageUrl } from "../../utils/imageProxy";
import {
  SelectedProductCard,
  PRODUCT_SHOWCASE_WIDTH,
} from "./SelectedProductCard";
import { DeskProductMap, DESK_IMAGE_WIDTH } from "./DeskProductMap";
import { ChevronDownIcon } from "../icons/Icons";

// 스타일 키워드 데이터(main.js)에 한글 이름이 없어서, 호버 텍스트용으로만 따로 매핑
const STYLE_NAME_KO = {
  minimal: "미니멀",
  natural: "내추럴",
  hip: "힙",
  metallic: "메탈릭",
  vintage: "빈티지",
  cozy: "코지",
  pastel: "파스텔",
};

function DeskCurationSection({ items = [] }) {
  // 어느 페이지에 있었든 홈으로 돌아오면 항상 첫 번째 스타일/상품부터 보이도록,
  // 이전 선택을 기억하지 않고 null(= 첫 번째 스타일)로 시작한다
  const [selectedStyleId, setSelectedStyleId] = useState(null);
  const [selectedProductNumber, setSelectedProductNumber] = useState(null);
  // 서버에서 받은 상품을 저장할 상태
  const [productData, setProductData] = useState(null);
  // 로딩, 오류 상태
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [productError, setProductError] = useState("");
  const [isKeywordOpen, setIsKeywordOpen] = useState(false);

  // 아무것도 선택되지 않았을 때 첫 번째 키워드를 자동으로 선택(1, Minimal)
  const activeStyleId = selectedStyleId ?? items[0]?.styleId;
  const selectedStyle =
    items.find((item) => item.styleId === activeStyleId) ?? items[0];

  const activeProductNumber =
    selectedStyle?.coordinate?.find(
      (item) => item.productId === selectedProductNumber,
    )?.productId ?? selectedStyle?.coordinate?.[0]?.productId;
  const selectedProduct =
    productData?.id === activeProductNumber ? productData : null;
  const selectedCategory = categories.find(
    (category) => category.id === selectedProduct?.categoryId,
  );
  // selectedStyle에 coordinate가 있으면 가져오고 undefined이거나 null 이면 빈 배열을 반환함
  const coordinates = selectedStyle?.coordinate ?? [];
  // 현재 상품 순서 계산
  const activeProductIndex = coordinates.findIndex(
    (item) => item.productId === activeProductNumber,
  );

  // 큐레이션 상품 정보 연결
  useEffect(() => {
    if (activeProductNumber == null) {
      setIsProductLoading(false);
      setProductError("");
      return;
    }

    //if (productData?.id === activeProductNumber) return;

    let ignore = false;

    const fetchSelectedProduct = async () => {
      setIsProductLoading(true);
      setProductError("");

      try {
        const product = await getProductRaw(activeProductNumber);

        await preloadingImages([
          toResizedImageUrl(product.imageUrl, PRODUCT_SHOWCASE_WIDTH),
        ]);

        if (!ignore) {
          setProductData(product);
        }
      } catch (error) {
        if (!ignore) {
          setProductData(null);
          setProductError("상품 정보를 불러오지 못했습니다.");
          console.error("큐레이션 상품 조회 실패:", error);
        }
      } finally {
        if (!ignore) {
          setIsProductLoading(false);
        }
      }
    };
    fetchSelectedProduct();

    return () => {
      ignore = true;
    };
  }, [activeProductNumber]);

  // 화면이 처음 열릴 때 imageUrl을 미리 저장
  useEffect(() => {
    /*items.forEach((item) => {
      const image = new Image();
      image.src = item.imageUrl;
    });*/
    const imageUrls = items.map((item) =>
      toResizedImageUrl(item.imageUrl, DESK_IMAGE_WIDTH),
    );

    preloadingImages(imageUrls);
  }, [items]);

  const handleStyleChange = async (item) => {
    const firstProductId = item.coordinate?.[0]?.productId;

    if (firstProductId == null) return;

    try {
      setIsProductLoading(true);

      const [, product] = await Promise.all([
        preloadingImages([toResizedImageUrl(item.imageUrl, DESK_IMAGE_WIDTH)]),
        getProductRaw(firstProductId),
      ]);

      await preloadingImages([
        toResizedImageUrl(product.imageUrl, PRODUCT_SHOWCASE_WIDTH),
      ]);

      setProductData(product);
      setSelectedStyleId(item.styleId);
      setSelectedProductNumber(firstProductId);

      setProductError("");
    } catch (error) {
      setProductError("상품 정보를 불러오지 못했습니다.");
      console.error("큐레이션 스타일 변경 실패:", error);
    } finally {
      setIsProductLoading(false);
    }
  };

  // handlePreviousProduct(): 이전 상품 정보를 불러오는 함수
  const handlePreviousProduct = () => {
    if (coordinates.length <= 1) return;

    const previousIndex =
      activeProductIndex === 0
        ? coordinates.length - 1
        : activeProductIndex - 1;

    setSelectedProductNumber(coordinates[previousIndex].productId);
  };

  // handleNextProduct(): 다음 상품 정보를 불러오는 함수
  const handleNextProduct = () => {
    if (coordinates.length <= 1) return;

    const nextIndex = (activeProductIndex + 1) % coordinates.length;

    setSelectedProductNumber(coordinates[nextIndex].productId);
  };

  return (
    <CurationSection>
      <CurationInner>

      <CurationTitleBox>
        <CurationSubtitle>
          <strong>데스크 테리어,</strong>
          <br />
          어떻게 시작해야 할지 모르겠다면
        </CurationSubtitle>
        <CurationTitle>내 데스크 취향부터 찾아보세요</CurationTitle>
      </CurationTitleBox>

      <MoodKeywordBox>
        <MoodKeywordText>
          둘러보고 싶은 스타일 키워드를 선택해 보세요
        </MoodKeywordText>
        <KeywordChipContainer>
          {/* main.js에서 keyword의 name을 가져옴 */}
          {items.map((item) => (
            <KeywordButton
              key={item.styleId}
              type="button"
              isSelected={item.styleId === activeStyleId}
              aria-pressed={item.styleId === activeStyleId}
              title={STYLE_NAME_KO[item.styleId]}
              onClick={() => {
                handleStyleChange(item);
              }}
            >
              {item.name}
            </KeywordButton>
          ))}
        </KeywordChipContainer>

        <KeywordDropdown
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsKeywordOpen(false);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setIsKeywordOpen(false);
              event.currentTarget.querySelector("button")?.focus();
            }
          }}
        >
          <KeywordTrigger
            type="button"
            aria-label="데스크 스타일 선택"
            aria-expanded={isKeywordOpen}
            title="데스크 스타일 선택"
            onClick={() => {
              setIsKeywordOpen((previous) => !previous);
            }}
          >
            <strong>{selectedStyle?.name ?? "스타일 선택"}</strong>
          <ChevronDownIcon width={14} height={14} />
          </KeywordTrigger>

          {isKeywordOpen && (
            <KeywordMenu>
              {items.map((item) => (
                <li key={item.styleId}>
                  <KeywordMenuButton
                    type="button"
                    aria-pressed={item.styleId === activeStyleId}
                    title={STYLE_NAME_KO[item.styleId]}
                    onClick={(event) => {
                      handleStyleChange(item);
                      setIsKeywordOpen(false);

                      event.currentTarget
                        .closest("[data-keyword-dropdown]")
                        ?.querySelector("button")
                        ?.focus();
                    }}
                  >
                    {item.name}
                  </KeywordMenuButton>
                </li>
              ))}
            </KeywordMenu>
          )}
        </KeywordDropdown>      
      </MoodKeywordBox>

      <CurationTitle2>What's on this desk?</CurationTitle2>

      <ClickableProductMap>
        <DeskProductMap
          selectedStyle={selectedStyle}
          activeProductNumber={activeProductNumber}
          onProductSelect={setSelectedProductNumber}
        />

        <SelectedProductCard
          selectedProduct={selectedProduct}
          selectedCategory={selectedCategory}
          selectedStyleName={selectedStyle?.name}
          activeProductIndex={activeProductIndex}
          totalProducts={coordinates.length}
          isProductLoading={isProductLoading}
          productError={productError}
          onPrevious={handlePreviousProduct}
          onNext={handleNextProduct}
        />
      </ClickableProductMap>

      </CurationInner>
    </CurationSection>
  );
}

export { DeskCurationSection };

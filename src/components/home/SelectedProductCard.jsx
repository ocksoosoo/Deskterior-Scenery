import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons/Icons";
import {
  ProductArea,
  ProductLoading,
  ProductTitleBox,
  ProductTitle,
  ProductNumber,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductPrice,
  ProductDescription,
  ProductTagContainer,
  ProductTag,
  ViewMoreButton,
  ProductPagination,
  PaginationButton,
  PaginationText,
  ProductBottomArea,
  ProductContent,
} from "../../styles/MainStyles/DeskCurationSection.styles";
import { toResizedImageUrl } from "../../utils/imageProxy";

// 이 카드에서 상품 이미지가 차지하는 실제 표시 폭보다 넉넉하게 - DeskCurationSection.jsx의
// 미리 불러오기(preload)도 이 값을 그대로 써서 실제 <img>와 같은 주소를 미리 받아두게 한다
export const PRODUCT_SHOWCASE_WIDTH = 600;

function SelectedProductCard({
  selectedProduct,
  selectedCategory,
  selectedStyleName,
  activeProductIndex,
  totalProducts,
  onPrevious,
  onNext,
  isProductLoading,
  productError,
}) {
  const navigate = useNavigate();
  // handleViewMore(): 상세 페이지 이동 함수
  function handleViewMore() {
    if (!selectedProduct?.id) return;
    navigate(`/products/${selectedProduct.id}`);
  }

  return (
    <ProductArea>
      {isProductLoading ? (
        <ProductLoading>
          <FadeLoader />
          <span>상품을 불러오는 중...</span>
          </ProductLoading>
      ) : productError ? (
        <ProductLoading>{productError}</ProductLoading>
      ) : (
        selectedProduct && (
          <>
            <ProductTitleBox>
              <ProductNumber>
                {String(activeProductIndex + 1).padStart(2, "0")}
              </ProductNumber>

              <ProductTitle>Selected Product</ProductTitle>
            </ProductTitleBox>

            <ProductContent>
              <ProductImage
                src={toResizedImageUrl(
                  selectedProduct.imageUrl,
                  PRODUCT_SHOWCASE_WIDTH,
                )}
                alt={selectedProduct.name}
              />

              <ProductInfo>
                <ProductName>{selectedProduct.name}</ProductName>

                <ProductPrice>
                  ₩ {selectedProduct.price.toLocaleString()}
                </ProductPrice>

                <ProductDescription>
                  {selectedProduct.description}
                </ProductDescription>

                <ProductTagContainer>
                  {selectedCategory && (
                    <ProductTag>{selectedCategory.name}</ProductTag>
                  )}

                  <ProductTag>{selectedStyleName}</ProductTag>
                </ProductTagContainer>
              </ProductInfo>
            </ProductContent>

            <ProductBottomArea>
              <ViewMoreButton
                type="button"
                title="상세 보기"
                onClick={handleViewMore}
              >
                View More
              </ViewMoreButton>

              <ProductPagination>
                <PaginationButton
                  type="button"
                  onClick={onPrevious}
                  aria-label="이전 상품"
                >
                  <ChevronLeftIcon width={24} height={24} />
                </PaginationButton>

                <PaginationText>
                  {String(activeProductIndex + 1).padStart(2, "0")}
                  {" / "}
                  {String(totalProducts).padStart(2, "0")}
                </PaginationText>

                <PaginationButton
                  type="button"
                  onClick={onNext}
                  aria-label="다음 상품"
                >
                  <ChevronRightIcon width={24} height={24} />
                </PaginationButton>
              </ProductPagination>
            </ProductBottomArea>
          </>
        )
      )}
    </ProductArea>
  );
}

export { SelectedProductCard };

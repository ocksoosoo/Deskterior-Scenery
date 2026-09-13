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
        <ProductLoading>상품을 불러오는 중...</ProductLoading>
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
                src={selectedProduct.imageUrl}
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
              <ViewMoreButton type="button" onClick={handleViewMore}>
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

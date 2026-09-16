import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { toast } from "react-toastify";
import SuccessToast from "../../components/common/SuccessToast";
import FailToast from "../../components/common/FailToast";
import { getProducts } from "../../api/productsApi";
import ProductCard from "../product/ProductCard";
import useCartStore from "../../store/cartStore";
import useProductCatalogStore from "../../store/productCatalogStore";
import {
  RecommendContainer,
  SectionTitle,
  GridContainer,
} from "../../styles/CartStyles/RecommendItems.styles";

const RecommendItems = () => {
  const theme = useTheme();
  const [recommendList, setRecommendList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const addToCart = useCartStore((s) => s.addToCart);
  const cartItems = useCartStore((s) => s.cartItems);
  const fetchCatalog = useProductCatalogStore((s) => s.fetchCatalog);

  useEffect(() => {
    const fetchRecommend = async () => {
      try {
        setIsLoading(true);

        // 상품과 뱃지
        const [data, catalogById] = await Promise.all([
          getProducts({ limit: 50 }),
          fetchCatalog(),
        ]);

        const rawProducts = Array.isArray(data) ? data : data.products || [];

        // 뱃지(isBest, isNew, soldOut) 부여
        const productsWithBadges = rawProducts.map((item) => {
          const catalogProduct = catalogById[item.id] || {};
          return {
            ...catalogProduct,
            ...item,
            isBest: catalogProduct.isBest ?? false,
            isNew: catalogProduct.isNew ?? false,
            soldOut: catalogProduct.soldOut ?? false,
          };
        });

        // 장바구니 상품들의 ID 배열 만들기
        const cartProductIds = cartItems.map((item) => item.productId);

        // 품절 제외 + 장바구니에 담긴 상품 제외
        const availableProducts = productsWithBadges.filter(
          (item) => !item.soldOut && !cartProductIds.includes(item.id),
        );

        // 랜덤하게 섞기
        const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());

        // 3개 저장
        setRecommendList(shuffled.slice(0, 3));
      } catch (error) {
        console.error("추천 상품을 불러오는 데 실패했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommend();
  }, []); //예외처리

  // 장바구니 담는 함수
  const handleAddToCart = async (product) => {
    try {
      const cartProduct = {
        ...product,
        productId: product.id,
        imageUrl: product.images?.[0] || product.imageUrl,
      };

      // 스토어의 addToCart 호출 (기본 수량 1개)
      await addToCart(cartProduct, 1);
      toast(<SuccessToast message="장바구니에 담았습니다." />);
    } catch (error) {
      toast(<FailToast message="장바구니 담기에 실패했습니다." />);
    }
  };

  // 예외처리
  if (isLoading || recommendList.length === 0) return null;

  return (
    <RecommendContainer>
      <SectionTitle>Explore Recommend Items</SectionTitle>

      <GridContainer>
        {recommendList.map((product) => (
          <ProductCard
            key={product.id || product.productId}
            product={product}
            isBest={product.isBest}
            isNew={product.isNew}
            showCategory={false}
            background={theme.colors.background}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </GridContainer>
    </RecommendContainer>
  );
};

export default RecommendItems;

import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { toast } from "react-toastify";
import SuccessToast from "../../components/common/SuccessToast";
import FailToast from "../../components/common/FailToast";
import { getProducts } from "../../api/productsApi";
import ProductCard from "../product/ProductCard";
import useCartStore from "../../store/cartStore";
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

  useEffect(() => {
    const fetchRecommend = async () => {
      try {
        setIsLoading(true);
        // 전체 상품 리스트
        const data = await getProducts();
        const products = Array.isArray(data) ? data : data.products || [];

        // 품절 상품 제외
        const availableProducts = products.filter((item) => !item.soldOut);

        // 랜덤
        const shuffled = [...availableProducts].sort(() => 0.5 - Math.random());

        //3개만 저장
        setRecommendList(shuffled.slice(0, 3));
      } catch (error) {
        console.error("추천 상품을 불러오는 데 실패했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommend();
  }, []);

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

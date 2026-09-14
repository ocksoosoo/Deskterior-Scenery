import { CategoriesSection } from "../../components/home/CategoriesSection";
import { HeroSection } from "../../components/home/HeroSection";
import { DeskCurationSection } from "../../components/home/DeskCurationSection";
import { ProductSection } from "../../components/home/ProductSection";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getMain } from "../../api/mainApi";
import useLoadingStore from "../../store/UseLoadingStore";
import useCategoriesStore from "../../store/categoriesStore";
//import { preloadingImages } from "../../utils/preloadingImages";

export default function HomePage() {
  const location = useLocation();
  const finishPageLoading = useLoadingStore((state) => state.finishPageLoading);

  const [mainImages, setMainImages] = useState([]);

  const categoryItems = mainImages.filter((item) => item.categoryId);

  const styleItems = mainImages.filter((item) => item.styleId);

  // 스토어가 앱 전체에서 딱 한 번만 요청/캐시하므로, 다른 페이지에서 이미
  // 불러왔다면 여기선 다시 요청하지 않고 캐시된 값을 그대로 씀
  const categories = useCategoriesStore((state) => state.categories) ?? [];
  const fetchCategories = useCategoriesStore((state) => state.fetchCategories);

  const [homeReady, setHomeReady] = useState(false);

  const [productsReady, setProductsReady] = useState(false);

  useEffect(() => {
    let alive = true;

    const fetchHomeData = async () => {
      try {
        const [mainResponse] = await Promise.all([
          getMain(),
          fetchCategories(),
        ]);

        const images = mainResponse.data.images;

        //await preloadingImages(images.map((item) => item.imageUrl));

        if (!alive) return;

        setMainImages(images);
      } catch (error) {
        console.error("홈 데이터 로딩 실패:", error);
      } finally {
        if (alive) {
          setHomeReady(true);
        }
      }
    };

    fetchHomeData();

    return () => {
      alive = false;
    };
  }, [fetchCategories]);

  useEffect(() => {
    if (!homeReady || !productsReady) {
      return;
    }

    finishPageLoading(location.pathname);
  }, [homeReady, productsReady, location.pathname, finishPageLoading]);

  return (
    <>
      <main>
        <HeroSection />
        <CategoriesSection items={categoryItems} categories={categories} />
        <DeskCurationSection items={styleItems} />
        <ProductSection onInitialLoadComplete={setProductsReady} />
      </main>
    </>
  );
}

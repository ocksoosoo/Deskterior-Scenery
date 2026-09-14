import { CategoriesSection } from "../../components/home/CategoriesSection";
import { HeroSection } from "../../components/home/HeroSection";
import { DeskCurationSection } from "../../components/home/DeskCurationSection";
import { ProductSection } from "../../components/home/ProductSection";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getCategories } from "../../api/categoriesApi";
import { getMain } from "../../api/mainApi";
import useLoadingStore from "../../store/UseLoadingStore";
//import { preloadingImages } from "../../utils/preloadingImages";

export default function HomePage() {
  const location = useLocation();
  const finishPageLoading = useLoadingStore((state) => state.finishPageLoading);

  const [mainImages, setMainImages] = useState([]);

  const categoryItems = mainImages.filter((item) => item.categoryId);

  const styleItems = mainImages.filter((item) => item.styleId);

  const [categories, setCategories] = useState([]);

  const [homeReady, setHomeReady] = useState(false);

  const [productsReady, setProductsReady] = useState(false);

  useEffect(() => {
    let alive = true;

    const fetchHomeData = async () => {
      try {
        const [mainResponse, categoryResponse] = await Promise.all([
          getMain(),
          getCategories(),
        ]);

        const images = mainResponse.data.images;

        //await preloadingImages(images.map((item) => item.imageUrl));

        if (!alive) return;

        setMainImages(images);
        setCategories(categoryResponse);
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
  }, []);

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

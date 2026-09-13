import { CategoriesSection } from "../../components/home/CategoriesSection";
import { HeroSection } from "../../components/home/HeroSection";
import { DeskCurationSection } from "../../components/home/DeskCurationSection";
import { ProductSection } from "../../components/home/ProductSection";
import { useEffect, useState } from "react";
import { getCategories } from "../../api/categoriesApi";
import { getMain } from "../../api/mainApi";
import useLoadingStore from "../../store/UseLoadingStore";
import { preloadingImages } from "../../utils/preloadingImages";

export default function HomePage() {
  const [mainImages, setMainImages] = useState([]);

  const categoryItems = mainImages.filter((item) => item.categoryId);
  const styleItems = mainImages.filter((item) => item.styleId);
  const [categories, setCategories] = useState([]);

  const startLoading = useLoadingStore((state) => state.startLoading);
  const endLoading = useLoadingStore((state) => state.endLoading);

  useEffect(() => {
    let alive = true;
    // 이미지 미리 로딩 중 페이지를 떠나도(unmount) 전역 로딩 카운트가 남지 않도록,
    // 자연 완료/언마운트 둘 중 먼저 오는 시점에 한 번만 endLoading을 호출한다

    /*let loadingEnded = false;
    const finishLoading = () => {
      if (loadingEnded) return;
      loadingEnded = true;
      endLoading();
    };*/

    async function fetchHomeData() {
      startLoading();

      try {
        const [mainResponse, categoryResponse] = await Promise.all([
          getMain(),
          getCategories(),
        ]);

        const images = mainResponse.data.images;
        //const imageUrls = images.map((item) => item.imageUrl);

        await preloadingImages(images.map((item) => item.imageUrl));

        if (!alive) return;

        setMainImages(images);
        setCategories(categoryResponse);
      } catch (error) {
        console.error("홈 데이터 로딩 실패:", error);
      } finally {
        //finishLoading();
        endLoading();
      }
    }

    fetchHomeData();

    return () => {
      alive = false;
      //finishLoading();
    };
  }, [startLoading, endLoading]);

  return (
    <>
      <main>
        <HeroSection />
        <CategoriesSection items={categoryItems} categories={categories} />
        <DeskCurationSection items={styleItems} />
        <ProductSection />
      </main>
    </>
  );
}

import { lazy, Suspense, useEffect, useLayoutEffect } from "react";
import { Global } from "@emotion/react";
import { reset } from "./styles/reset";
import { Routes, Route, useLocation } from "react-router";
import { getMe } from "./api/authApi";
import useAuthStore from "./store/UseAuthStore";
import useLoadingStore from "./store/UseLoadingStore";
import categories from "./data/categories";
import Toast from "./components/common/Toast";
import CommonLayout from "./pages/commonLayout";
import Loading from "./components/common/Loading";
import { MotionConfig } from "motion/react";
const HomePage = lazy(() => import("./pages/Home/HomePage"));
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import MyPage from "./pages/MyPage";
const CategoryPage = lazy(() => import("./pages/Category/CategoryPage"));
const ProductDetailPage = lazy(
  () => import("./pages/Product/ProductDetailPage"),
);
const CartPage = lazy(() => import("./pages/Cart/CartPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  const location = useLocation();
  const readyPage = useLoadingStore((state) => state.readyPage);
  const startPageLoading = useLoadingStore((state) => state.startPageLoading);
  const isPageLoading = readyPage !== location.pathname;

  useLayoutEffect(() => {
    startPageLoading(location.pathname);
  }, [location.pathname, startPageLoading]);

  useEffect(() => {
    const restoreLogin = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        clearUser();
        return;
      }

      try {
        const result = await getMe();

        setUser(result.userInfo);
      } catch (error) {
        localStorage.removeItem("token");
        clearUser();

        console.error("로그인 상태 복구 실패:", error);
      }
    };

    restoreLogin();
  }, [setUser, clearUser]);

  return (
    <MotionConfig reducedMotion="user">
      <Global styles={reset} />

      <Toast />

      {isPageLoading && <Loading />}

      <Suspense fallback={null}>
        <Routes>
          <Route element={<CommonLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/mypage" element={<MyPage />} />
            {categories.map((category) => (
              <Route
                key={category.id}
                path={category.path}
                element={
                  <CategoryPage key={category.id} categoryId={category.id} />
                }
              />
            ))}
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cartpage" element={<CartPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </MotionConfig>
  );
}

export default App;

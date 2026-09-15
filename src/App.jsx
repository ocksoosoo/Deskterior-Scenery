import { lazy, Suspense, useEffect, useLayoutEffect, useState } from "react";
import { Global } from "@emotion/react";
import { reset } from "./styles/reset";
import { Routes, Route, useLocation } from "react-router";
//import SignupForm from "./pages/SignupForm";
//import LoginForm from "./pages/LoginForm";
//import CartPage from "./pages/Cart/CartPage";
//import ProductDetailPage from "./pages/Product/ProductDetailPage";
//import NotFoundPage from "./pages/NotFoundPage";
import { getMe } from "./api/authApi";
import useAuthStore from "./store/UseAuthStore";
import useLoadingStore from "./store/UseLoadingStore";
//import CategoryPage from "./pages/Category/CategoryPage";
import categories from "./data/categories";
//import HomePage from "./pages/Home/HomePage";
import Toast from "./components/common/Toast";
import CommonLayout from "./pages/commonLayout";
import Loading from "./components/common/Loading";
const HomePage = lazy(() => import("./pages/Home/HomePage"));
const LoginForm = lazy(() => import("./pages/LoginForm"));
const SignupForm = lazy(() => import("./pages/SignupForm"));
const MyPage = lazy(() => import("./pages/MyPage"));
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
    <>
      <Global styles={reset} />
      {/*<div>{isLoggedIn ? "로그인 상태" : "로그아웃 상태"}</div>*/}
      {/* 나중에 로그인 로그아웃 상태 체크 코드 삭제 X */}

      {/*{isLoggedIn && userInfo && <p>{userInfo.name}님</p>}*/}

      {/*<Loading />*/}

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
      {/* 페이지 이동 및 Outlet 적용 코드, 삭제 X */}

      {/* 라우팅으로 각 페이지가 렌더되므로 겹침 렌더 비활성화 
      <LoginForm setIsLoggedIn={setIsLoggedIn} setUserInfo={setUserInfo} />
      <SignupForm />
      <ProductDetailPage
        isLoggedIn={isLoggedIn}
        currentUserId={userInfo?.id ?? null}
        currentUserName={userInfo?.name ?? ""}
      />
      <NotFoundPage autoRedirect={false} />
      */}
    </>
  );
}

export default App;

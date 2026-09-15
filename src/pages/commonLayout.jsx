import { Outlet, useLocation } from "react-router";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollTopButton from "../components/common/ScrollTopButton";

// 로그인/회원가입 페이지에서는 플로팅 버튼을 숨김
const HIDE_SCROLL_TOP_PATHS = ["/login", "/signup"];

function CommonLayout() {
  const { pathname } = useLocation();
  const hideScrollTop = HIDE_SCROLL_TOP_PATHS.includes(pathname);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      {!hideScrollTop && <ScrollTopButton />}
    </>
  );
}

export default CommonLayout;

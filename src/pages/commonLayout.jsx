import { Outlet } from "react-router";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollTopButton from "../components/common/ScrollTopButton";

function CommonLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollTopButton />
    </>
  );
}

export default CommonLayout;

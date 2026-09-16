import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter } from "react-router";
import { theme } from "./styles/theme.jsx";
import App from "./App.jsx";
import ScrollRestoration from "./components/common/ScrollRestoration.jsx";

// 폰트(@font-face)가 reset.jsx의 CSS-in-JS로 선언돼 있어서, 브라우저가 이
// 폰트의 존재 자체를 "JS가 실행되어 그 CSS를 주입한 뒤"에야 알게 된다 -
// 그만큼 폰트 요청 시작이 늦어진다. index.html은 건드리지 않는 프로젝트
// 컨벤션이라, 앱이 그리기 시작하기 전에 여기서 직접 preload 힌트를 추가해
// 실제 폰트 요청을 최대한 앞당긴다
[
  "https://cdn.jsdelivr.net/npm/pretendard@1.3.9/dist/web/variable/woff2/PretendardVariable.woff2",
  "https://cdn.jsdelivr.net/fontsource/fonts/dm-serif-text@latest/latin-400-normal.woff2",
].forEach((href) => {
  const preload = document.createElement("link");
  preload.rel = "preload";
  preload.as = "font";
  preload.type = "font/woff2";
  preload.href = href;
  preload.crossOrigin = "anonymous";
  document.head.appendChild(preload);
});

// SEO용 meta description - index.html은 건드리지 않는 프로젝트 컨벤션이라
// 여기서 직접 추가한다
const metaDescription = document.createElement("meta");
metaDescription.name = "description";
metaDescription.content =
  "SCENERY - 조명, 수납, 디지털/전자기기, 데스크 액세서리, 문구 등 책상 위 공간을 꾸미는 데스크테리어 소품 전문 쇼핑몰";
document.head.appendChild(metaDescription);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ScrollRestoration />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);

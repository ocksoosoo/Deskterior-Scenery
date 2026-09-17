import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter } from "react-router";
import { theme } from "./styles/theme.jsx";
import App from "./App.jsx";
import ScrollRestoration from "./components/common/ScrollRestoration.jsx";

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

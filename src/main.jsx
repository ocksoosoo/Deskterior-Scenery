import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter } from "react-router";
import { theme } from "./styles/theme.jsx";
import App from "./App.jsx";
import ScrollRestoration from "./components/common/ScrollRestoration.jsx";

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

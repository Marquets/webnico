import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AboutPage } from "./components/AboutPage/AboutPage";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AboutPage />
  </StrictMode>,
);

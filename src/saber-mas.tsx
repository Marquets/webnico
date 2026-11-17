import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReadingPage } from "./components/ReadingPage/ReadingPage";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReadingPage />
  </StrictMode>,
);

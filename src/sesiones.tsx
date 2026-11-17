import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SessionsPage } from "./components/SessionsPage/SessionsPage";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SessionsPage />
  </StrictMode>,
);

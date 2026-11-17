import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { EncountersPage } from "./components/EncountersPage/EncountersPage";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EncountersPage />
  </StrictMode>,
);

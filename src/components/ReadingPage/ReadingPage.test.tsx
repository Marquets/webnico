import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ReadingPage } from "./ReadingPage";

describe("ReadingPage", () => {
  it("offers the long read with a way to get in touch and a way back", () => {
    render(<ReadingPage />);

    expect(screen.getByRole("heading", { level: 1, name: /si quieres saber más/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /hablemos/i })).toHaveAttribute("href", "/contacto/");
    expect(screen.getByRole("link", { name: /volver a sesiones/i })).toHaveAttribute("href", "/sesiones/");
  });

  it("lists the prices", () => {
    render(<ReadingPage />);

    expect(screen.getByRole("heading", { name: /tarifas/i })).toBeInTheDocument();
    expect(screen.getByText("50€")).toBeInTheDocument();
  });
});

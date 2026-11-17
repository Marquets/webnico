import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SessionsPage } from "./SessionsPage";

describe("SessionsPage", () => {
  it("titles the page and links the logo back home", () => {
    render(<SessionsPage />);

    expect(screen.getByRole("heading", { level: 1, name: /sesiones de terapia/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /inicio/i })).toHaveAttribute("href", "/");
  });

  it("follows the text with its photo cards", () => {
    render(<SessionsPage />);

    expect(screen.getAllByRole("article")).toHaveLength(6);
    expect(screen.getByRole("heading", { name: /qué me diferencia/i })).toBeInTheDocument();
  });
});

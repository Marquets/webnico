import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AboutPage } from "./AboutPage";

describe("AboutPage", () => {
  it("tells the story as a feed of cards and keeps the full text one click away", () => {
    render(<AboutPage />);

    expect(screen.getByRole("heading", { level: 1, name: /sobre mí/i })).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(12);
    expect(screen.getByText(/leer mi historia completa/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /cuál es mi talento/i, hidden: true })).toBeInTheDocument();
  });
});

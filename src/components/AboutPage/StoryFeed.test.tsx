import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StoryFeed } from "./StoryFeed";

describe("StoryFeed", () => {
  it("walks through the story in twelve cards", () => {
    render(<StoryFeed />);

    expect(screen.getAllByRole("article")).toHaveLength(12);
    expect(screen.getByRole("heading", { name: /mi primer retiro/i })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").map((item) => item.textContent)).toContain("¿Qué depende de ti?");
  });
});

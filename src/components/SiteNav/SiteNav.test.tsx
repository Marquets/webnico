import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteNav } from "./SiteNav";

function scrollTo(y: number) {
  act(() => {
    window.scrollY = y;
    window.dispatchEvent(new Event("scroll"));
  });
}

describe("SiteNav", () => {
  it("shows the links over the hero", () => {
    render(<SiteNav />);

    expect(screen.getByRole("link", { name: /sesiones de terapia/i })).toHaveAttribute("href", "/sesiones/");
  });

  it("leaves on the way down past the hero and returns on the way up", () => {
    const { container } = render(<SiteNav />);
    const nav = container.querySelector("nav");

    scrollTo(window.innerHeight);
    expect(nav).toHaveAttribute("aria-hidden", "true");

    scrollTo(window.innerHeight * 0.9);
    expect(nav).toHaveAttribute("aria-hidden", "false");
  });
})

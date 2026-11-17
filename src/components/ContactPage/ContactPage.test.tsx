import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContactPage } from "./ContactPage";

describe("ContactPage", () => {
  it("offers a call, a message and a first video call", () => {
    render(<ContactPage />);

    expect(screen.getByRole("heading", { level: 1, name: /contacto/i })).toBeInTheDocument();
    expect(screen.getByText(/cualquier camino empieza con un primer paso/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "+34 679 667 357" })).toHaveAttribute("href", "tel:+34679667357");
    expect(screen.getByRole("link", { name: /^whatsapp$/i })).toHaveAttribute("href", "https://wa.me/34679667357");
    expect(screen.getByRole("link", { name: /reservar/i }).getAttribute("href")).toContain("videollamada");
  });
});

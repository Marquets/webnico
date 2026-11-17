import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EncountersPage } from "./EncountersPage";

describe("EncountersPage", () => {
  it("titles the page and links the logo back home", () => {
    render(<EncountersPage />);

    expect(screen.getByRole("heading", { level: 1, name: /encuentros/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /inicio/i })).toHaveAttribute("href", "/");
  });
});

describe("EncountersPage offers", () => {
  it("presents both kinds of encounter together and a number to ask", () => {
    render(<EncountersPage />);

    expect(screen.getByRole("heading", { name: /espacios de encuentro en grupo/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /espacios de encuentro contigo/i })).toBeInTheDocument();
    expect(screen.getByText(/talleres grupales/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /679 667 357/ })).toHaveAttribute("href", "tel:+34679667357");
  });
});

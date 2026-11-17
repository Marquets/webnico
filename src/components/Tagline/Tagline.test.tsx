import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Tagline } from "./Tagline";

describe("Tagline", () => {
  it("keeps the closing phrase readable outside the decorative curve", () => {
    render(<Tagline />);

    expect(screen.getByText(/amabilidad, calma y libertad/i, { selector: "p" })).toBeInTheDocument();
  });

  it("invites a call to the phone number", () => {
    render(<Tagline />);

    expect(screen.getByRole("link", { name: /hablemos/i })).toHaveAttribute("href", "tel:+34679667357");
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { AboutPage } from "./AboutPage";

describe("AboutPage", () => {
  it("tells the story and ends with a number to call", () => {
    render(<AboutPage />);

    expect(screen.getByRole("heading", { level: 1, name: /sobre mí/i })).toBeInTheDocument();
    expect(screen.getByText(/para, siente y a ver qué pasa/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /679 667 357/ })).toHaveAttribute("href", "tel:+34679667357");
  });

  it("opens the talent and the value in their own window", async () => {
    const user = userEvent.setup();
    render(<AboutPage />);

    await user.click(screen.getByRole("button", { name: /cuál es el valor que aporto/i }));
    const dialog = screen.getByRole("dialog", { name: /cuál es el valor que aporto/i });
    expect(dialog).toHaveTextContent(/no acompaño desde la superioridad/i);
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SessionsPage } from "./SessionsPage";

describe("SessionsPage", () => {
  it("titles the page and links the logo back home", () => {
    render(<SessionsPage />);

    expect(screen.getByRole("heading", { level: 1, name: /sesiones de terapia/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /inicio/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { current: "page" })).toHaveTextContent(/sesiones de terapia/i);
  });

  it("opens a question's text over the page and closes it again", async () => {
    const user = userEvent.setup();
    render(<SessionsPage />);

    await user.click(screen.getByRole("button", { name: /cómo sé si esto es para mí/i }));
    const dialog = screen.getByRole("dialog", { name: /cómo sé si esto es para mí/i });
    expect(dialog).toHaveTextContent(/te sientes sin energía y no sabes por qué/i);

    await user.click(screen.getByRole("button", { name: /cerrar/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens each photo in the grid onto its own text", async () => {
    const user = userEvent.setup();
    render(<SessionsPage />);

    await user.click(screen.getByRole("button", { name: /adicción y dependencias/i }));
    expect(screen.getByRole("dialog")).toHaveTextContent(/la recuperación empieza cuando eliminamos el consumo/i);
  });

  it("keeps reading more as a link", () => {
    render(<SessionsPage />);

    expect(screen.getByRole("link", { name: /si quieres saber más/i })).toHaveAttribute("href", "/sesiones/saber-mas/");
  });
});

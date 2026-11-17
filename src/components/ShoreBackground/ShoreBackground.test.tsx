import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ShoreBackground } from "./ShoreBackground";

describe("ShoreBackground", () => {
  it("renders a decorative canvas hidden from assistive tech", () => {
    const { container } = render(<ShoreBackground />);
    const canvas = container.querySelector("canvas");

    expect(canvas).not.toBeNull();
    expect(canvas?.getAttribute("aria-hidden")).toBe("true");
  });

  it("stays mounted when WebGL is unavailable", () => {
    const { container, unmount } = render(<ShoreBackground />);

    expect(container.querySelector("canvas")).not.toBeNull();
    expect(() => unmount()).not.toThrow();
  });
});

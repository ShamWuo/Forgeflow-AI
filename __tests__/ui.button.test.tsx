import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "../components/ui/button";

describe("Button component", () => {
  it("renders children when not loading", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("shows loading text and is disabled when loading=true", () => {
    render(<Button loading>Hidden</Button>);
    const btn = screen.getByRole("button");
    expect(btn).toHaveTextContent("Running...");
    expect(btn).toBeDisabled();
  });

  it("applies variant classNames (ghost variant)", () => {
    render(<Button variant="ghost">Ghost</Button>);
    const btn = screen.getByRole("button");
    // ensure the ghost variant style token is present
    expect(btn.className).toContain("text-slate-300");
  });

  it("merges custom className with base classes", () => {
    render(<Button className="my-custom">Hi</Button>);
    const btn = screen.getByRole("button");
    expect(btn.className).toContain("my-custom");
    expect(btn.className.length).toBeGreaterThan("my-custom".length);
  });
});

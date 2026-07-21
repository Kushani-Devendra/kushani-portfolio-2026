import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HeroNav } from "./Nav";

describe("HeroNav", () => {
  it("highlights the home link and renders a dark Hire me action on the home page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HeroNav />
      </MemoryRouter>,
    );

    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toHaveStyle({ opacity: "1" });

    const hireLink = screen.getByRole("link", { name: /hire me/i });
    expect(hireLink).toHaveAttribute("href", "/#hire-me");
    expect(hireLink).toHaveStyle({ background: "#2E2C29", color: "#fff" });
  });
});

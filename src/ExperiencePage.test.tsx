import { render, screen } from "@testing-library/react";
import ExperiencePage from "./ExperiencePage";

describe("ExperiencePage", () => {
  it("renders the experience overview and roles", () => {
    render(<ExperiencePage />);

    expect(screen.getByText(/Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/UI\/UX Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/Commercial Bank of Ceylon/i)).toBeInTheDocument();
  });
});

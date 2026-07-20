import { ALL_PROJECTS } from "./data";

describe("portfolio project data", () => {
  it("includes the requested portfolio projects", () => {
    const ids = ALL_PROJECTS.map((project) => project.id);

    expect(ids).toEqual(
      expect.arrayContaining([
        "kapuli-mobile-app",
        "library-management-system",
        "prestige-banking-website",
        "neo-creative",
        "a-taste-of-heaven",
        "subee-clothing",
        "salon-zero",
      ]),
    );
  });

  it("provides Figma previews for the portfolio projects", () => {
    const projects = ALL_PROJECTS.filter((project) =>
      [
        "kapuli-mobile-app",
        "library-management-system",
        "prestige-banking-website",
        "neo-creative",
        "a-taste-of-heaven",
        "subee-clothing",
        "salon-zero",
      ].includes(project.id),
    );

    expect(projects.length).toBeGreaterThanOrEqual(7);
    projects.forEach((project) => {
      expect(project.figmaUrl || project.figmaLinks?.length).toBeTruthy();
    });
  });
});

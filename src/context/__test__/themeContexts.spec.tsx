import React, { ReactComponentElement, ReactHTMLElement } from "react";
import { beforeEach, expect, it, describe } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ThemeContext, ThemeProvider } from "../themeContexts";
/**
 * @vitest-environment happy-dom
 */
let TestComponent:  () => JSX.Element;
let component: HTMLElement;
describe("Theme Provider", () => {
  beforeEach(() => {
    TestComponent = () => {
      const { isDark, setScheme } = React.useContext(ThemeContext);
      return (
        <div id="test-theme-provider">
          <p>{isDark ? "dark" : "light"}</p>
          <button
            id="button-toggle"
            onClick={() => setScheme(isDark ? "light" : "dark")}
          >
            Change Theme
          </button>
        </div>
      );
    };
    
});

it("Is the tes component load", () => {
      const { container } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );
      component = container;
    let element = component.querySelector("#test-theme-provider");
    expect(element).toBeDefined();
  });

  it("Is component in light mode", () => {
    expect(screen.getByText(/light/));
  });

  it("Is component change to dark mode", async () => {
    let element = component.querySelector("#button-toggle");
    if (element) {
      fireEvent.click(element);
      await waitFor(() => {
        expect(screen.getByText(/dark/)).toBeDefined();
      });
    }
  });
});

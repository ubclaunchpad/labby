import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Header from "./index";
import { act } from "react-dom/test-utils";

afterEach(() => {
  cleanup();
});

describe("Header Component", () => {
  const setToggle = jest.fn();
  
  test("Header Rendering", () => {
    render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );
      const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();
  });

  test("Header Can Navigate", () => {
    render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );
    const componentHeader = screen.getByTestId("all-components");
    expect(componentHeader).toBeInTheDocument();
    act(() => {
        componentHeader.click();
    });
    expect(global.window.location.pathname).toContain('/all-components');
  })
});

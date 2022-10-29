import { render, screen } from "@testing-library/react"; // (or /dom, /vue, ...)
import { SingleSelect } from "./SingleSelect";

describe("A test suite for the single select component", () => {
  it("renders a Single select with a textbox for the header and a textbox for the options", () => {
    render(<SingleSelect questionNumber={4} />);
    screen.getByText("Q4");
    screen.getByText("Click to type your question here");
    screen.getByText("Click to add new option ");
  });
});

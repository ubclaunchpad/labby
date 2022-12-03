import { render, screen } from "@testing-library/react"; // (or /dom, /vue, ...)
import { SingleSelect } from "./index";
import * as redux from "react-redux";
import { Provider } from "react-redux";
import Store from "../../redux/store";
import userEvent from "@testing-library/user-event";

describe("A test suite for the single select component", () => {
  it("renders a Single select with a textbox for the header and a textbox for the options", async () => {
    render(
      <Provider store={Store}>
        <SingleSelect questionNumber={4} />
      </Provider>
    );
    screen.getByText("Q4");
    const questionTitle = screen.getByTitle("Add a question name");
    const optionInput = screen.getByTitle("Add an option");
    const logicRequired = screen.getByText("Logic Added");
    screen.getByText("Required");
    screen.getByTitle("Make this question required");
    userEvent.type(optionInput, "TestOption");
    userEvent.click(logicRequired);
    await screen.findByText("TestOption");
    userEvent.type(questionTitle, "TestQuestionName");
    userEvent.click(logicRequired);
    await screen.findByText("TestQuestionName");
  });
});

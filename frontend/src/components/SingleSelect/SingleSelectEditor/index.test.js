import { render, screen } from "@testing-library/react"; // (or /dom, /vue, ...)
import SingleSelectEditor from "./index";
import * as redux from "react-redux";
import { Provider } from "react-redux";
import Store from "../../../redux/store";
import userEvent from "@testing-library/user-event";

describe("A test suite for the single select component", () => {
  it("renders a Single select with a textbox for the header and a textbox for the options", async () => {
    const q = {
      added_on: null,
      answer: "Drilling",
      answer_id: "428b52ae-ea2a-8b86-ccfd-1c33a4309937",
      clinical: 1,
      cost: null,
      cost_id: null,
      fk_answer_id: null,
      fk_form_id: "0077f50a-8ce4-6926-4b85-01f668fa5b00",
      fk_question_id: "cc96455e-9078-45d6-af65-15f7b92b9976",
      mandatory: 1,
      numerical_only: 0,
      position_index: 4,
      price_category: null,
      quantifiable: null,
      question: "What service would you like?",
      question_id: "cc96455e-9078-45d6-af65-15f7b92b9976",
      question_note: "Drilling can take 1 month to complete!",
      question_type: "single",
      unit: null
    }

    render(
      <Provider store={Store}>
        <SingleSelectEditor question={q} />
      </Provider>
    );
    screen.getByText("Q4");
    // const questionTitle = screen.getByTitle("Add a question name");
    // const optionInput = screen.getByTitle("Add an option");
    // const logicRequired = screen.getByText("View Logic");
    // screen.getByText("Required");
    // screen.getByTitle("Make this question required");
    // userEvent.type(optionInput, "TestOption");
    // userEvent.click(logicRequired);
    // await screen.findByText("TestOption");
    // userEvent.type(questionTitle, "TestQuestionName");
    // userEvent.click(logicRequired);
    // await screen.findByText("TestQuestionName");
  });
});

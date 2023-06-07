import { render, screen } from "@testing-library/react"; // (or /dom, /vue, ...)
import { Provider } from "react-redux";
import Store from "../../redux/store";
import userEvent from "@testing-library/user-event";
import App from "../../App";

describe("Sign Up Component Test", () => {
  it("Signup Flow Test", async () => {
    render(
      <Provider store={Store}>
        <App />
      </Provider>
    );
    screen.getAllByText("Log in");
    screen.getByText("Not a user? Create an account");
    const signupButton = screen.getByTestId("signup");
    userEvent.click(signupButton);
    // screen.getByTitle("Create an Account");
    // const questionTitle = screen.getByText(q.question);
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

import { render, screen } from "@testing-library/react"; // (or /dom, /vue, ...)
import { Provider } from "react-redux";
import Store from "../../redux/store";
import App from "../../App";

describe("Login Component Test", () => {
  it("Login Flow Test", async () => {
    render(
      <Provider store={Store}>
        <App />
      </Provider>
    );
    screen.getAllByText("Log in");
    screen.getByText("Not a user? Create an account");
  });
});

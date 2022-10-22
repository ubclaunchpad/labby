import { appColor } from "../../../constants";
import "./index.css";

function FormTitle() {
  return (
    <div
      className="FormTitleInput"
      style={{ backgroundColor: appColor.lightGray }}
    >
      <input
        className="FormTitleTextInput"
        placeholder="Type your form name here..."
      />
    </div>
  );
}

export default FormTitle;

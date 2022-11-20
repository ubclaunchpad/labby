// import { appColor } from "../../../constants";
import DropdownSelect from "../../../assets/DropdownSelect.svg";
// import Dropdown from "../../components/Dropdown";
import "./index.css";


function ServiceQuestion() {

  return (
    <div
    >
      {/* <input
        className="ServiceQuestionSelectInput"
        placeholder="Select your service question here..."
      /> */}
      {/* <img src={DropdownSelect} alt="DropdownSelect" /> */}
      <select className="ServiceQuestionSelect" value="Select your service question here..." onChange={() => { }}>
        <option value="Select your service question here..." disabled>Select your service question here...</option>
        <option value="1">1</option>
      </select>
    </div>
  );
}

export default ServiceQuestion;

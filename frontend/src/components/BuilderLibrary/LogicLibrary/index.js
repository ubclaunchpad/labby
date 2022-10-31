import "./index.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import DownArrow from "../../../assets/Arrow.png";
import { appColor } from "../../../constants";

function LogicLibrary() {
  const rules = ["Display this question if", "Hide this question if"];

  const logicRule = "Display this question if";

  return (
    <div className="LogicView">
      <div className="titleText">Display Logic</div>
      <div className="subtitleText">Rule</div>
      <div className="selectionBoxView">
        <Select
          className="selectBox"
          displayEmpty
          value={logicRule}
          onChange={(rule) => {
            console.log(rule);
          }}
          input={<OutlinedInput />}
          renderValue={() => logicRule}
          inputProps={{ "aria-label": "Without label" }}
        >
          {rules.map((rule) => (
            <MenuItem key={rule} value={rule}>
              {rule}
            </MenuItem>
          ))}
        </Select>
      </div>
      <img className="downArrowImage" src={DownArrow} alt="Down Arrow" />
      <div className="subtitleText">Answer</div>
      <div className="selectionBoxView">
        <Select
          className="selectBox"
          displayEmpty
          value={logicRule}
          onChange={(rule) => {
            console.log(rule);
          }}
          input={<OutlinedInput />}
          renderValue={() => logicRule}
          inputProps={{ "aria-label": "Without label" }}
        >
          {rules.map((rule) => (
            <MenuItem key={rule} value={rule}>
              {rule}
            </MenuItem>
          ))}
        </Select>
        <div className="answerSelectionBox">
          {rules.map((rule) => (
            <FormControlLabel
              control={<Checkbox defaultChecked={false} />}
              label={rule}
            />
          ))}
        </div>
      </div>
      <img className="downArrowImage" src={DownArrow} alt="Down Arrow" />
      <div className="subtitleText">Condition</div>
      <div className="selectionBoxView">
        <Select
          className="selectBox"
          displayEmpty
          value={logicRule}
          onChange={(rule) => {
            console.log(rule);
          }}
          input={<OutlinedInput />}
          renderValue={() => logicRule}
          inputProps={{ "aria-label": "Without label" }}
        >
          {rules.map((rule) => (
            <MenuItem key={rule} value={rule}>
              {rule}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="buttonView">
        <button
          className="SaveLogicButton"
          style={{
            backgroundColor: appColor.lightGray,
            color: appColor.gray,
            textAlign: "center",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#4CAF50";
            e.target.style.color = "#FFFFFF";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = appColor.lightGray;
            e.target.style.color = appColor.gray;
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default LogicLibrary;

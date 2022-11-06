import { useState } from "react";
import ComponentLibrary from "./ComponentLibrary";
import "./index.css";
import LogicLibrary from "./LogicLibrary";

function BuilderLibrary() {
  const [componentsMode, setComponentsMode] = useState(true);
  return (
    <div>
      <div className="HeaderTab">
        <button
          className="ComponentsTab titleText"
          style={{
            backgroundColor: componentsMode ? "#AEAEAE" : "#D9D9D9",
            borderBottomRightRadius: componentsMode ? "0px" : "20px",
          }}
          onClick={() => {
            setComponentsMode(true);
          }}
        >
          Components
        </button>
        <button
          className="LogicTab titleText"
          style={{
            backgroundColor: componentsMode ? "#D9D9D9" : "#AEAEAE",
            borderBottomLeftRadius: componentsMode ? "20px" : "0px",
          }}
          onClick={() => {
            setComponentsMode(false);
          }}
        >
          Logic
        </button>
      </div>
      <div className="ContentHolder">
        {componentsMode ? <ComponentLibrary/> : <LogicLibrary/>}
      </div>
    </div>
  );
}

export default BuilderLibrary;

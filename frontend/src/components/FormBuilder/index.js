import { appColor } from "../../constants";
import FormTitle from "./FormTitle";
import "./index.css";

function FormBuilder() {
  return (
    <div>
      <div className="FormBuilderHeader FormBuilder">
        <div className="FormBuilderTitle" style={{ color: appColor.gray }}>
          Form Builder
        </div>
        <div className="FormTitle">
          {FormTitle()}
          <div className="FormPreview">
            <button
              className="FormPreviewButton"
              style={{
                backgroundColor: appColor.lightGray,
                color: appColor.gray,
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#4CAF50";
                e.target.style.color = "#FFFFFF";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = appColor.lightGray;
                e.target.style.color = appColor.gray;
              }}
              onClick={() => {
                alert("Preview Not Available Yet!");
              }}
            >
              Preview
            </button>
          </div>
        </div>
      </div>
      <div className="ScrollBox FormBuilder">
        <div className="FormBuilderOutline" style={{ color: appColor.gray }}>
          Drag and drop to add components
        </div>
      </div>
    </div>
  );
}

export default FormBuilder;

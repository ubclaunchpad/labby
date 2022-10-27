import "./index.css";
import { LibraryCard } from "../../Card";
import MCIcon from "../../../assets/MultiChoice.png";
import SCIcon from "../../../assets/SingleChoice.png";
import TextAnswerIcon from "../../../assets/TextAnswer.png";
import DropIcon from "../../../assets/Dropdown.png";
import HeadingIcon from "../../../assets/Heading.png";
import TextIcon from "../../../assets/TextLine.png";
import UploadIcon from "../../../assets/FileUpload.png";
import DownloadIcon from "../../../assets/FileDownload.png";
import ContactIcon from "../../../assets/ContactInfo.png";

const DraggableCard = ({ children }) => {
  return (
    <LibraryCard>
      <div className="draggableCardContent">{children}</div>
    </LibraryCard>
  );
};

function ComponentLibrary() {
  return (
    <>
      <div className="elementContainer">
        <div className="elementsTitle">Question Elements</div>
        <DraggableCard>
          <img className="iconImage" src={MCIcon} alt="Multiple Choice" />{" "}
          Multiple Choice
        </DraggableCard>
        <DraggableCard>
          <img className="iconImage" src={SCIcon} alt="Single Selection" />{" "}
          Single Selection
        </DraggableCard>
        <DraggableCard>
          <img
            className="iconImage"
            src={TextAnswerIcon}
            alt="Text
          Answer"
          />{" "}
          Text Answer
        </DraggableCard>
        <DraggableCard>
          <img className="iconImage" src={DropIcon} alt="Dropdown" /> Dropdown
        </DraggableCard>
      </div>

      <div className="elementContainer">
        <div className="elementsTitle">Layout Elements</div>
        <DraggableCard>
          <img className="iconImage" src={HeadingIcon} alt="Heading" /> Heading
        </DraggableCard>
        <DraggableCard>
          <img
            className="iconImage"
            src={TextIcon}
            alt="Text
          Line"
          />{" "}
          Text Line
        </DraggableCard>
      </div>

      <div className="elementContainer">
        <div className="elementsTitle">Media Elements</div>
        <DraggableCard>
          <img
            className="iconImage"
            src={UploadIcon}
            alt="File
          Upload"
          />{" "}
          File Upload
        </DraggableCard>
        <DraggableCard>
          <img
            className="iconImage"
            src={DownloadIcon}
            alt="File
          Download"
          />{" "}
          File Download
        </DraggableCard>
      </div>

      <div className="elementContainer">
        <div className="elementsTitle">Billing Elements</div>
        <DraggableCard>
          <img
            className="iconImage"
            src={ContactIcon}
            alt="Contact Information"
          />{" "}
          Contact Information
        </DraggableCard>
      </div>
    </>
  );
}

export default ComponentLibrary;

// Hold all elements to be shown on Components Side View
// And their initial order - which changes during  runtime as elements  are dragged around

import React from "react";
import { v4 as uuidv4 } from "uuid";

import { LibraryCard } from "../Card";
import "./component-sideview-data.css";
import MCIcon from "../../assets/MultiChoice.png";
import SCIcon from "../../assets/SingleChoice.png";
import TextAnswerIcon from "../../assets/TextAnswer.png";
import DropIcon from "../../assets/Dropdown.png";
import HeadingIcon from "../../assets/Heading.png";
import TextIcon from "../../assets/TextLine.png";
import UploadIcon from "../../assets/FileUpload.png";
import DownloadIcon from "../../assets/FileDownload.png";
import ContactIcon from "../../assets/ContactInfo.png";

const DraggableCard = ({ children }) => {
  return (
    <LibraryCard>
      <div className="draggableCardContent">{children}</div>
    </LibraryCard>
  );
};

export const MultipleChoiceCard = () => {
  return (
    <DraggableCard>
      <img className="iconImage" src={MCIcon} alt="Multiple Choice" /> Multiple
      Choice
    </DraggableCard>
  );
};
export const SingleSelectionCard = () => {
  return (
    <DraggableCard>
      <img className="iconImage" src={SCIcon} alt="Single Selection" />
      Single Selection
    </DraggableCard>
  );
};
export const TextAnswerCard = () => {
  return (
    <DraggableCard>
      <img className="iconImage" src={TextAnswerIcon} alt="Text Answer" />
      Text Answer
    </DraggableCard>
  );
};
export const DropdownCard = () => {
  return (
    <DraggableCard>
      <img className="iconImage" src={DropIcon} alt="Dropdown" />
      Dropdown
    </DraggableCard>
  );
};
export const HeadingCard = () => {
  return (
    <DraggableCard>
      <img className="iconImage" src={HeadingIcon} alt="Heading" /> Heading
    </DraggableCard>
  );
};
export const TextLineCard = () => {
  return (
    <DraggableCard>
      <img className="iconImage" src={TextIcon} alt="Text Line" />
      Text Line
    </DraggableCard>
  );
};
export const FileUploadCard = () => {
  return (
    <DraggableCard>
      <img className="iconImage" src={UploadIcon} alt="File  Upload" />
      File Upload
    </DraggableCard>
  );
};
export const FileDownloadCard = () => {
  return (
    <DraggableCard>
      <img className="iconImage" src={DownloadIcon} alt="File Download" />
      File Download
    </DraggableCard>
  );
};
export const ContactInfoCard = () => {
  return (
    <DraggableCard>
      <img className="iconImage" src={ContactIcon} alt="Contact Information" />
      Contact Information
    </DraggableCard>
  );
};

export const componentsSideViewData = {
  components: {
    "multiple-choice": {
      id: "multiple-choice",
      component: MultipleChoiceCard,
    },
    "single-selection": {
      id: "single-selection",
      component: SingleSelectionCard,
    },
    "text-answer": {
      id: "text-answer",
      component: TextAnswerCard,
    },
    dropdown: {
      id: "dropdown",
      component: DropdownCard,
    },
    heading: {
      id: "heading",
      component: HeadingCard,
    },
    "text-line": {
      id: "text-line",
      component: TextLineCard,
    },
    "file-upload": {
      id: "file-upload",
      component: FileUploadCard,
    },
    "file-download": {
      id: "file-download",
      component: FileDownloadCard,
    },
    "contact-info": {
      id: "contact-info",
      component: ContactInfoCard,
    },
  },
  sections: {
    "question-elements": {
      id: "question-elements",
      title: "Question Elements",
      componentIds: [
        "multiple-choice",
        "single-selection",
        "text-answer",
        "dropdown",
      ],
    },
    "layout-elements": {
      id: "layout-elements",
      title: "Layout Elements",
      componentIds: ["heading", "text-line"],
    },
    "media-elements": {
      id: "media-elements",
      title: "Media Elements",
      componentIds: ["file-upload", "file-download"],
    },
    "billing-elements": {
      id: "billing-elements",
      title: "Billing Elements",
      componentIds: ["contact-info"],
    },
  },
  //For reordering the sections
  sectionOrder: [
    "question-elements",
    "layout-elements",
    "media-elements",
    "billing-elements",
  ],
};

export const QuestionData = {
  droppedComponents: [
    { originId: "heading", id: uuidv4(), component: HeadingCard },
  ],
  "droppedComponentsOrder": []
  // droppedComponentsOrder: ["heading"],
};

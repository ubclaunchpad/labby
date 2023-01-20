import React from "react";
import html2pdf from "../../../node_modules/html2pdf.js/dist/html2pdf.min";
import "./index.css";

// Generate a PDF of any component in the app
// Utilize useRef to get the underlying html element of any React component
const GeneratePdf = ({ htmlElementRef }) => {
  const generatePdfHandler = () => {
    Object.values(htmlElementRef).forEach((element) => {
      let paperOptions = {
        margin: 5,
        filename: "document.pdf",
      };

      const htmlElementToConvert = element.current;
      console.log(htmlElementToConvert);

      html2pdf().set(paperOptions).from(htmlElementToConvert).save();
    });
  };
  return (
    <div className="GeneratePdfButton" onClick={generatePdfHandler}>
      Generate PDF
    </div>
  );
};

export default GeneratePdf;

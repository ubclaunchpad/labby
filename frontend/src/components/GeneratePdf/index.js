import React from "react";
import html2pdf from "../../../node_modules/html2pdf.js/dist/html2pdf.min";
import "./index.css";
import { saveClick } from "../../redux/api/billingApi";

// Generate a PDF of any component in the app
// Utilize useRef to get the underlying html element of any React component
const GeneratePdf = ({ htmlElementRef, nextInvoice }) => {
  const generatePdfHandler = () => {
    htmlElementRef.current.forEach((element) => {
      let paperOptions = {
        margin: 5,
        filename: "document.pdf",
        html2canvas: { scale: 10 },
      };

      const htmlElementToConvert = element;

      html2pdf().set(paperOptions).from(htmlElementToConvert).save();
    });
    // run saveClick nextInvoice times
    for (let i = 0; i < nextInvoice; i++) {
      saveClick({ component_name: "invoice" });
    }
  };
  return (
    <div className="GeneratePDFView">
      <div className="GeneratePdfButton" onClick={generatePdfHandler}>
        Generate PDF
      </div>
    </div>
  );
};

export default GeneratePdf;

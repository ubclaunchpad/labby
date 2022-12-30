import "./index.css";
import "../index.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from "./pdf";

function GenerateInvoice() {
  return (
    <div className="GenerateInvoiceButton">
      <PDFDownloadLink
        className="GenerateText"
        document={<PDF />}
        onClick={() => {
          console.log("Generating Invoice");
        }}
      >
        Generate Invoice
      </PDFDownloadLink>
    </div>
  );
}

export default GenerateInvoice;

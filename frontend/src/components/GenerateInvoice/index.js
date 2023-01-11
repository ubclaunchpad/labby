import "./index.css";
import "../index.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDF } from "./pdf";

function GenerateInvoice({billingData}) {
  return (
    <div className="GenerateInvoiceButton">
      <PDFDownloadLink
        className="GenerateText"
        document={<PDF billingData={billingData}/>}
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

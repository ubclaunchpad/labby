import { appColor } from "../../constants";
import Header from "../../components/Header";
import "./invoice.css";
import InvoiceTable from "../../components/InvoiceTable";

function Invoice() {
  return (
    <div className="invoicePage">
      <div className="headerComponent">
        <Header />
      </div>
      <div className="invoicePageContent">
        <div
          className="InvoiceTitle"
          style={{ color: appColor.gray }}
        >
          Invoice Dashboard
        </div>
        <div className="InvoiceTable">
          <InvoiceTable />
        </div>
      </div>
    </div>
  );
}

export default Invoice;

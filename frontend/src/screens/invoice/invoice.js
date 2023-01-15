import { appColor } from "../../constants";
import Header from "../../components/Header";
import "./invoice.css";
import InvoiceTable from "../../components/InvoiceTable";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { LOAD_BILLABLE } from "../../redux/actions/billingActions";
import GenerateInvoice from "../../components/GenerateInvoice";
import GeneratePdf from "../../components/GeneratePdf";

function Invoice() {
  const dispatch = useDispatch();
  const invoiceTableRef = useRef(null);

  useEffect(() => {
    dispatch({ type: LOAD_BILLABLE });
  }, [dispatch]);

  return (
    <div className="invoicePage">
      <div className="headerComponent">
        <Header />
      </div>
      <div className="invoicePageContent">
        <div className="InvoiceTitle" style={{ color: appColor.gray }}>
          Invoice Dashboard
        </div>
        <div className="InvoiceTable" ref={invoiceTableRef}>
          <InvoiceTable />
        </div>
        <GenerateInvoice />
        <GeneratePdf htmlElementRef={invoiceTableRef} />
      </div>
    </div>
  );
}

export default Invoice;

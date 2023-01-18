

import { appColor } from "../../constants";
import Header from "../../components/Header";
import "./invoice.css";
import PreviewTable from "../../components/PreviewTable";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { LOAD_BILLABLE } from "../../redux/actions/billingActions";
import GenerateInvoice from "../../components/GenerateInvoice";

function PreviewForm() {
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
          Preview Form
        </div>
        <div className="InvoiceTable" ref={invoiceTableRef}>
          <InvoiceTable />
        </div>
        <GenerateInvoice />
      </div>
    </div>
  );
}

export default PreviewForm;
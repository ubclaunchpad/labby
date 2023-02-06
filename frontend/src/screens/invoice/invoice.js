import { appColor } from "../../constants";
import Header from "../../components/Header";
import "./invoice.css";
import InvoiceGraph from "../../components/InvoiceGraph";
import InvoiceCalendar from "../../components/InvoiceCalendar";
import InvoiceTable from "../../components/InvoiceTable";
import InvoiceTotal from "../../components/InvoiceTotal";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { LOAD_BILLABLE } from "../../redux/actions/billingActions";
import GenerateInvoice from "../../components/GenerateInvoice";

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
          Billing & Invoicing 
          <GenerateInvoice />
        </div>
        <div className="searchInvoiceSection">
            <input
              type="text"
              placeholder="Search..."
              className="invoiceTableSearch"
              // NEED TO ADD ONCHANGE FOR SEARCHING
            />
        </div>
        <div className="InvoiceGraph" style={{ color: appColor.gray }}>
          <InvoiceGraph />
        </div>
        <div className="InvoiceGraph" style={{ color: appColor.gray }}>
          <InvoiceCalendar />
        </div>
        <div className="InvoiceTotal" style={{ color: appColor.gray }}>
          <InvoiceTotal />
        </div>
        <div className="InvoiceTable" ref={invoiceTableRef}>
          <InvoiceTable />
        </div>
      </div>
    </div>
  );
}

export default Invoice;

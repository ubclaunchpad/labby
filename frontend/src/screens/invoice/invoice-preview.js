import { appColor } from "../../constants";
import Header from "../../components/Header";
import "./invoice.css";
import { useRef,useEffect } from "react";
import GeneratePdf from "../../components/GeneratePdf";
import InvoiceTemplate from "../../components/GenerateInvoice/InvoiceTemplate";
import { useDispatch } from "react-redux";
import { LOAD_BILLABLE } from "../../redux/actions/billingActions";

function InvoicePreview() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: LOAD_BILLABLE });
  }, [dispatch]);

  const invoiceTemplatePreviewRef = useRef(null);

  return (
    <div className="invoicePage">
      <div className="headerComponent">
        <Header />
      </div>
      <div className="invoicePageContent">
        <div className="InvoiceTitle" style={{ color: appColor.gray }}>
          Invoice Preview
        </div>

        <div className="InvoicePreview">
          <div ref={invoiceTemplatePreviewRef}>
            <InvoiceTemplate />
          </div>
        </div>
        <GeneratePdf htmlElementRef={invoiceTemplatePreviewRef} />
      </div>
    </div>
  );
}

export default InvoicePreview;

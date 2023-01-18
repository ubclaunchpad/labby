

import { appColor } from "../../constants";
import Header from "../../components/Header";
import "./preview-form.css";
import PreviewTable from "../../components/PreviewTable";
import { useEffect, useRef, useDispatch} from "react";
 
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
          <PreviewTable />
        </div>
      </div>
    </div>
  );
}

export default PreviewForm;
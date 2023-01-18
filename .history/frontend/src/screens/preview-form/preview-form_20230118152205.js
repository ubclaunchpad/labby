

import { appColor } from "../../constants";
import Header from "../../components/Header";
import "./preview-form.css";
import PreviewTable from "../../components/PreviewTable";
import { useEffect, useRef, useDispatch} from "react";
import { LOAD_BILLABLE } from "../../redux/actions/billingActions";
import { LOAD_ANSWER_BY_SURVEY } from "../../redux/actions/questionActions";

const PreviewForm = () => {

  const invoiceTableRef = useRef(null);
  const surveyId = window.location.pathname.split("/")[2];

  console.log(surveyId);


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
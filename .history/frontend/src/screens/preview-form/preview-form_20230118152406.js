

import { appColor } from "../../constants";
import Header from "../../components/Header";
import "./preview-form.css";
import PreviewTable from "../../components/PreviewTable";
import { useEffect, useRef} from "react";
import { useDispatch } from "react-redux";
import { LOAD_BILLABLE } from "../../redux/actions/billingActions";
import { LOAD_ANSWER_BY_SURVEY } from "../../redux/actions/questionActions";

function PreviewForm() {

  const invoiceTableRef = useRef(null);
  const surveyId = window.location.pathname.split("/")[2];
  console.log(surveyId);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: LOAD_ANSWER_BY_SURVEY, payload: { survey_id: surveyId } });
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
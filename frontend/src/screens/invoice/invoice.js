import { appColor } from "../../constants";
import Header from "../../components/Header";
import "./invoice.css";
import InvoiceTable from "../../components/InvoiceTable";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_BILLABLE } from "../../redux/actions/billingActions";
import GenerateInvoice from "../../components/GenerateInvoice";

function Invoice() {
  const dispatch = useDispatch();

  let initialBillingData = useSelector((state) => { 
    if (state.billingReducer.billingList.length) {
      return state.billingReducer.billingList;
    } else {
      return "No billing data";
    }
  });
  // let initialBillingData  = useSelector(
  //   (state) => state.billingReducer.billingList
  // );
  const [billingData,setBillingData] = useState(initialBillingData);

  useEffect(() => {
    dispatch({ type: LOAD_BILLABLE });
  }, [dispatch]);

  useEffect(()=>{
    setBillingData(initialBillingData)
  },[initialBillingData])

  console.log("Billing data1:" + billingData);

  return (
    <div className="invoicePage">
      <div className="headerComponent">
        <Header />
      </div>
      <div className="invoicePageContent">
        <div className="InvoiceTitle" style={{ color: appColor.gray }}>
          Invoice Dashboard
        </div>
        <div className="InvoiceTable">
          <InvoiceTable />
        </div>
        <GenerateInvoice billingData={billingData} />
      </div>
    </div>
  );
}

export default Invoice;

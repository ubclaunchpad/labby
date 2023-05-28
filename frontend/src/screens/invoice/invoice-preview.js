import { appColor } from "../../constants";
import Header from "../../components/Header";
import "./invoice.css";
import { useRef, useEffect, useState } from "react";
import GeneratePdf from "../../components/GeneratePdf";
import InvoiceTemplate from "../../components/GenerateInvoice/InvoiceTemplate";
import { useDispatch, useSelector } from "react-redux";
import { BILL_BILLABLE, GET_PROJECT, LOAD_BILLABLE } from "../../redux/actions/billingActions";

function InvoicePreview() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_PROJECT });
    dispatch({ type: LOAD_BILLABLE });
  }, [dispatch]);

  const [customerList, setCustomerList] = useState([]);
  const [costcenterMapping, setCostCenterMapping] = useState({});
  const pdfRefs = useRef([]);
  pdfRefs.current = [];

  const addtoRefs = (el) => {
    if (el && !pdfRefs.current.includes(el)) {
      pdfRefs.current.push(el);
    }
  };

  const invoiceList = useSelector((state) => state.billingReducer.invoiceList);
  const projectList = useSelector((state) => state.projectReducer.projectList);

  useEffect(() => {
    if (projectList.length === 0) return;
    const customers = [];
    const projectMap = {};
    invoiceList.forEach((invoice) => {
      const billableProject = invoice.fk_project_id;
      const billableProjectFilter = projectList.find((project) => project.project_id === billableProject);
      const billableCostCenterList = billableProjectFilter.costcenter;
      const costcenter = billableCostCenterList[0] ?? "No Cost Center";
      if (customers.filter((customer) => customer.cost_center_id === costcenter.cost_center_id).length === 0) {
        customers.push(costcenter);
      }
      projectMap[billableProject] = costcenter.cost_center_id;
      dispatch({ type: BILL_BILLABLE, payload: { billableId: invoice.billable_id } });
    });
    setCustomerList(customers);
    setCostCenterMapping(projectMap);
  }, [invoiceList, projectList, dispatch]);

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
          <div>
            {customerList.map((customer, index) => (
              <div ref={addtoRefs} key={customer.cost_center_id ?? index}>
                <InvoiceTemplate customer={customer} costcenterMap={costcenterMapping} />
              </div>
            ))}
          </div>
        </div>
        <GeneratePdf htmlElementRef={pdfRefs} />
      </div>
    </div>
  );
}

export default InvoicePreview;

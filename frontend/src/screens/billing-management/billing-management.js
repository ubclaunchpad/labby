import { appColor } from "../../constants";
import CostTable from "../../components/CostTable";
import Header from "../../components/Header";
import "./billing-management.css";
import AdministrationHeader from "../../components/AdministrationHeader";

function BillingManagement() {
  return (
    <div className="billingManagementPage">
      <div className="headerComponent">
        <Header />
      </div>
      <div className="billingPageContent">
        <div
          className="BillingManagementTitle"
          style={{ color: appColor.gray }}
        >
          Administration
        </div>
        <AdministrationHeader currentPage={"Pricing"} />
        <div className="BillingManagementTable">
          <CostTable />
        </div>
      </div>
    </div>
  );
}

export default BillingManagement;

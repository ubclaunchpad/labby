import { appColor } from "../../constants";
import CostTable from "../../components/CostTable";
import Header from "../../components/Header";
import "./billing-management.css";

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
          Pricing
        </div>
        <div className="BillingManagementTable">
          <CostTable />
        </div>
      </div>
    </div>
  );
}

export default BillingManagement;

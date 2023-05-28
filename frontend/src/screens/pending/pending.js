import { appColor } from "../../constants";
import Header from "../../components/Header";
import "./pending.css";
import PendingTable from "../../components/PendingTable";

function Pending() {
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
          Customer Pending Forms
        </div>
        <div className="BillingManagementTable">
          <PendingTable />
        </div>
      </div>
    </div>
  );
}

export default Pending;

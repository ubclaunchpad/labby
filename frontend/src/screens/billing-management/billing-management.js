import { appColor } from "../../constants";
import ServiceQuestion from "./ServiceQuestion";
import CostTable from "./CostTable";
import Write from "../../assets/Write.svg";
import "./billing-management.css";


function BillingManagement() {

  return (
    <div className="BillingManagementHeader BillingManagement">
      <div className="BillingManagementTitle" style={{ color: appColor.gray }}>
        Pricing
      </div>
      <div className="ServiceQuestion">
        {ServiceQuestion()}
        <div className="BillingAdd">
          <button
            className="BillingAddButton"
            style={{
              backgroundColor: appColor.lightGray,
              color: appColor.gray,
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#4CAF50";
              e.target.style.color = "#FFFFFF";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = appColor.lightGray;
              e.target.style.color = appColor.gray;
            }}
          >
            Add
          </button>
        </div>
        <div className="BillingEdit">
          <img src={Write} alt="Write" />
        </div>
      </div>
      <div className="BillingManagementTable">
        <CostTable />
      </div>
    </div>
  );
}

export default BillingManagement;

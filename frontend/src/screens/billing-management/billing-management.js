import { appColor } from "../../constants";
import CostTable from "../../components/CostTable";
import "./billing-management.css";

function BillingManagement() {
  return (
    <div className="billingManagementPage">
      <div className="BillingManagementTitle" style={{ color: appColor.gray }}>
        Pricing
      </div>
      <div className="addService">
        {/* TODO: replace select with customer dropdown component */}
        <select
          className="ServiceQuestionSelect"
          value="Select your service question here..."
          onChange={() => {}}
        >
          <option value="Select your service question here..." disabled>
            Select your service question here...
          </option>
          <option value="sectioning">Sectioning</option>
          <option value="macrodisection">Macrodisection</option>
          <option value="scrolling">Scrolling</option>
        </select>
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
      <div className="BillingManagementTable">
        <CostTable />
      </div>
    </div>
  );
}

export default BillingManagement;

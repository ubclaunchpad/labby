import { appColor } from "../../constants";
import Header from "../../components/Header";
import "./cost-center.css";
import CostCenterTable from "../../components/CostCenterTable";

function CostCenter() {
  return (
    <div className="costCenterPage">
      <div className="headerComponent">
        <Header />
      </div>
      <div className="costCenterContent">
        <div
          className="costCenterTitle"
          style={{ color: appColor.gray }}
        >
          Cost Center
        </div>
        <div className="costCenterTable">
          <CostCenterTable />
        </div>
      </div>
    </div>
  );
}

export default CostCenter;

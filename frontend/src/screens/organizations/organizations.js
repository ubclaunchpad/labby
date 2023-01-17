import { appColor } from "../../constants";
import Header from "../../components/Header";
import "./organizations.css";
import CostCenterTable from "../../components/CostCenterTable";
import AdministrationHeader from "../../components/AdministrationHeader";

function Organizations() {
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
          Organizations
        </div>
        <AdministrationHeader currentPage={"Organizations"}/>
        <div className="costCenterTable">
          <CostCenterTable />
        </div>
      </div>
    </div>
  );
}

export default Organizations;

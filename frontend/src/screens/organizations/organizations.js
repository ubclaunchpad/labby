import { appColor } from "../../constants";
import Header from "../../components/Header";
import "./organizations.css";
import AdministrationHeader from "../../components/AdministrationHeader";
import OrganizationTable from "../../components/OrganizationTable";

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
          Administration
        </div>
        <AdministrationHeader currentPage={"Organizations"}/>
        <div className="costCenterTable">
          <OrganizationTable />
        </div>
      </div>
    </div>
  );
}

export default Organizations;

import { appColor } from "../../constants";
import Header from "../../components/Header";
import "./projects.css";
import CostCenterTable from "../../components/CostCenterTable";
import AdministrationHeader from "../../components/AdministrationHeader";

function Projects() {
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
          Projects
        </div>
        <AdministrationHeader currentPage={"Projects"}/>
        <div className="costCenterTable">
          <CostCenterTable />
        </div>
      </div>
    </div>
  );
}

export default Projects;

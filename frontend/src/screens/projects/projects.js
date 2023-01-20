import { appColor } from "../../constants";
import Header from "../../components/Header";
import "./projects.css";
import AdministrationHeader from "../../components/AdministrationHeader";
import ProjectTable from "../../components/ProjectTable";

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
          <ProjectTable />
        </div>
      </div>
    </div>
  );
}

export default Projects;

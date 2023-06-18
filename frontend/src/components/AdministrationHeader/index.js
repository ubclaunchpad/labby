import { NavLink } from "react-router-dom";
import "./index.css";

function AdministrationHeader({ currentPage }) {
  return (
    <div className="AdministrationHeaderView">
      <div className="AdministrationHeader">
        <NavLink
          to={`/billing`}
          className={
            currentPage === "Pricing"
              ? "AdministrationTabSelected"
              : "AdministrationTab"
          }
        >
          Pricing
        </NavLink>
        <NavLink
          to={`/costcenter`}
          className={
            currentPage === "Cost Center"
              ? "AdministrationTabSelected"
              : "AdministrationTab"
          }
        >
          Cost Center
        </NavLink>
        <NavLink
          to={`/projects`}
          className={
            currentPage === "Projects"
              ? "AdministrationTabSelected"
              : "AdministrationTab"
          }
        >
          Projects
        </NavLink>
        <NavLink
          to={`/organizations`}
          className={
            currentPage === "Organizations"
              ? "AdministrationTabSelected"
              : "AdministrationTab"
          }
        >
          Organization
        </NavLink>
        <NavLink
          data-testid="users"
          to={`/users`}
          className={
            currentPage === "Users"
              ? "AdministrationTabSelected"
              : "AdministrationTab"
          }
        >
          Users
        </NavLink>
      </div>
      <div className="AdministrationHeaderDivider" />
    </div>
  );
}

export default AdministrationHeader;

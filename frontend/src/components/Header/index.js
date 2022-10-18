import "./index.css";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div data-testid="header">
      <div className="Header">
        <div className="HeaderImage">
          {/* <img src={Labby} alt="Labby Logo" style={{ height: 50 }} /> */}
        </div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "HeaderTitleActive" : "HeaderTitle"
          }
        >
          Tasks
        </NavLink>
        <NavLink
          data-testid="all-components"
          to="/all-components"
          className={({ isActive }) =>
            isActive ? "HeaderTitleActive" : "HeaderTitle"
          }
        >
          Components
        </NavLink>
        <NavLink
          to="/billing"
          className={({ isActive }) =>
            isActive ? "HeaderTitleActive" : "HeaderTitle"
          }
        >
          Billing
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? "HeaderTitleActive" : "HeaderTitle"
          }
        >
          Users
        </NavLink>
        <NavLink
          to="/edit-request"
          className={({ isActive }) =>
            isActive ? "HeaderTitleActive" : "HeaderTitle"
          }
        >
          Edit Request Form
        </NavLink>
        <NavLink
          to="/request"
          className={({ isActive }) =>
            isActive ? "HeaderTitleActive" : "HeaderTitle"
          }
        >
          Request Form
        </NavLink>
      </div>
    </div>
  );
}

export default Header;

import "./index.css";
import { NavLink } from "react-router-dom";
import tasks from "../../assets/Tasks.png";
import form from "../../assets/Form.png";
import money from "../../assets/Money.png";
import statistics from "../../assets/Statistics.png";
import settings from "../../assets/Settings.png";

function Header() {
  return (
    // <div className="header-container" data-testid="header">
    <div className="Header">
      <NavLink
        to="/"
        // className={({ isActive }) =>
        //   isActive ? "HeaderTitleActive" : "HeaderTitle"
        // }
        className="header-navbar--title"
      >
        Labby
      </NavLink>

      <hr></hr>

      <div className="header-navbar-navigation--buttons">
        <NavLink to="/" className="header-navbar--navlink">
          <img className="header-navbar--icon" src={tasks} alt="" />
        </NavLink>

        <NavLink to="/request" className="header-navbar--navlink">
          <img className="header-navbar--icon--skinny" src={form} alt="" />
        </NavLink>

        <NavLink to="/billing" className="header-navbar--navlink">
          <img className="header-navbar--icon" src={money} alt="" />
        </NavLink>

        <NavLink to="/statistic" className="header-navbar--navlink">
          <img className="header-navbar--skinny" src={statistics} alt="" />
        </NavLink>
      </div>

      <NavLink
        to="/settings"
        className="header-navbar--navlink header-navbar--settings-navlink"
      >
        <img className="header-navbar--form" src={settings} alt="" />
      </NavLink>
    </div>
  );
}

export default Header;

import "./index.css";
import { NavLink } from "react-router-dom";
import tasks from "../../assets/Tasks.png";
import form from "../../assets/Form.png";
import money from "../../assets/Money.png";
import statistics from "../../assets/Statistics.png";
import settings from "../../assets/Settings.png";
import tasksSelected from "../../assets/TasksSelected.png";
import formSelected from "../../assets/FormSelected.png";
import moneySelected from "../../assets/MoneySelected.png";
import statisticsSelected from "../../assets/StatisticsSelected.png";
import settingsSelected from "../../assets/SettingsSelected.png";
import { appColor } from "../../constants";

function Header() {
  return (
    <div className="Header" style={{ backgroundColor: appColor.primary }}>
      <NavLink to="/" className="header-navbar--title">
        Labby
      </NavLink>

      <hr />

      <div className="header-navbar-navigation--buttons">
        <NavLink
          to="/tickets"
          className={({ isActive }) =>
            isActive
              ? "header-navbar--navlink--active"
              : "header-navbar--navlink"
          }
        >
          {({ isActive }) =>
            isActive ? (
              <img
                className="header-navbar--icon"
                src={tasksSelected}
                alt="Tasks"
              />
            ) : (
              <img className="header-navbar--icon" src={tasks} alt="Tasks" />
            )
          }
        </NavLink>

        <NavLink
          to="/edit-request"
          className={({ isActive }) =>
            isActive
              ? "header-navbar--navlink--active"
              : "header-navbar--navlink"
          }
        >
          {({ isActive }) =>
            isActive ? (
              <img
                className="header-navbar--icon"
                src={formSelected}
                alt="Form"
              />
            ) : (
              <img className="header-navbar--icon" src={form} alt="Form" />
            )
          }
        </NavLink>

        <NavLink
          to="/billing"
          className={({ isActive }) =>
            isActive
              ? "header-navbar--navlink--active"
              : "header-navbar--navlink"
          }
        >
          {({ isActive }) =>
            isActive ? (
              <img
                className="header-navbar--icon"
                src={moneySelected}
                alt="Billing"
              />
            ) : (
              <img className="header-navbar--icon" src={money} alt="Billing" />
            )
          }
        </NavLink>

        <NavLink
          to="/invoice"
          className={({ isActive }) =>
            isActive
              ? "header-navbar--navlink--active"
              : "header-navbar--navlink"
          }
        >
          {({ isActive }) =>
            isActive ? (
              <img
                className="header-navbar--icon"
                src={statisticsSelected}
                alt="Stats"
              />
            ) : (
              <img
                className="header-navbar--icon"
                src={statistics}
                alt="Stats"
              />
            )
          }
        </NavLink>
      </div>

      <NavLink
        to="/settings"
        className={({ isActive }) =>
          isActive
            ? "header-navbar--navlink--active header-navbar--settings-navlink"
            : "header-navbar--navlink header-navbar--settings-navlink"
        }
      >
        {({ isActive }) =>
          isActive ? (
            <img
              className="header-navbar--icon"
              src={settingsSelected}
              alt="Setting"
            />
          ) : (
            <img className="header-navbar--icon" src={settings} alt="Setting" />
          )
        }
      </NavLink>
    </div>
  );
}

export default Header;

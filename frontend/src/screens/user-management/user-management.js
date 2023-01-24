import { appColor } from "../../constants";
import Header from "../../components/Header";
import "./user-management.css";
import UserManagementTable from "../../components/UserManagementTable";
import AdministrationHeader from "../../components/AdministrationHeader";

function UserManagement() {
  return (
    <div className="userManagementPage">
      <div className="headerComponent">
        <Header />
      </div>
      <div className="userManagementContent">
        <div
          className="userManagementTitle"
          style={{ color: appColor.gray }}
        >
          User Management
        </div>
        <AdministrationHeader currentPage={"Users"}/>
        <div className="userManagementTable">
          <UserManagementTable />
        </div>
      </div>
    </div>
  );
}

export default UserManagement;

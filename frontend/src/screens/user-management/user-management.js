import { appColor } from "../../constants";
import Header from "../../components/Header";
import "./user-management.css";
import UserManagementTable from "../../components/UserManagementTable";

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
        <div className="userManagementTable">
          <UserManagementTable />
        </div>
      </div>
    </div>
  );
}

export default UserManagement;

import { appColor } from "../../constants";
import Header from "../../components/Header";
import "./user-management.css";
import UserManagementTable from "../../components/UserManagementTable";
import ApprovalBox from "../../components/ApprovalBox";
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
          Administration
        </div>
        <AdministrationHeader currentPage={"Users"} />
        <div className="userManagementTable">
          <ApprovalBox />
          <UserManagementTable />
        </div>
      </div>
    </div>
  );
}

export default UserManagement;

import { appColor } from "../../constants";
import { TicketBoard } from "../../components/TicketBoard";
import Header from "../../components/Header";
import "./ticket-management.css";

const TicketManagement = () => {
  return (
    <div className="ticketManagementPage">
      <div className="headerComponent">
        <Header />
      </div>
      <div className="ticketPageContent">
        <div
          className="ticketManagementTitle"
          style={{ color: appColor.gray }}
        >
          Your Tickets
        </div>
        <div className="ticketBoard">
          <TicketBoard />
        </div>
      </div>
    </div>
  );
};

export default TicketManagement;

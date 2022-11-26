import { Input } from "antd";
import { appColor } from "../../constants";
import "./index.css";

export const TicketBoard = () => {
  return (
    <div className="ticketBoardContainer">
      <div className="searchTicketSection">
        <Input placeholder="Search..." className="ticketBoardSearch" />
        <select
          className="ticketBoardDropdown"
          value="Filter..."
          onChange={() => {}}
        >
          <option value="Filter..." disabled>
            Filter
          </option>
          <option value="sectioning">Sectioning</option>
          <option value="macrodisection">Macrodisection</option>
          <option value="scrolling">Scrolling</option>
        </select>
      </div>
      <div>Board goes here</div>
    </div>
  );
};

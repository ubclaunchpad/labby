import React from "react";
import { useSelector } from "react-redux";
import "./index.css";

const InvoiceTotal = () => {
  const dataSource = useSelector((state) => state.billingReducer.billingList);

  const totalServices = dataSource.length.toString().padStart(1, "0");
  const totalSows = dataSource.filter((item) => item.type === "SOW #").length;
  const totalProjects = dataSource.filter((item) => item.type === "Project").length;

  return (
    <div className="InvoiceTotal">
      <div className="invoice-total-container">
        <div className="TotalServices">
          <span className="total-number">{totalServices}</span> Total Services
        </div>
        <div className="TotalSows">
          <span className="total-number">{totalSows}</span> Total SOWs
        </div>
        <div className="TotalProjects">
          <span className="total-number">{totalProjects}</span> Total Projects
        </div>
      </div>
    </div>
  );
};

export default InvoiceTotal;
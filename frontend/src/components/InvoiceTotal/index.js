import React from "react";
import { useSelector } from "react-redux";
import "./index.css";

const InvoiceTotal = () => {
  const dataSource = useSelector(
    (state) => state.billingReducer.billingList
  );

  const totalServices = dataSource.length;
  const totalSows = dataSource.length;
  const totalProjects = dataSource.length;

  return (
    <div className="InvoiceTotal">
      <div className="InvoiceTotalValues">
        <div className="TotalServices">{totalServices}</div>
        <div className="TotalSows">{totalSows}</div>
        <div className="TotalProjects">{totalProjects}</div>
      </div>
      <div className="InvoiceTotalNames">
        <div className="TotalServices">Total Services</div>
        <div className="TotalSows">Total SOWs</div>
        <div className="TotalProjects">Total Projects</div>
      </div>
    </div>
  );
}

export default InvoiceTotal;
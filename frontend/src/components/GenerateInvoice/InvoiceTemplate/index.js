import React, { useState } from "react";
import "./index.css";
import UBC from "../../../assets/UBC.png";

const InvoiceTemplate = () => {
  const todaysDate = new Date();
  const invoiceDate = `${todaysDate.getDate()}-${
    todaysDate.getMonth() + 1
  }-${todaysDate.getFullYear()}`;
  return (
    <div id="invoice-template">
      <div id="invoice-header">
        <div className="invoice-header-columns">
          <div>
            MAPcore
            <br />
            Molecular and Advanced Pathology Core
            <br />
            Room 509 - 2660 Oak Street, Vancouver, BC V6H 3Z6
          </div>

          <div className="ubc-logo">
            <img src={UBC} width="30%" alt="ubc logo" />
          </div>
        </div>
        <h1>Unofficial Invoice</h1>
        <div className="page">
          <div>
            <p className="monospace">Invoice #:</p>
          </div>

          <div className="header-table">
            <div className="header-table-section header-item">
              <p className="header-table-title">Billed to: </p>
              <p className="header-table-content">
                Client Name: <br />
                Client Address: <br/>
                Contact: <br />
                Department: <br />
                Worktag/Email: <br />
              </p>
            </div>
            <div className="header-table-section">
              <div className="header-item-half">
                <p className="header-table-title">Prepared by: </p>
                <p className="header-table-content">
                  Name: Julie Ho <br />
                  Date: {invoiceDate} <br />
                  Demo Details <br />
                </p>
              </div>
              <div className="header-item-half">
                <p className="header-table-title">Project Details: </p>
                <p className="header-table-content">
                  Project Title: <br />
                  Principal Investigator: <br/>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate;

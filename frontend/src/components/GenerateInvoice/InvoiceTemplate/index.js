import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./index.css";
import UBC from "../../../assets/UBC.png";
import InvoiceTable from "../../InvoiceTable";

const InvoiceTemplate = () => {
  const billingData = useSelector((state) => state.billingReducer.billingList);

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
        <h1 className="invoice-title">Unofficial Invoice</h1>
        <div className="page">
          <div>
            <p className="monospace">Invoice #:</p>
          </div>

          <div className="header-table">
            <div className="header-table-section header-item">
              <p className="header-table-title">Billed to: </p>
              <p className="header-table-content">
                Client Name: <br />
                Client Address: <br />
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
                  Principal Investigator: <br />
                </p>
              </div>
            </div>
          </div>

          {/* Update InvoiceTable component to have relevant columns and we can use it here directly */}
          {/* <InvoiceTable/> */}

          <InvoiceDetails billingData={billingData} />
        </div>
      </div>
    </div>
  );
};

function InvoiceDetails({ billingData }) {
  let subtotal = 0;
  for (let item of billingData){
    subtotal += item.cost
  }
  return (
    <>
      <div className="invoice-details-table">
        <table>
          <tbody>
            <tr className="heading">
              <td>Description</td>
              <td>Quantity</td>
              <td>Unit Price</td>
              <td>Total(CAD)</td>
            </tr>

            {billingData.map((invoiceItem, index) => { 
              return (
                <tr className="item">
                  <td>
                    {index + 1}. {invoiceItem.name}
                  </td>
                  <td>{invoiceItem.quantity}</td>
                  <td>${invoiceItem.cost / invoiceItem.quantity}</td>
                  <td>${invoiceItem.cost}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="summary-table">
        <table>
          <tbody>
            <tr className="item">
              <td>Subtotal: </td>
              <td>${subtotal}</td>
            </tr>
            <tr className="item">
              <td>Total Tax:</td>
              <td>${0.12*subtotal}</td>
            </tr>
            <tr className="item">
              <td>Total Due:</td>
              <td className="last">${subtotal+0.12*subtotal}</td>
            </tr>
            <tr className="item total">
              <td>Amount Paid:</td>
              <td>$0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default InvoiceTemplate;

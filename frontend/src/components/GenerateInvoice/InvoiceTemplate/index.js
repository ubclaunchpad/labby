import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./index.css";
import UBC from "../../../assets/UBC.png";
// import InvoiceTable from "../../InvoiceTable";

const InvoiceTemplate = ({ customer, costcenterMap, invoicNum }) => {
  const invoiceList = useSelector((state) => state.billingReducer.invoiceList);


  const todaysDate = new Date();
  const invoiceDate = `${todaysDate.getDate()}-${todaysDate.getMonth() + 1
    }-${todaysDate.getFullYear()}`;

  const [inputValue, setInputValue] = useState({
    note: "",
    date: "",
    signer: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    console.log(inputValue);
  };

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
            <p className="monospace">
              Invoice #: {invoicNum ?? Math.floor(1e8 + Math.random() * 9e8)}
            </p>
          </div>

          <div className="header-table">
            <div className="header-table-section header-item">
              <p className="header-table-title">Billed to: </p>
              <p className="header-table-content">
                Client Name: {customer.cost_center_client_name}<br />
                Address/Department: {customer.cost_center_address}<br />
                Billing Contact: {customer.cost_center_contact}<br />
                Email: {customer.cost_center_email}<br />
                Cost Center/Worktag: {customer.cost_center_name}<br />
              </p>
            </div>
            <div className="header-table-section">
              <div className="header-item-half">
                <p className="header-table-title">Prepared by: </p>
                <p className="header-table-content">
                  Name: Julie Ho <br />
                  Date: {invoiceDate} <br />
                </p>
              </div>
              <div className="header-item-half">
                <p className="header-table-title">Project Details: </p>
                <p className="header-table-content">
                  Project ID: {customer.fk_project_id}<br />
                  Project Name: {customer.project_name}<br />
                  Principal Investigator: {customer.cost_center_investigator}<br />
                </p>
              </div>
            </div>
          </div>

          {/* Update InvoiceTable component to have relevant columns and we can use it here directly */}
          {/* <InvoiceTable/> */}

          <InvoiceDetails billingData={invoiceList.filter((billable) => {
            return costcenterMap[billable.fk_project_id] === customer.cost_center_id
          })} />

          <label htmlFor="notes"><br/><br/>All MAPcore invoices should be deposited to EABJ / PM009455</label>

          <div>
            <div className="signer-form">
              <label htmlFor="notes">Notes:</label>
              <input
                type="text"
                id="notes"
                className="border-bottom"
                name="note"
                value={inputValue.note}
                onChange={handleChange}
              />
            </div>

            {/* <div className="signer">
              <div className="signer-form signer-item">
                <label htmlFor="date">Date:</label>
                <input
                  //   type="datetime-local"
                  type="text"
                  id="date"
                  className="border-bottom"
                  name="date"
                  value={inputValue.date}
                  onChange={handleChange}
                />
              </div>

              <div className="signer-form signer-item">
                <label htmlFor="signature">Signed by:</label>
                <input
                  type="text"
                  id="signature"
                  className="border"
                  name="signer"
                  value={inputValue.signer}
                  onChange={handleChange}
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

function InvoiceDetails({ billingData }) {
  let subtotal = 0;
  for (let item of billingData) {
    subtotal += (item.cost * (item.sample_id ? 1 : item.quantity));
  }
  return (
    <>
      <div className="invoice-details-table">
        <table>
          <tbody>
            <tr className="heading">
              <td>Description</td>
              <td>SOW</td>
              <td>User</td>
              <td>Quantity</td>
              <td>Unit Price</td>
              <td>Total(CAD)</td>
            </tr>

            {billingData.map((invoiceItem, index) => {
              return (
                <tr className="item" key={invoiceItem.billable_id + (invoiceItem.sample_id ?? "")}>
                  <td>
                    {invoiceItem.name} {invoiceItem.sample_id ? `- ${invoiceItem.sample_id}; ${invoiceItem.authorized_by}` : ""}
                  </td>
                  <td>{`${invoiceItem.task_id ?? (invoiceItem.subtask_id ?? "?")}`}</td>
                  <td>{invoiceItem.username}</td>
                  <td>{invoiceItem.sample_id ? 1 : invoiceItem.quantity}</td>
                  <td>${invoiceItem.cost}</td>
                  <td>${(invoiceItem.cost * (invoiceItem.sample_id ? 1 : invoiceItem.quantity)).toFixed(2)}</td>
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
              <td>Total Due: </td>
              <td>${subtotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default InvoiceTemplate;

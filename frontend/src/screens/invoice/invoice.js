import { appColor } from "../../constants";
import Header from "../../components/Header";
import "./invoice.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InvoiceGraph from "../../components/InvoiceGraph";
import InvoiceCalendar from "../../components/InvoiceCalendar";
import InvoiceTable from "../../components/InvoiceTable";
import InvoiceTotal from "../../components/InvoiceTotal";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { LOAD_BILLABLE } from "../../redux/actions/billingActions";
import GenerateInvoice from "../../components/GenerateInvoice";
import { Chart } from "../../components/Chart/Chart";
import { DateRange } from "react-date-range";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

function Invoice() {
  const dispatch = useDispatch();
  const invoiceTableRef = useRef(null);
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: undefined,
    key: "selection",
  });

  useEffect(() => {
    dispatch({ type: LOAD_BILLABLE });
  }, [dispatch]);

  return (
    <div className="invoicePage">
      <div className="headerComponent">
        <Header />
      </div>
      <div className="invoicePageContent">
        <div className="invoice-page-header">
          <div className="InvoiceTitle" style={{ color: appColor.gray }}>
            Billing & Invoicing
          </div>
          <div className="generate-invoice-button">
            <GenerateInvoice />
          </div>
        </div>

        <div className="widgets-container">
          <div className="invoices-statistics-container">
            <div className="invoices-chart-container">
              <Chart />
            </div>
            <div className="InvoiceTotal" style={{ color: appColor.gray }}>
              <InvoiceTotal />
            </div>
          </div>
          <div className="search-invoices-container">
            <div className="searchInvoiceSection">
              <input
                type="text"
                placeholder="Search..."
                className="invoiceTableSearch"
                // NEED TO ADD ONCHANGE FOR SEARCHING
              />
            </div>
            <div className="form-calender-container">
              <div className="search-invoices-form-container">
                <form
                  onSubmit={handleSubmit((data) => {
                    console.log(data);
                    setData(JSON.stringify(data));
                  })}
                  className="search-invoices-form"
                >
                  <label>
                    Service:
                    <select
                      className="search-invoices-form--input"
                      {...register("service", { required: true })}
                    >
                      <option value="">Select...</option>
                    </select>
                  </label>
                  <label>
                    Cost Center
                    <select
                      className="search-invoices-form--input"
                      {...register("costCenter", { required: true })}
                    >
                      <option value="">Select...</option>
                      <option value="A">Option A</option>
                      <option value="B">Option B</option>
                    </select>
                  </label>
                  <label>
                    Project:
                    <select
                      className="search-invoices-form--input"
                      {...register("project", { required: true })}
                    >
                      <option value="">Select...</option>
                    </select>
                  </label>
                  <label>
                    Organization
                    <select
                      className="search-invoices-form--input"
                      {...register("organization", { required: true })}
                    >
                      <option value="">Select...</option>
                    </select>
                  </label>
                  <label>
                    User
                    <select
                      className="search-invoices-form--input"
                      {...register("user", { required: true })}
                    >
                      <option value="">Select...</option>
                    </select>
                  </label>
                </form>
              </div>
              <div className="search-invoices-calendar-container">
                <div className="search-invoices-calendar">
                  <DateRange
                    editableDateInputs={true}
                    ranges={[dateRange]}
                    onChange={({ selection }) => {
                      console.log("These are the ranges -->", selection);
                      setDateRange(selection);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="InvoiceTable" ref={invoiceTableRef}>
          <InvoiceTable />
        </div>
      </div>
    </div>
  );
}

export default Invoice;

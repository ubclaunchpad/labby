import { appColor } from "../../constants";
import Header from "../../components/Header";
import "./invoice.css";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import InvoiceTable from "../../components/InvoiceTable";
import InvoiceTotal from "../../components/InvoiceTotal";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_COSTCENTER,
  GET_PROJECT,
  LOAD_BILLABLE,
} from "../../redux/actions/billingActions";
import GenerateInvoice from "../../components/GenerateInvoice";
import { Chart } from "../../components/Chart/Chart";
import { DateRange } from "react-date-range";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import {
  GET_ORGANIZATION,
  LOAD_USERLIST,
} from "../../redux/actions/userActions";
import { LOAD_ALL_COST } from "../../redux/actions/costActions";

function Invoice() {
  const dispatch = useDispatch();
  const invoiceTableRef = useRef(null);
  const { register, handleSubmit } = useForm();
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: undefined,
    key: "selection",
  });

  const servicesData = useSelector(
    (state) => state?.costReducer?.costTableServices
  );
  const costCenterData = useSelector(
    (state) => state?.costCenterReducer?.costcenterList
  );
  const projectData = useSelector(
    (state) => state?.projectReducer?.projectList
  );
  const organizationData = useSelector(
    (state) => state?.userReducer?.organizationList
  );
  const usersData = useSelector((state) => state?.userReducer?.userList);
  const onSubmit = (data) => {
    const filters = {
      ...data,
      start_date: dateRange.startDate,
      end_date: dateRange.endDate,
    };
    console.log(filters);
  };

  useEffect(() => {
    dispatch({ type: LOAD_BILLABLE });
    if (costCenterData.length === 0) {
      dispatch({ type: GET_COSTCENTER });
    }
    if (usersData.length === 0) {
      dispatch({ type: LOAD_USERLIST });
    }
    if (organizationData.length === 0) {
      dispatch({ type: GET_ORGANIZATION });
    }
    if (projectData.length === 0) {
      dispatch({ type: GET_PROJECT });
    }
    if (servicesData === 0) {
      dispatch({ type: LOAD_ALL_COST });
    }
  }, [
    dispatch,
    usersData,
    organizationData,
    projectData,
    costCenterData,
    servicesData,
  ]);

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
                  onSubmit={handleSubmit(onSubmit)}
                  className="search-invoices-form"
                >
                  <label>
                    Service:
                    <select
                      className="search-invoices-form--input"
                      {...register("service")}
                      onBlur={handleSubmit(onSubmit)}
                    >
                      <option value="">Select service...</option>
                      {servicesData.map((service) => {
                        return (
                          <option key={service.key} value={service?.service}>
                            {service.service}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                  <label>
                    Cost Center
                    <select
                      className="search-invoices-form--input"
                      {...register("costcenter_id")}
                      onBlur={handleSubmit(onSubmit)}
                    >
                      <option value="">Select cost center... </option>
                      {costCenterData.map((costCenter) => {
                        return (
                          <option
                            key={costCenter?.cost_center_id}
                            value={costCenter?.cost_center_id}
                          >
                            {costCenter?.cost_center_name}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                  <label>
                    Project:
                    <select
                      className="search-invoices-form--input"
                      {...register("project_id")}
                      onBlur={handleSubmit(onSubmit)}
                    >
                      <option value="">Select project... </option>
                      {projectData.map((project) => {
                        return (
                          <option
                            key={project?.project_id}
                            value={project?.project_id}
                          >
                            {project?.project_name}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                  <label>
                    Organization
                    <select
                      className="search-invoices-form--input"
                      {...register("organization_id")}
                      onBlur={handleSubmit(onSubmit)}
                    >
                      <option value="">Select organization... </option>
                      {organizationData.map((organization) => {
                        return (
                          <option
                            key={organization.organization_id}
                            value={organization.organization_id}
                          >
                            {organization.organization_name}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                  <label>
                    User
                    <select
                      className="search-invoices-form--input"
                      {...register("user_id")}
                      onBlur={handleSubmit(onSubmit)}
                    >
                      <option value="">Select user... </option>
                      {usersData.map((user) => (
                        <option key={user.user_id} value={user.user_id}>
                          {user.username}
                        </option>
                      ))}
                    </select>
                  </label>
                </form>
              </div>
              <div className="search-invoices-calendar-container">
                <div
                  className="search-invoices-calendar"
                  onBlur={handleSubmit(onSubmit)}
                >
                  <DateRange
                    editableDateInputs={true}
                    ranges={[dateRange]}
                    onChange={({ selection }) => {
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

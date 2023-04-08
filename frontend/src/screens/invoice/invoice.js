import { appColor } from "../../constants";
import Header from "../../components/Header";
import "./invoice.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import InvoiceTable from "../../components/InvoiceTable";
import InvoiceTotal from "../../components/InvoiceTotal";
import ServicesAnalytics from "../../components/ServicesAnalytics";
import ProjectsAnalytics from "../../components/ProjectsAnalytics";
import SowAnalytics from "../../components/SowAnalytics";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BILLABLE,
  GET_COSTCENTER,
  GET_PROJECT,
  LOAD_BILLABLE,
  SET_BILLABLE,
  UPDATE_CLICKS
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
import { LOAD_QUESTION } from "../../redux/actions/questionActions";


function Invoice() {
  const currentDate = new Date();
  const timestamp = currentDate.getTime();  
  const dispatch = useDispatch();
  const invoiceTableRef = useRef(null);
  const { register, handleSubmit } = useForm();
  const [dateRange, setDateRange] = useState({
    startDate: undefined,
    endDate: undefined,
    key: "selection",
  });

  const invoiceDataSourceOG = useSelector(
    (state) => state.billingReducer.billingListOG
  );

  const servicesObject = useSelector(
    (state) => state?.questionReducer?.answerList
  );
  const serviceData = Object.values(servicesObject).flat();

  const costCenterData = useSelector(
    (state) => state?.costCenterReducer?.costcenterList
  );
  const projectData = useSelector(
    (state) => state?.projectReducer?.projectList
  );
  const organizationData = useSelector(
    (state) => state?.userReducer?.organizationList
  );
  const servicesAnalytics = useSelector(
    (state) => state.billingReducer.servicesAnalytics
  );
  const projectsAnalytics = useSelector(
    (state) => state.billingReducer.projectsAnalytics
  );
  const sowAnalytics = useSelector(
    (state) => state.billingReducer.sowAnalytics
  );
  const usersData = useSelector((state) => state?.userReducer?.userList);
  const onSubmit = (data) => {
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);
    const start = startDate.toISOString();
    const end = endDate.toISOString();
    const filters = {
      ...data,
      start_date: start,
      end_date: end,
    };
    const emptyValues = Object.values(filters).every((value) => !value);
    if (emptyValues) {
      dispatch({ type: SET_BILLABLE, payload: invoiceDataSourceOG });
    } else {
      dispatch({ type: FILTER_BILLABLE, payload: filters });
    }
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
    dispatch({ type: LOAD_QUESTION });
  }, [dispatch, usersData, organizationData, projectData, costCenterData]);

  useEffect(() => {
    const storedTime = JSON.parse(localStorage.getItem("lastMountTime"));
    const currentTime = new Date().getTime();
    {console.log(storedTime)}
    {console.log(currentTime)}
  
    if (!storedTime || currentTime - storedTime > 60000) {
      {console.log("update")}
      dispatch({
        type: UPDATE_CLICKS,
        payload: {
          component_name: "billing_page"
        },
      });
      localStorage.setItem("lastMountTime", JSON.stringify(currentTime));
    }
  }, []);

  return (
  <div className="invoicePageContainer">
    <div>
      {servicesAnalytics ? <ServicesAnalytics/> : null}
      {projectsAnalytics ? <ProjectsAnalytics/> : null}
      {sowAnalytics ? <SowAnalytics/> : null}
    </div>
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
            <div className="InvoiceTotal" 
                 style={{ color: appColor.gray }}
                 >
              <InvoiceTotal  />
            </div>
          </div>
          <div className="search-invoices-container">
            <div className="searchInvoiceSection">
              <input
                type="text"
                placeholder="Search..."
                className="invoiceTableSearch"
                // NEED TO ADD ONCHANGE FOR SEARCHING
                onBlur={(text) => {
                  const searchTerm = text.target.value;

                  if (searchTerm === "") {
                    dispatch({
                      type: SET_BILLABLE,
                      payload: invoiceDataSourceOG,
                    });
                  } else {
                    const filteredData = invoiceDataSourceOG.filter((item) => {
                      const objectString = Object.values(item).join(" ");

                      return objectString
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase());
                    });
                    dispatch({ type: SET_BILLABLE, payload: filteredData });
                  }
                }}
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
                      {serviceData.map((service) => {
                        return (
                          <option
                            key={service?.answer_id}
                            value={service?.answer}
                          >
                            {service.answer}
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
  </div>
  );
}

export default Invoice;

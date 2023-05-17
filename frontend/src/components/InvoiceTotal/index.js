import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import {
  SET_ACTIVE_ANALYTICS,
  SET_ACTIVE_PROJECT_ANALYTICS,
  SET_ACTIVE_SOW_ANALYTICS,
  UPDATE_CLICKS
} from "../../redux/actions/billingActions";

const InvoiceTotal = () => {
  const dispatch = useDispatch();
  const dataSource = useSelector((state) => state.billingReducer.billingList);
  const totalServices = dataSource.length.toString().padStart(1, "0");
  let sowMap = {};
  let projectMap = {};
  dataSource.forEach((item) => {
    sowMap[item.task_uuid] = true;
    projectMap[item.fk_project_id] = true;
  });

  return (
    <div className="InvoiceTotal">
      <div className="invoice-total-container">
        <div className="TotalServices"
                onClick={() => {
                  dispatch({ type: SET_ACTIVE_ANALYTICS });
                  dispatch({
                    type: UPDATE_CLICKS,
                    payload: {
                      component_name: "services_chart"
                    },
                  });
               }}>
          <span className="total-number" >{totalServices}</span> Total Services
        </div>
        <div className="TotalSows"
                onClick={() => {
                  dispatch({ type: SET_ACTIVE_SOW_ANALYTICS });
                  dispatch({
                    type: UPDATE_CLICKS,
                    payload: {
                      component_name: "sow_chart"
                    },
                  });
                }}>
          <span className="total-number">{Object.keys(sowMap).length}</span> Total SOWs
        </div>
        <div className="TotalProjects"
                onClick={() => {
                  dispatch({ type: SET_ACTIVE_PROJECT_ANALYTICS });
                  dispatch({
                    type: UPDATE_CLICKS,
                    payload: {
                      component_name: "projects_chart"
                    },
                  });
               }}>
          <span className="total-number">{Object.keys(projectMap).length}</span> Total Projects
        </div>
      </div>
    </div>
  );
};

export default InvoiceTotal;
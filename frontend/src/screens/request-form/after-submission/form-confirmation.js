import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

import ExperimentIcon from "../../../assets/experiment.svg";
import { LOAD_BILLABLE_BY_SOWID } from "../../../redux/actions/billingActions";
import "./form-confirmation.css";

function FormConfirmation() {
  const [loadProgressPage, setLoadProgressPage] = useState(false);
  const dispatch = useDispatch();
  const billables = useSelector(
    (state) => state.billingReducer.billablesBySOWIDMap
  );

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: LOAD_BILLABLE_BY_SOWID,
        payload: {
          sowId: localStorage.getItem("currentSurveyId"),
        },
      });
    }, 1000);
  }, [dispatch]);

  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    if (
      localStorage.getItem("currentSurveyId") &&
      billables[localStorage.getItem("currentSurveyId")] != null
    ) {
      const seenMap = {};
      const ds = billables[localStorage.getItem("currentSurveyId")].filter(
        (item) => {
          if (seenMap[item.billable_id]) return false;
          seenMap[item.billable_id] = true;
          return true;
        }
      );
      setDataSource(ds);
    }
  }, [billables]);

  return (
    <div className="formConfirmationPage">
      <h4>Thank you!</h4>
      <h2>Your request has been submitted</h2>
      <img src={ExperimentIcon} alt="" />
      <h3>Request Summary</h3>
      <table>
        <tbody>
          <tr>
            <th>Service</th>
            <th>Quantity</th>
            <th>Estimated Cost</th>
          </tr>
          {localStorage.getItem("currentSurveyId") &&
          billables[localStorage.getItem("currentSurveyId")] != null ? (
            dataSource.map((billable, idx) => {
              return (
                <tr key={idx}>
                  <td>
                    {billable.name}
                    {Object.values(
                      billables[localStorage.getItem("currentSurveyId")].filter(
                        (item) => item.billable_id === billable.billable_id
                      )
                    ).map((item) => {
                      return (
                        <div key={item.sample_id}>
                          {item.sample_id} - {item.authorized_by}
                        </div>
                      );
                    })}
                  </td>
                  <td>{billable.quantity}</td>
                  <td>{billable.cost}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td> Loading... </td>
              <td> Loading... </td>
              <td> Loading... </td>
            </tr>
          )}
          {localStorage.getItem("currentSurveyId") &&
          billables[localStorage.getItem("currentSurveyId")] != null &&
          billables[localStorage.getItem("currentSurveyId")].length <= 0 ? (
            <tr>
              <td>
                {" "}
                Only services with costs associated will be displayed here{" "}
              </td>
            </tr>
          ) : null}
          <tr>
            <td> </td>
            <td> </td>
            <td> </td>
          </tr>
        </tbody>
      </table>
      <div className="FormSubmit">
        <div
          onClick={() => {
            setLoadProgressPage(true);
          }}
          className="progressPageLink"
        >
          View all my requests
        </div>
        {loadProgressPage && <Navigate to={`/request-progress`} />}
      </div>
    </div>
  );
}

export default FormConfirmation;

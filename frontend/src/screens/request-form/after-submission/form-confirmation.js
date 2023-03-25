import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

import ExperimentIcon from "../../../assets/experiment.svg";
import { LOAD_BILLABLE_BY_SOWID } from "../../../redux/actions/billingActions";
import "./form-confirmation.css";

function FormConfirmation() {
  const [loadProgressPage, setLoadProgressPage] = useState(false);
  const dispatch = useDispatch();
  const billables = useSelector((state) => state.billingReducer.billablesBySOWIDMap);


  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: LOAD_BILLABLE_BY_SOWID, payload: {
        sowId: localStorage.getItem("currentSurveyId")
      }})
    }, 1000)
  }, [dispatch]);
  
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
          {localStorage.getItem("currentSurveyId") && billables[localStorage.getItem("currentSurveyId")] != null ? (
            billables[localStorage.getItem("currentSurveyId")].map((billable, idx) => {
              return (
                <tr key={idx}>
                  <td>{billable.name}</td>
                  <td>{billable.quantity}</td>
                  <td>{billable.cost}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td> N/A </td>
              <td> N/A </td>
              <td> N/A </td>
            </tr>
          )}
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

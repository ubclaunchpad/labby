import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

import ExperimentIcon from "../../../assets/experiment.svg";
import { LOAD_BILLABLE_BY_SOWID } from "../../../redux/actions/billingActions";
import "./form-confirmation.css";

function FormConfirmation() {
  const [loadProgressPage, setLoadProgressPage] = useState(false);
  const [currentSurveyId, setCurrentSurveyId] = useState(null);
  const dispatch = useDispatch();
  const billables = useSelector((state) => state.billingReducer.billingList);
  
  useEffect(() => {
    setCurrentSurveyId(localStorage.getItem("currentSurveyId"))
    console.log(localStorage.getItem("currentSurveyId"))
  }, [])

  useEffect(() => {
    dispatch({ type: LOAD_BILLABLE_BY_SOWID, payload: {
      survey_id: currentSurveyId
    }})
  }, [dispatch, currentSurveyId])

  // console.log(currentUser);
  // const formId = window.location.pathname.split("/")[2];
  // const allFormSubmissions = useSelector(
  //   (state) => state.formReducer.formSubmissions
  // );

  // const currentFormSubmission = allFormSubmissions.filter(
  //   (formSubmission) => formSubmission.formId === formId
  // )[0];
  // // let billables;
  // // TODO: query information from data base instead 
  // // sow_id is the survey id
  // // can query the database for the fk_user_id but what happens if have multiple survey_ids?
  // // how do i get the survey_id on the frontend?
  // // my plan is to store the survey id in local storage if they really need to acquire it agai
  // if (currentFormSubmission) {
  //   billables = currentFormSubmission.billables;
  // } else {
  //   // if this page is not redirected to dynamically after form submission, but visited directly by url
  //   billables = [];
  // }
  // console.log(billables);
  return (
    <div className="formConfirmationPage">
      {/* <h4>Thank you!</h4>
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
          {billables.length ? (
            billables.map((billable) => {
              return (
                <tr>
                  <td>{billable.service}</td>
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
        {loadProgressPage && <Navigate to={`/request-progress/${formId}`} />}
      </div> */}
    </div>
  );
}

export default FormConfirmation;

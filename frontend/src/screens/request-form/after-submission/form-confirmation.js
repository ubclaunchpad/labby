import { useDispatch, useSelector } from "react-redux";

import ExperimentIcon from "../../../assets/experiment.svg";

import "./form-confirmation.css";

function FormConfirmation() {
  const dispatch = useDispatch();
  const formId = window.location.pathname.split("/")[2];
  const formSubmission = useSelector(
    (state) => state.formReducer.formSubmissions
  );
  console.log(formSubmission);
  return (
    <div className="formConfirmationPage">
      <h4>Thank you!</h4>
      <h2>Your request has been submitted</h2>
      <img src={ExperimentIcon} alt="" />
      <h3>Request Summary</h3>
      <table>
        <tr>
          <th>Service</th>
          <th>Quantity</th>
          <th>Estimated Cost</th>
        </tr>
        <tr>
          <td>Microtomy</td>
          <td>12</td>
          <td>$</td>
        </tr>
        <tr>
          <td>Consultation</td>
          <td>12</td>
          <td>$</td>
        </tr>
        <tr>
          <td>Single-plex IHC</td>
          <td>3</td>
          <td>$</td>
        </tr>
        <tr>
          <td> </td>
          <td> </td>
          <td> </td>
        </tr>
      </table>
    </div>
  );
}

export default FormConfirmation;

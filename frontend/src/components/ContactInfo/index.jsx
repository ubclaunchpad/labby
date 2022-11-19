import "./index.css";
import "../index.css";
import Divider from "../Divider";
import uuid from "react-uuid";
import { useDispatch } from "react-redux";
import {
  ADD_EMAIL_RESPONSE,
  ADD_FULLNAME_RESPONSE,
  ADD_INSTITUTION_RESPONSE,
  ADD_PHONE_RESPONSE,
  REMOVE_EMAIL_RESPONSE,
  REMOVE_FULLNAME_RESPONSE,
  REMOVE_INSTITUTION_RESPONSE,
  REMOVE_PHONE_RESPONSE,
} from "../../redux/actions/formActions";

function ContactInfo({ question }) {
  const dispatch = useDispatch();
  const nameAnswerId = uuid();
  const institutionAnswerId = uuid();
  const emailAnswerId = uuid();
  const telephoneAnswerId = uuid();

  return (
    <div className="GlobalCustomerQuestionContainer">
      <div className="GlobalQuestionTitle">{question.question}</div>
      <div className="contact-info-container">
        <div className="contact-info-container-inner">
          <div className="contact-info-row-customer">
            <span className="contact-info-field-label-customer">Full Name</span>
            <input
              className="contact-info-user-input-customer"
              type="text"
              placeholder="Type Here... "
              onBlur={(e) => {
                if (e.target.value !== "") {
                  dispatch({
                    type: ADD_FULLNAME_RESPONSE,
                    payload: {
                      id: nameAnswerId,
                      response: "FULLNAME_" + e.target.value,
                      question: question,
                    },
                  });
                } else {
                  dispatch({
                    type: REMOVE_FULLNAME_RESPONSE,
                    payload: { question: question },
                  });
                }
              }}
            ></input>
          </div>
          <div className="contact-info-row-customer">
            <span className="contact-info-field-label-customer">
              Institution
            </span>
            <input
              className="contact-info-user-input-customer"
              type="text"
              placeholder="Type Here... "
              onBlur={(e) => {
                if (e.target.value !== "") {
                  dispatch({
                    type: ADD_INSTITUTION_RESPONSE,
                    payload: {
                      id: institutionAnswerId,
                      response: "INSTITUTION_" + e.target.value,
                      question: question,
                    },
                  });
                } else {
                  dispatch({
                    type: REMOVE_INSTITUTION_RESPONSE,
                    payload: { question: question },
                  });
                }
              }}
            ></input>
          </div>
          <div className="contact-info-row-customer">
            <span className="contact-info-field-label-customer">Email</span>
            <input
              className="contact-info-user-input-customer"
              type="email"
              placeholder="Type Here... "
              onBlur={(e) => {
                if (e.target.value !== "") {
                  dispatch({
                    type: ADD_EMAIL_RESPONSE,
                    payload: {
                      id: emailAnswerId,
                      response: "EMAIL_" + e.target.value,
                      question: question,
                    },
                  });
                } else {
                  dispatch({
                    type: REMOVE_EMAIL_RESPONSE,
                    payload: { question: question },
                  });
                }
              }}
            ></input>
          </div>
          <div className="contact-info-row-customer">
            <span className="contact-info-field-label-customer">Telephone</span>
            <input
              className="contact-info-user-input-customer"
              type="number"
              placeholder="Type Here... "
              onBlur={(e) => {
                if (e.target.value !== "") {
                  dispatch({
                    type: ADD_PHONE_RESPONSE,
                    payload: {
                      id: telephoneAnswerId,
                      response: "PHONE_" + e.target.value,
                      question: question,
                    },
                  });
                } else {
                  dispatch({
                    type: REMOVE_PHONE_RESPONSE,
                    payload: { question: question },
                  });
                }
              }}
            ></input>
          </div>
        </div>
      </div>
      <Divider />
    </div>
  );
}

export default ContactInfo;

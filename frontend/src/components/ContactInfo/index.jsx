import "./index.css";
import "../index.css";
import { useEffect, useState } from "react";
import Divider from "../Divider";
import uuid from "react-uuid";
import { useDispatch } from "react-redux";
import { ADD_RESPONSE } from "../../redux/actions/formActions";

function ContactInfo({ question }) {
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const [institution, setInstitution] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const nameAnswerId = uuid();
  const institutionAnswerId = uuid();
  const emailAnswerId = uuid();
  const telephoneAnswerId = uuid();

  useEffect(() => {
    const fields = { fullName, institution, email, telephone };
    console.log(fields);
  }, [fullName, institution, email, telephone]);

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
                setFullName(e.target.value);
                dispatch({type: ADD_RESPONSE, payload: {id: nameAnswerId, value: "TODO"}})
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
                setInstitution(e.target.value);
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
                setEmail(e.target.value);
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
                setTelephone(e.target.value);
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

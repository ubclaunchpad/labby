import "./index.css";
import "../index.css";
import Divider from "../Divider";
import uuid from "react-uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_ACCOUNT_RESPONSE,
  ADD_ADDRESS_RESPONSE,
  ADD_EMAIL_RESPONSE,
  ADD_FINANCIAL_RESPONSE,
  ADD_FULLNAME_RESPONSE,
  ADD_INSTITUTION_RESPONSE,
  ADD_INVESTIGATOR_RESPONSE,
  ADD_PHONE_RESPONSE,
  ADD_WORKTAG_RESPONSE,
  REMOVE_ACCOUNT_RESPONSE,
  REMOVE_ADDRESS_RESPONSE,
  REMOVE_EMAIL_RESPONSE,
  REMOVE_FINANCIAL_RESPONSE,
  REMOVE_FULLNAME_RESPONSE,
  REMOVE_INSTITUTION_RESPONSE,
  REMOVE_INVESTIGATOR_RESPONSE,
  REMOVE_PHONE_RESPONSE,
  REMOVE_WORKTAG_RESPONSE,
} from "../../redux/actions/formActions";
import { GET_ORGANIZATION } from "../../redux/actions/userActions";
import { useEffect, useState } from "react";

function ContactInfo({ question }) {
  const dispatch = useDispatch();
  const nameAnswerId = uuid();
  const institutionAnswerId = uuid();
  const emailAnswerId = uuid();
  const telephoneAnswerId = uuid();
  const financialAnswerId = uuid();
  const investigatorAnswerId = uuid();
  const worktagAnswerId = uuid();
  const addressAnswerId = uuid();
  const accountAnswerId = uuid();
  const [userOrgType, setUserOrgType] = useState("Industry");

  const currentUser = useSelector(
    (state) => state.userReducer.currentUser
  );
  const orgList = useSelector(
    (state) => state.userReducer.organizationList
  );

  useEffect(() => {
    dispatch({ type: GET_ORGANIZATION });
  }, [dispatch]);

  useEffect(() => {
    const currentUserOrg = currentUser.organization_id;
    orgList.forEach((org) => {
      if (org.organization_id === currentUserOrg) {
        setUserOrgType(org.organization_type);
      }
    });
  }, [currentUser, orgList]);

  const [selectedValue, setSelectedValue] = useState(null);
  const handleChange = (event) => {
    const selected = JSON.parse(event.target.value);
    setSelectedValue(selected);

    dispatch({
      type: ADD_INSTITUTION_RESPONSE,
      payload: {
        id: institutionAnswerId,
        response: "INSTITUTION_" + selected.organization_name,
        question: question,
      },
    });
  };

  return (
    <div className="GlobalCustomerQuestionContainer">
      <div className="GlobalQuestionTitle">
        {question.question}{" "}
        <p style={{ color: "red" }}>{question.mandatory ? "*" : ""}</p>
      </div>
      <div className="customer__component__subtitle">{question.question_note}</div>
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
            <select className="select" onChange={handleChange}>
              {selectedValue === null && <option key={"Default"} value={""} />}
              {orgList.map((option) => (
                <option key={option.organization_id} value={JSON.stringify(option)}>
                  {option.organization_name}
                </option>
              ))}
              <option key={"Other"} value={JSON.stringify("Other")}>
                {"Other"}
              </option>
            </select>
            {selectedValue === "Other" ? <input
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
            /> : null}
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
          <div className="contact-info-row-customer">
            <span className="contact-info-field-label-customer">Financial Contact</span>
            <input
              className="contact-info-user-input-customer"
              placeholder="Type Here... "
              onBlur={(e) => {
                if (e.target.value !== "") {
                  dispatch({
                    type: ADD_FINANCIAL_RESPONSE,
                    payload: {
                      id: financialAnswerId,
                      response: "FINANCIAL_" + e.target.value,
                      question: question,
                    },
                  });
                } else {
                  dispatch({
                    type: REMOVE_FINANCIAL_RESPONSE,
                    payload: { question: question },
                  });
                }
              }}
            ></input>
          </div>
          {userOrgType === "Internal" ? <div>
            <div className="contact-info-row-customer">
              <span className="contact-info-field-label-customer">Investigator(s)</span>
              <input
                className="contact-info-user-input-customer"
                placeholder="Type Here... "
                onBlur={(e) => {
                  if (e.target.value !== "") {
                    dispatch({
                      type: ADD_INVESTIGATOR_RESPONSE,
                      payload: {
                        id: investigatorAnswerId,
                        response: "INVESTIGATOR_" + e.target.value,
                        question: question,
                      },
                    });
                  } else {
                    dispatch({
                      type: REMOVE_INVESTIGATOR_RESPONSE,
                      payload: { question: question },
                    });
                  }
                }}
              ></input>
            </div>
            <div className="contact-info-row-customer">
              <span className="contact-info-field-label-customer">UBC Worktag (XX###)</span>
              <input
                className="contact-info-user-input-customer"
                placeholder="Type Here... "
                onBlur={(e) => {
                  if (e.target.value !== "") {
                    dispatch({
                      type: ADD_WORKTAG_RESPONSE,
                      payload: {
                        id: worktagAnswerId,
                        response: "WORKTAG_" + e.target.value,
                        question: question,
                      },
                    });
                  } else {
                    dispatch({
                      type: REMOVE_WORKTAG_RESPONSE,
                      payload: { question: question },
                    });
                  }
                }}
              ></input>
            </div>
          </div> : null}
          {userOrgType === "External" ? <div>
            <div className="contact-info-row-customer">
              <span className="contact-info-field-label-customer">Address</span>
              <input
                className="contact-info-user-input-customer"
                placeholder="Type Here... "
                onBlur={(e) => {
                  if (e.target.value !== "") {
                    dispatch({
                      type: ADD_ADDRESS_RESPONSE,
                      payload: {
                        id: addressAnswerId,
                        response: "ADDRESS_" + e.target.value,
                        question: question,
                      },
                    });
                  } else {
                    dispatch({
                      type: REMOVE_ADDRESS_RESPONSE,
                      payload: { question: question },
                    });
                  }
                }}
              ></input>
            </div>
            <div className="contact-info-row-customer">
              <span className="contact-info-field-label-customer">Account Information</span>
              <input
                className="contact-info-user-input-customer"
                placeholder="Type Here... "
                onBlur={(e) => {
                  if (e.target.value !== "") {
                    dispatch({
                      type: ADD_ACCOUNT_RESPONSE,
                      payload: {
                        id: accountAnswerId,
                        response: "ACCOUNT_" + e.target.value,
                        question: question,
                      },
                    });
                  } else {
                    dispatch({
                      type: REMOVE_ACCOUNT_RESPONSE,
                      payload: { question: question },
                    });
                  }
                }}
              ></input>
            </div>
          </div> : null}
        </div>
      </div>
      <Divider />
    </div>
  );
}

export default ContactInfo;

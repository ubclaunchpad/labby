import React from "react";
import Header from "../../components/Header";
import "./request-form.css";

export const RequestForm = () => {
  return (
    <div className="requestFormPage">
      <div className="headerComponent">
        <Header />
      </div>
      <div className="requestFormContainer">Request Form</div>
    </div>
  );
};

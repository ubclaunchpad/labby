import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import EditRequest from "./screens/edit-request/edit-request";
import RequestForm from "./screens/request-form/request-form";
import PreviewForm from "./screens/preview-form/preview-form";
import FormConfirmation from "./screens/request-form/after-submission/form-confirmation";
import FormProgress from "./screens/request-form/after-submission/form-progress";
import BillingManagement from "./screens/billing-management/billing-management";
import TicketManagement from "./screens/ticket-management/ticket-management";
import Invoice from "./screens/invoice/invoice";
import FormLibrary from "./screens/form-library/form-library";
import CostCenter from "./screens/cost-center/cost-center";
import UserManagement from "./screens/user-management/user-management";
import InvoicePreview from "./screens/invoice/invoice-preview";
import Organizations from "./screens/organizations/organizations";
import Projects from "./screens/projects/projects";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
// import ForgotPasswordForm from "./components/ForgotPasswordForm";
import Setting from "./screens/setting/setting";
import { useDispatch, useSelector } from "react-redux";
import { PING } from "./redux/actions/userActions";
import { START_LOADING } from "./redux/actions/uiActions";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state) => state.userReducer.currentUser
  );
  const loading = useSelector(
    (state) => state.uiReducer.loading
  );

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      dispatch({type: START_LOADING});
      dispatch({type: PING, payload: JSON.parse(user)});
    }
  }, [dispatch]);

  if (loading) {
    return null;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={(currentUser && currentUser.employee) ? <TicketManagement /> : (currentUser ? <Setting /> : <LoginForm from={window.location.pathname} />)} />
          <Route path="/edit-form/:formId" element={(currentUser && currentUser.employee) ? <EditRequest /> : (currentUser ? <Setting /> : <LoginForm from={window.location.pathname} />)} />
          <Route path="/billing" element={(currentUser && currentUser.employee) ? <BillingManagement /> : (currentUser ? <Setting /> : <LoginForm from={window.location.pathname} />)} />
          <Route path="/costcenter" element={(currentUser && currentUser.employee) ? <CostCenter /> : (currentUser ? <Setting /> : <LoginForm from={window.location.pathname} />)} />
          <Route path="/projects" element={(currentUser && currentUser.employee) ? <Projects /> : (currentUser ? <Setting /> : <LoginForm from={window.location.pathname} />)} />
          <Route path="/organizations" element={(currentUser && currentUser.employee) ? <Organizations /> : (currentUser ? <Setting /> : <LoginForm from={window.location.pathname} />)} />
          <Route path="/users" element={(currentUser && currentUser.employee) ? <UserManagement /> : (currentUser ? <Setting /> : <LoginForm from={window.location.pathname} />)} />
          <Route path="/edit-request" element={(currentUser && currentUser.employee) ? <FormLibrary /> : (currentUser ? <Setting /> : <LoginForm from={window.location.pathname} />)} />
          <Route path="/request/:formId" element={currentUser ? <RequestForm /> : <LoginForm from={window.location.pathname} />} />
          <Route path="/request-confirmation/:formId" element={currentUser ? <FormConfirmation /> : <LoginForm from={window.location.pathname} />} />
          <Route path="/request-progress/:formId" element={currentUser ? <FormProgress /> : <LoginForm from={window.location.pathname} />} />
          <Route path="/preview/:surveyId" element={(currentUser && currentUser.employee) ? <PreviewForm /> : (currentUser ? <Setting /> : <LoginForm from={window.location.pathname} />)} />
          <Route path="/invoice" element={(currentUser && currentUser.employee) ? <Invoice /> : (currentUser ? <Setting /> : <LoginForm from={window.location.pathname} />)} />
          <Route path="/settings" element={currentUser ? <Setting /> : <LoginForm from={window.location.pathname} />} />
          <Route path="/tickets" element={(currentUser && currentUser.employee) ? <TicketManagement /> : (currentUser ? <Setting /> : <LoginForm from={window.location.pathname} />)} />
          <Route path="/pdf" element={(currentUser && currentUser.employee) ? <InvoicePreview /> : (currentUser ? <Setting /> : <LoginForm from={window.location.pathname} />)} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          {/* <Route path="/forgotPassword" element={<ForgotPasswordForm />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

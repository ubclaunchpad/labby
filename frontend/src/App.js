import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import EditRequest from "./screens/edit-request/edit-request";
import RequestForm from "./screens/request-form/request-form";
import BillingManagement from "./screens/billing-management/billing-management";
import TicketManagement from "./screens/ticket-management/ticket-management";
import Invoice from "./screens/invoice/invoice";
import FormLibrary from "./screens/form-library/form-library";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TicketManagement />} />
          <Route path="/edit-form/:formId" element={<EditRequest />} />
          <Route path="/billing" element={<BillingManagement />} />
          <Route path="/users" element={<EditRequest />} />
          <Route path="/edit-request" element={<FormLibrary />} />
          <Route path="/request/:formId" element={<RequestForm />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/settings" element={<EditRequest />} />
          <Route path="/tickets" element={<TicketManagement />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import EditRequest from "./screens/edit-request/edit-request";
import RequestForm from "./screens/request-form/request-form";
import PreviewForm from "./screens/preview-form/preview-form";
import BillingManagement from "./screens/billing-management/billing-management";
import TicketManagement from "./screens/ticket-management/ticket-management";
import Invoice from "./screens/invoice/invoice";
import FormLibrary from "./screens/form-library/form-library";
import CostCenter from "./screens/cost-center/cost-center";
import PDF from "./components/GenerateInvoice/pdf";
import { PDFViewer } from "@react-pdf/renderer";
import UserManagement from "./screens/user-management/user-management";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TicketManagement />} />
          <Route path="/edit-form/:formId" element={<EditRequest />} />
          <Route path="/billing" element={<BillingManagement />} />
          <Route path="/costcenter" element={<CostCenter />} />
          <Route path="/users" element={<EditRequest />} />
          <Route path="/edit-request" element={<FormLibrary />} />
          <Route path="/request/:formId" element={<RequestForm />} />
          <Route path="/preview/:surveyId" element={<PreviewForm />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/settings" element={<UserManagement />} />
          <Route path="/tickets" element={<TicketManagement />} />
          <Route
            path="/pdf"
            element={
              <PDFViewer style={{ width: "100vw", height: "100vh" }}>
                <PDF />
              </PDFViewer>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

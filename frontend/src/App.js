import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import EditRequest from "./screens/edit-request/edit-request";
import { RequestForm } from "./screens/request-form/request-form";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EditRequest />} />
          <Route path="/billing" element={<EditRequest />} />
          <Route path="/users" element={<EditRequest />} />
          <Route path="/edit-request" element={<EditRequest />} />
          <Route path="/request" element={<EditRequest />} />
          <Route path="/statistic" element={<EditRequest />} />
          <Route path="/settings" element={<EditRequest />} />
          <Route path="/request-form" element={<RequestForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import EditRequest from './screens/edit-request/edit-request';

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

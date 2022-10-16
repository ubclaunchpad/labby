import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Counter } from './features/counter/Counter';
import './App.css';
import EditRequest from './screens/edit-request/edit-request';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<EditRequest />} />
            <Route path="/billing" element={<Counter />} />
            <Route path="/users" element={<Counter />} />
            <Route path="/edit-request" element={<Counter />} />
            <Route path="/request" element={<Counter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from "react";

import Header from "../../components/Header";
import { DropdownDefault, DropdownAdvanced } from "../../components/Dropdown";
import "./component-showcase.css";

const ComponentShowcase = () => {
  return (
    <>
      <Header />
      <div className="container">
        <h3>DropdownDefault</h3>
        <DropdownDefault />

        <h3>DropdownAdvanced</h3>
        <DropdownAdvanced />
      </div>
    </>
  );
};

export default ComponentShowcase;

import React from "react";

import Header from "../../components/Header";
import { DropdownDefault, DropdownAdvanced } from "../../components/Dropdown";
import { TextInput, TextInputMultiline } from "../../components/TextInput";
import "./component-showcase.css";

const ComponentShowcase = () => {
  return (
    <>
      <Header />
      <div data-testid ="dropdown" className="container">
        <h3>DropdownDefault</h3>
        <DropdownDefault />

        <h3>DropdownAdvanced</h3>
        <DropdownAdvanced />

        <h3>TextInput</h3>
        <TextInput />

        <h3>TextInputMultiline</h3>
        <TextInputMultiline />
      </div>
    </>
  );
};

export default ComponentShowcase;

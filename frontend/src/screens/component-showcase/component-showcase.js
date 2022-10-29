import React from "react";

import Header from "../../components/Header";
import { DropdownDefault, DropdownAdvanced } from "../../components/Dropdown";
import { TextInput, TextInputMultiline } from "../../components/TextInput";
import { FileInput } from "../../components/FileInput";
import { AntdCard, DefaultCard } from "../../components/Card";
import "./component-showcase.css";

const ComponentShowcase = () => {
  return (
    <div data-testid="dropdown" className="wrapper">
      <Header />
      <div className="componentsContainer">
        <h3>DropdownDefault</h3>
        <DropdownDefault />

        <h3>DropdownAdvanced</h3>
        <DropdownAdvanced />

        <h3>TextInput</h3>
        <TextInput />

        <h3>TextInputMultiline</h3>
        <TextInputMultiline />

        <h3>DefaultCard (A container component)</h3>
        <DefaultCard>Something</DefaultCard>

        <h3>AntdCard (A container component)</h3>
        <AntdCard>Something</AntdCard>

        <h3>FileInput</h3>
        <FileInput questionNumber="1" />

        <h3>FileInput</h3>
        <FileInput questionNumber="2" />
      </div>
    </div>
  );
};

export default ComponentShowcase;

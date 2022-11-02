import React from "react";
import Header from "../../components/Header";
import { DropdownDefault, DropdownAdvanced } from "../../components/Dropdown";
import { TextInput, TextInputMultiline } from "../../components/TextInput";
import FileInput from "../../components/FileInput";
import { AntdCard, DefaultCard } from "../../components/Card";
import "./component-showcase.css";
import { ContactInfo } from "../../components/ContactInfo";
import { SingleSelect } from "../../components/SingleSelect";
import MultiSelect from "../../components/MultiSelect";

const ComponentShowcase = () => {
  return (
    <div data-testid="dropdown" className="wrapper">
      <Header />
      <div className="componentsContainer">
        <h3>DropdownDefault</h3>
        <DropdownDefault />

        <h3>DropdownAdvanced</h3>
        <DropdownAdvanced />

        <h3>DefaultCard (A container component)</h3>
        <DefaultCard>Something</DefaultCard>

        <h3>AntdCard (A container component)</h3>
        <AntdCard>Something</AntdCard>

        <h3>Single Select</h3>
        <SingleSelect questionNumber={3} />
        <h3>Contact Info </h3>
        <ContactInfo questionNumber={5} />
        <h3>MultiSelect:</h3>
        <MultiSelect questionNumber={4} />
      </div>
    </div>
  );
};

export default ComponentShowcase;

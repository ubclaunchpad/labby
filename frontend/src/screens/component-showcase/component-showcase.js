import React from "react";
import Header from "../../components/Header";
import { DropdownDefault, DropdownAdvanced } from "../../components/Dropdown";
import { AntdCard, DefaultCard } from "../../components/Card";
import "./component-showcase.css";
import { SingleSelect } from "../../components/SingleSelect";
import { MultiSelect } from "../../components/MultiSelect";

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
        <h3>MultiSelect:</h3>
        <MultiSelect questionNumber={4} />
      </div>
    </div>
  );
};

export default ComponentShowcase;

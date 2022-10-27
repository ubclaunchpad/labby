import "./index.css";
import { DefaultCard } from "../../Card";

function ComponentLibrary() {
  return (
    <>
      <div className="elementContainer">
        <div className="elementsTitle">Question Elements</div>
        <DefaultCard>Multiple choice</DefaultCard>
        <DefaultCard> Single selection </DefaultCard>
        <DefaultCard> Text answer</DefaultCard>
        <DefaultCard> Dropdown </DefaultCard>
      </div>
      <div className="elementContainer">
        <div className="elementsTitle">Layout Elements</div>
        <DefaultCard> Heading </DefaultCard>
        <DefaultCard> Text line </DefaultCard>
      </div>
      <div className="elementContainer">
        <div className="elementsTitle">Media Elements</div>
        <DefaultCard> File upload </DefaultCard>
        <DefaultCard> File download </DefaultCard>
      </div>
      <div className="elementContainer">
        <div className="elementsTitle">Billing Elements</div>
        <DefaultCard> Contact information </DefaultCard>
      </div>
    </>
  );
}

export default ComponentLibrary;

import { appColor } from "../../constants";
import Add from "../../assets/Add.png";
import "./index.css";

function FormTile({ item }) {
  if (item === "Fill") {
    return <div className="formPageFill" />;
  }

  if (item === "NewForm") {
    return (
      <div className="formPageNewItem">
        <div className="formPageNewItemTitle">
          <img className="AddImage" src={Add} alt="Add a New Form" />
          <div className="NewFormTitle">Create New Form</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="formPageItem"
      style={{ backgroundColor: appColor.lightGray }}
    >
      <div className="formPageImageTile" />
      <div className="formPageItemTitle" style={{ color: appColor.gray }}>
        {item.form_name}
      </div>
    </div>
  );
}

export default FormTile;

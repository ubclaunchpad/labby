import { appColor } from "../../constants";
import Add from "../../assets/Add.png";
import X from "../../assets/X.png";
import "./index.css";
import uuid from "react-uuid";
import { useDispatch } from "react-redux";
import { DELETE_FORM } from "../../redux/actions/formActions";

function FormTile({ item }) {
  const dispatch = useDispatch();

  if (item === "Fill") {
    return <div className="formPageFill" />;
  }

  if (item === "NewForm") {
    return (
      <div className="formPageNewItem" onClick={() => {
        window.location.href = `/edit-form/${uuid()}`;
      }}>
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
      onClick={() => {
        window.location.href = `/edit-form/${item.form_id}`;
      }}
    >
      <img
          className="GlobalEditorDelete"
          src={X}
          style={{ marginTop: 10, marginRight: 10 }}
          alt="Delete"
          onClick={(e) => {
            e.stopPropagation();
            dispatch({type: DELETE_FORM, payload: item})
          }}
        />
      <div className="formPageImageTile" />
      <div className="formPageItemTitle" style={{ color: appColor.gray }}>
        {item.form_name}
      </div>
    </div>
  );
}

export default FormTile;

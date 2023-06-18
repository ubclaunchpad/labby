import { appColor, frontend } from "../../constants";
import AddForm from "../../assets/AddForm.png";
import X from "../../assets/X.png";
import Share from "../../assets/Share.png";
import Check from "../../assets/Check.png";
import "./index.css";
import uuid from "react-uuid";
import { useDispatch } from "react-redux";
import { DELETE_FORM } from "../../redux/actions/formActions";
import { NavLink } from "react-router-dom";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { SuccessToast } from "../Toasts";

function FormTile({ item }) {
  const dispatch = useDispatch();
  const [, copyToClipboard] = useCopyToClipboard();

  if (item === "Fill") {
    return <div className="formPageFill" />;
  }

  if (item === "NewForm") {
    return (
      <div className="formPageNewItem"
        data-testid="createNew"
        onClick={() => {
          window.location.href = `/edit-form/${uuid()}`;
        }}>
        <div className="formPageNewItemTitle">
          <img className="AddImage" src={AddForm} alt="Add a New Form" />
          <div className="NewFormTitle">Create New Form</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="formPageItem"
      style={{ backgroundColor: "#E7EBFF" }}
      onClick={() => {
        window.location.href = `/edit-form/${item.form_id}`;
      }}
    >
      <img
        data-testid={"formDelete_" + item.form_name}
        className="GlobalEditorDelete"
        src={X}
        style={{ position: "absolute", right: 20, top: 20, width: 18, height: 18 }}
        alt="Delete"
        onClick={(e) => {
          e.stopPropagation();
          dispatch({ type: DELETE_FORM, payload: item })
        }}
      />
      <div className="formPageItemTitle" style={{ color: appColor.textGray }}>
        {item.form_name}
      </div>
      <div className="formCellDivider" />
      <div className="formCellStatus">
        <div className="formPublishedText">
          {item.published ? <img
            className="FormPublishedCheck"
            src={Check}
            alt="Check"
          /> : null}
          {item.published ? "Published" : ""}
        </div>
        <div className="formShareSpace">
          <div
            className="formShareCircle"
            onClick={(e) => {
              e.stopPropagation();
              SuccessToast("Form Link Copied to Clipboard!");
              copyToClipboard(`${frontend}request/${item.form_id}`);
            }}
          >
            <img
              className="shareButton"
              src={Share}
              alt="Share"
            />
          </div>
        </div>
        <div className="formPreviewSpace">
          <NavLink to={`/preview-request/${item.form_id}`} onClick={(e) => {
            e.stopPropagation();
          }}>
            <div className="formPreview">
              Preview
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default FormTile;

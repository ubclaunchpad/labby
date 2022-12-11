import { appColor } from "../../constants";
import "./index.css";

function FormTile({ item }) {
  return (
    <div className="formPageItem">
      <div className="formPageItemTitle" style={{ color: appColor.gray }}>
        {item}
      </div>
    </div>
  );
}

export default FormTile;

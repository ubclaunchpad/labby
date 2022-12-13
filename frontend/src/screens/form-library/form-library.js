import { appColor } from "../../constants";
import Header from "../../components/Header";
import "./form-library.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormTile from "../../components/FormTile";
import { LOAD_FORMS } from "../../redux/actions/formActions";

function FormLibrary() {
  const dispatch = useDispatch();
  const [fillItems, setFillItems] = useState([]);
  const formList = useSelector((state) => state.formReducer.formList);

  useEffect(() => {
    dispatch({ type: LOAD_FORMS });
  }, [dispatch]);

  useEffect(() => {
    let items = [];
    let numFill = 4 - ((formList.length + 1) % 4);
    if (numFill !== 4 && numFill !== 0) {
      for (let i = 0; i < numFill; i++) {
        items.push("fill");
      }
    }
    setFillItems(items);
  }, [formList]);

  return (
    <div className="formPage">
      <div className="headerComponent">
        <Header />
      </div>
      <div className="formPageContent">
        <div className="formPageTitle" style={{ color: appColor.gray }}>
          My Forms
        </div>
        <div className="formCells">
          {formList.map((item, _) => {
            return (
              <div key={item.form_id}>
                <FormTile item={item} />
              </div>
            );
          })}
          <div key={"NewForm"}>
            <FormTile item={"NewForm"} />
          </div>
          {fillItems.map((_, index) => {
            return (
              <div key={index}>
                <FormTile item={"Fill"} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FormLibrary;

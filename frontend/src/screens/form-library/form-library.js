import { appColor } from "../../constants";
import Header from "../../components/Header";
import "./form-library.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LOAD_BILLABLE } from "../../redux/actions/billingActions";
import FormTile from "../../components/FormTile";

function FormLibrary() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: LOAD_BILLABLE });
  }, [dispatch]);

  let items = [
    "hello",
    "world",
    "this",
    "is",
    "a",
    "test",
    "array",
    "of",
    "strings",
  ];

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
        {items.map((item, index) => {
          return (
            <div key={index}>
                <FormTile item={item} />
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}

export default FormLibrary;

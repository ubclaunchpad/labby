import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LOAD_QUESTION } from "../../redux/actions/questionActions";
import BuilderLibrary from "../../components/BuilderLibrary";
import FormBuilder from "../../components/FormBuilder";
import Header from "../../components/Header";
import "./edit-request.css";

function EditRequest() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: LOAD_QUESTION });
  }, [dispatch]);

  return (
    <div className="EditRequestPage">
      <div style={{ backgroundColor: "green", width: "100px" }}>{Header()}</div>
      <div style={{ flex: 6 }}>{FormBuilder()}</div>
      <div style={{ flex: 2 }}>{BuilderLibrary()}</div>
    </div>
  );
}

export default EditRequest;

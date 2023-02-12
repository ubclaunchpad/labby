import "../index.css";
import { Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_QUESTION,
  SAVE_QUESTION,
} from "../../redux/actions/questionActions";
import { SET_LOGIC_VIEW_QUESTION } from "../../redux/actions/logicActions";
import { TOGGLE_LOGIC } from "../../redux/actions/uiActions";

function EditComponentFooter({ question }) {
  const dispatch = useDispatch();
  const logicList = useSelector((state) => state.logicReducer.logicList);

  return (
    <div className="GlobalEditorComponentFooter">
      {logicList[question.question_id] ? (
        <div
          className="GlobalEditorLogicAdded"
          onClick={() => {
            dispatch({
              type: TOGGLE_LOGIC,
              payload: true,
            });
            dispatch({
              type: SET_LOGIC_VIEW_QUESTION,
              payload: question,
            });
          }}
        >
          Logic Added
        </div>
      ) : (
        <div />
      )}
      <div className="GlobalEditorRequiredQuestion">
        <div className="GlobalEditorCheckbox">
          <Checkbox
            style={{ color: "#AEAEAE", padding: 3 }}
            checked={question.clinical === 1}
            onClick={(e) => {
              dispatch({
                type: SAVE_QUESTION,
                payload: {
                  ...question,
                  form_id: question.fk_form_id,
                  question_title: question.question,
                  clinical: e.target.checked,
                  question_index: question.position_index,
                },
              });
              dispatch({ type: LOAD_QUESTION, payload: question.fk_form_id });
            }}
          />
          Clinical Service
        </div>
        <div className="GlobalEditorCheckbox">
          <Checkbox
            style={{ color: "#AEAEAE", padding: 3 }}
            checked={question.mandatory === 1}
            onClick={(e) => {
              dispatch({
                type: SAVE_QUESTION,
                payload: {
                  ...question,
                  form_id: question.fk_form_id,
                  question_title: question.question,
                  mandatory: e.target.checked,
                  question_index: question.position_index,
                },
              });
              dispatch({ type: LOAD_QUESTION, payload: question.fk_form_id });
            }}
          />
          Required
        </div>
      </div>
    </div>
  );
}

export default EditComponentFooter;

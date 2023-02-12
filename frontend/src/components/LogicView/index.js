import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_LOGIC } from "../../redux/actions/uiActions";
import SideArrow from "../../assets/SideArrow.png";
import "./index.css";
import { appColor } from "../../constants";
import { DELETE_LOGIC } from "../../redux/actions/logicActions";

function LogicView() {
  const dispatch = useDispatch();
  const selectedQuestion = useSelector(
    (state) => state.logicReducer.currentLogicViewQuestion
  );
  const logicView = useSelector((state) => state.uiReducer.logicView);
  const logicList = useSelector((state) => state.logicReducer.logicList);
  const answerList = useSelector((state) => state.questionReducer.answerList);
  const formId = window.location.pathname.split("/")[2];

  if (logicView && logicList && logicList[selectedQuestion.question_id]) {
    return (
      <div
        className="LogicContainer"
        onClick={() => {
          dispatch({
            type: TOGGLE_LOGIC,
            payload: false,
          });
        }}
      >
        <div
          className="LogicView"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="LogicTitle">Your Added Logic</div>
          <div className="LogicText">
            For{" "}
            <div className="LogicTextInside">{`Q${selectedQuestion.position_index}: ${selectedQuestion.question}`}</div>
          </div>
          <div className="LogicDivider" />
          {logicList[selectedQuestion.question_id].map((logic) => {
            const answerArray = Object.values(answerList).flat();
            const answerObjArray = answerArray.filter(
              (answer) => answer.answer_id === logic.fk_answer_id
            );
            const answerObj = answerObjArray[0];

            if (answerObj) {
              return (
                <div className="LogicItem" key={logic.condition_id}>
                  <div className="LogicText">Display this question if</div>
                  <img
                    className="LogicArrow"
                    src={SideArrow}
                    alt="Side Arrow"
                  />
                  <div className="LogicText">{`Q${answerObj.position_index}: ${answerObj.question}`}</div>
                  <img
                    className="LogicArrow"
                    src={SideArrow}
                    alt="Side Arrow"
                  />
                  <div className="LogicBox">
                    <div className="LogicText">{answerObj.answer}</div>
                  </div>
                  <img
                    className="LogicArrow"
                    src={SideArrow}
                    alt="Side Arrow"
                  />
                  <div className="LogicText">is selected</div>
                  <button
                    className="LogicDeleteButton"
                    style={{
                      backgroundColor: appColor.primaryLight,
                      color: appColor.white,
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = appColor.primaryDark;
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = appColor.primaryLight;
                    }}
                    onClick={() => {
                      dispatch({
                        type: DELETE_LOGIC,
                        payload: {
                          logic_id: logic.condition_id,
                          form_id: formId,
                        },
                      });
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            } else {
              return null;
            }
          })}
          <div className="LogicDivider" />
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default LogicView;

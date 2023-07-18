import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import "./index.css";
import X from "../../assets/X.png";
import { ADD_CLINICAL_RESPONSE, REMOVE_CLINICAL_RESPONSE } from "../../redux/actions/formActions";

function ClinicalBox({ question, option }) {
  const dispatch = useDispatch();
  const clinicalList = useSelector(
    (state) => state.formReducer.clinicalResponses
  );

  return (
    <div className="clinicalBox">
      <div className="clinicalInstruction">
        Please provide the following clinical details:
      </div>
      <div className="clinicalHeader">
        <div className="headerLeft">Sample ID</div>
        <div className="headerRight">Ordering Pathologist</div>
      </div>
      {Object.values(clinicalList)
        .filter((value) => value.answer === option.answer_id)
        .map((clinical, index) => (
          <div key={index} className="clinical">
            <div className="clinicalInputView">
              <input
                className="clinicalInput"
                defaultValue={clinical.sample_id}
                onBlur={(e) => {
                  dispatch({
                    type: ADD_CLINICAL_RESPONSE,
                    payload: {
                      ...clinical,
                      sample_id: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div className="clinicalInputView">
              <input
                className="clinicalInput"
                defaultValue={clinical.authorized_by}
                onBlur={(e) => {
                  dispatch({
                    type: ADD_CLINICAL_RESPONSE,
                    payload: {
                      ...clinical,
                      authorized_by: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div className="clinicalXView" onClick={() => {
              dispatch({ type: REMOVE_CLINICAL_RESPONSE, payload: clinical.clinical_id })
            }}>
              <img src={X} className="clinicalX" alt="Delete Service" />
            </div>
          </div>
        ))}
      <div
        className="clinicalAdd"
        onClick={() => {
          dispatch({
            type: ADD_CLINICAL_RESPONSE,
            payload: {
              clinical_id: uuid(),
              question: question.question_id,
              answer: option.answer_id,
              sample_id: "",
              authorized_by: "",
            },
          });
        }}
      >
        + Add
      </div>
    </div>
  );
}

export default ClinicalBox;

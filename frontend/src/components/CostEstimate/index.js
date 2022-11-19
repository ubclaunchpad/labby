
import "./index.css";
import { appColor } from "../../constants";
import X from "../../assets/X.png";
// import Divider from "../Divider";
import { width } from "@mui/system";


function CostEstimate() {
    return (
        <div
        className="CostEstimateContainer"
        style={{ backgroundColor: appColor.lightGray }}
         >
        <div className="CostEstimateTitle">Cost Estimate</div>
        <span className="CostEstimateHeadings">
                <p>Service</p>
                <p>Quantity</p>
                <p>Cost</p>
        </span>
        <div className = "CostEstimateDivider" />
        <div className="GlobalEditorComponent">
        <img
          className="GlobalEditorDelete"
          src={X}
          alt="Delete"
        //   onClick={() => {
        //     questionList.forEach((questionObj) => {
        //       if (questionObj.position_index >= question.position_index) {
        //         questionObj.question_index = questionObj.position_index - 1;
        //         questionObj.question_title = questionObj.question;
        //         dispatch({ type: SAVE_QUESTION, payload: questionObj });
        //       }
        //     });
        //     dispatch({
        //       type: DELETE_QUESTION,
        //       payload: {
        //         question_id: question.question_id,
        //       },
        //     });
        //     dispatch({ type: LOAD_QUESTION });
        //   }}
        />
        </div>
        <div className = "CostDivider" />
        <div className="CostEstimateTotal">Total</div>
      </div>
    )
}


export default CostEstimate;
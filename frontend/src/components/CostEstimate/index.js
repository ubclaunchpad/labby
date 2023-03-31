import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_COST_ESTIMATE } from "../../redux/actions/uiActions";
import "./index.css";
import { appColor } from "../../constants";
import MoneyGray from "../../assets/MoneyGray.png";
import Ellipse from "../../assets/Ellipse.png";
import X from "../../assets/X.png";

export const CostEstimateCollapsed = () => {
  const dispatch = useDispatch();
  return (
    <button
      className="CostEstimateCollapsedContainer"
      style={{ backgroundColor: appColor.lightGray }}
      onClick={() => {
        dispatch({ type: TOGGLE_COST_ESTIMATE });
      }}
    >
      <img className="Ellipse" src={Ellipse} alt="Ellipse" />
      <img className="MoneyGray" src={MoneyGray} alt="Money" />
    </button>
  );
};

export const CostEstimateFull = () => {
  var isUrgent = false;
  var urgentMultiplier = 1.5;
  const dispatch = useDispatch();
  const costEstimateMap = useSelector(
    (state) => state.costEstimateReducer.costEstimateList
  );
  const formResponses = useSelector((state) => state.formReducer.formResponses);
  let costSum = 0;

  formResponses.some((response) => {
    if (response.question.question_type === "urgent") {
      isUrgent = response.question.answer === "Yes" ? true : false;
    }
    return null;
  });

  return (
    <div className="CostEstimateContainer" style={{ background: "#F5F5F5" }}>
      <img
        className="CostEstimateDelete"
        src={X}
        alt="Delete"
        onClick={() => {
          dispatch({ type: TOGGLE_COST_ESTIMATE });
        }}
      />
      <div className="CostEstimateTitle">Cost Estimate</div>
      <span className="CostEstimateHeadings">
        <p>Service</p>
        <p>Quantity</p>
        <p>Cost</p>
      </span>

      <div className="CostEstimates">
        {formResponses.map((response) => {
          const cost = isUrgent ? urgentMultiplier * costEstimateMap.get(response.question.answer_id) : costEstimateMap.get(response.question.answer_id);
          let quantity = response.quantity ?? 1;
          costSum += cost * quantity;
          return (
            <div className="CostBox" key={response.question.answer}>
              <div className="CostLeft"> {response.question.answer} </div>
              <div className="CostCenter"> {`${quantity}`} </div>
              <div className="CostRight">
                {cost != null ? `$${cost * quantity}` : "N/A"}
              </div>
            </div>
          );
        })}
      </div>
      <div className="CostEstimateDivider" />
      <div className="CostDivider" />
      <div className="CostEstimateTotal">Total</div>
      <div className="costEstimateFinalCost">
        {costSum ? `$${costSum}` : "N/A"}
      </div>
      <div className="Warning">
        {" "}
        This total is an automatically generated cost estimate
      </div>
    </div>
  );
};

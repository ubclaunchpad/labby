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
      style={{ backgroundColor: appColor.primaryLight }}
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
  const dispatch = useDispatch();
  const costEstimateMap = useSelector(
    (state) => state.costEstimateReducer.costEstimateList
  );
  const formResponses = useSelector((state) => state.formReducer.formResponses);
  let costSum = 0;

  return (
    <div className="CostEstimateContainer" style={{ background: appColor.primaryWhite }}>
      <div className="CostEstimateHeader">
        <div className="CostEstimateTitle">Cost Estimate</div>
        <img
          className="CostEstimateDelete"
          src={X}
          alt="Delete"
          onClick={() => {
            dispatch({ type: TOGGLE_COST_ESTIMATE });
          }}
        />
      </div>

      <div className="CostEstimates">
        {formResponses.map((response) => {
          if (!costEstimateMap || costEstimateMap.length === 0) {
            return null;
          }
          const cost = costEstimateMap.get(response.response) ?? 0;
          let quantity = response.quantity ?? 1;
          costSum += cost * quantity;
          if (cost !== null && cost !== 0) {
            return (
              <div className="CostBox" key={response.question.answer}>
                <div className="CostLeft"> {response.question.answer} </div>
                <div className="CostCenter"> {`x${quantity}`} </div>
                <div className="CostRight">
                  {`$${cost * quantity}`}
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="CostEstimateDivider" />
      <div className="CostDivider" />
      <div className="CostEstimateTotal">Total</div>
      <div className="costEstimateFinalCost">
        {costSum ? `$${costSum}` : "N/A"}
      </div>
      <div className="Warning">
        This total is an automatically generated cost estimate.
      </div>
    </div>
  );
};

import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_LOGIC } from "../../redux/actions/uiActions";
import "./index.css";
import { appColor } from "../../constants";
import MoneyGray from "../../assets/MoneyGray.png";
import Ellipse from "../../assets/Ellipse.png";
import X from "../../assets/X.png";

export const CostEstimate = () => {
  const dispatch = useDispatch();
  const costEstimateView = useSelector(
    (state) => state.costEstimateReducer.costEstimateView
  );

  if (costEstimateView) {
    return (
      <div
        className="CostEstimateContainer"
        style={{ background: appColor.white }}
      >
        <button
          className="CostEstimateCollapsedContainer"
          style={{ backgroundColor: appColor.lightGray }}
          onClick={() => {
            dispatch({
              type: TOGGLE_LOGIC,
              payload: false,
            });
          }}
        >
          <img className="Ellipse" src={Ellipse} />
          <img className="MoneyGray" src={MoneyGray} />
        </button>
      </div>
    );
  } else {
    return (
      <div className="CostEstimateContainer" style={{ background: "#F5F5F5" }}>
        <img
          className="CostEstimateDelete"
          src={X}
          alt="Delete"
          onClick={() => {
            dispatch({
              type: TOGGLE_LOGIC,
              payload: true,
            });
          }}
        />
        <div className="CostEstimateTitle">Cost Estimate</div>

        <span className="CostEstimateHeadings">
          <p>Service</p>
          <p>Quantity</p>
          <p>Cost</p>
        </span>
        <div className="CostEstimateDivider" />
        <div className="CostDivider" />
        <div className="CostEstimateTotal">Total</div>
      </div>
    );
  }
};

export const CostEstimateCollapsed = () => {
  return (
    <div
      className="CostEstimateContainer"
      style={{ background: appColor.white }}
    >
      <button
        className="CostEstimateCollapsedContainer"
        style={{ backgroundColor: appColor.lightGray }}
      >
        <img className="Ellipse" src={Ellipse} />
        <img className="MoneyGray" src={MoneyGray} />
      </button>
    </div>
  );
};

export const CostEstimateFull = () => {
  return (
    <div className="CostEstimateContainer" style={{ background: "#F5F5F5" }}>
      <img className="CostEstimateDelete" src={X} alt="Delete" />
      <div className="CostEstimateTitle">Cost Estimate</div>

      <span className="CostEstimateHeadings">
        <p>Service</p>
        <p>Quantity</p>
        <p>Cost</p>
      </span>
      <div className="CostEstimateDivider" />
      <div className="CostDivider" />
      <div className="CostEstimateTotal">Total</div>
    </div>
  );
};

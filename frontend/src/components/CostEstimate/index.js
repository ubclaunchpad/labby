import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_LOGIC } from "../../redux/actions/uiActions";
import "./index.css";
import { appColor } from "../../constants";
import MoneyGray from "../../assets/MoneyGray.png";
import Ellipse from "../../assets/Ellipse.png";
import { Table } from "antd";
import X from "../../assets/X.png";
import { SET_COST } from "../../redux/actions/costActions";

export const CostEstimateCollapsed = () => {
  const dispatch = useDispatch();
  return (

      <button
        className="CostEstimateCollapsedContainer"
        style={{ backgroundColor: appColor.lightGray }}
        onClick={() => {
          dispatch({
            type: TOGGLE_LOGIC,
            payload: null
          });
        }}
      >
        <img className="Ellipse" src={Ellipse} alt="Ellipse" />
        <img className="MoneyGray" src={MoneyGray} alt="Money" />
      </button>

  );
};

export const CostEstimateFull = () =>  {
  const dispatch = useDispatch();
  const costEstimateList = useSelector((state) => state.costEstimateReducer.costEstimateList);
  const formResponses = useSelector((state) => state.formReducer.formResponses);

  return (
    <div className="CostEstimateContainer" style={{ background: "#F5F5F5" }}>
      <img className="CostEstimateDelete" src={X} alt="Delete" 
                  onClick={() => {
                    dispatch({
                      type: TOGGLE_LOGIC,
                      payload: null
                    });
                  }}/>
      <div className="CostEstimateTitle">Cost Estimate</div>

      <span className="CostEstimateHeadings">
        <p>Service</p>
        <p>Quantity</p>
        <p>Cost</p>
      </span>

      <div>
      {costEstimateList.map((cost) => (
            <p key={cost.cost_id} value={JSON.stringify(cost)}>
              {cost.cost}
            </p>
          ))}


      {/* <table className="costEstimateTable">
      <tbody>
      <tr>
        <td>cost</td>
        <td>xservice</td>
        <td>$price</td>
      </tr>
      </tbody>
      </table> */}
      </div>
      <div className="CostEstimateDivider" />
      <div className="CostDivider" />
      <div className="CostEstimateTotal">Total</div>
      <div className="costEstimateFinalCost">$amount</div>
    </div>
  );
};

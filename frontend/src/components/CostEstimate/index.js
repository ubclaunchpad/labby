import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_LOGIC } from "../../redux/actions/uiActions";
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
  const costEstimateMap= useSelector((state) => state.costEstimateReducer.costEstimateList);
  const formResponses = useSelector((state) => state.formReducer.formResponses);
  let costSum = 0;

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

      <div className="CostEstimates">
        {formResponses.map((response) => {
          const cost = costEstimateMap.get(response.question.answer);
          if (cost != null) {
            costSum += cost;
              return (
                <div class="CostBox" >
                  <div class="CostLeft"> {response.question.answer} </div>
                  <div class="CostCenter"> x2 </div>
                  <div class="CostRight"> ${cost} </div>
                </div>
              );
            }
            <div> {costSum} </div>
          })}
      </div>

    
      <div className="CostEstimateDivider" />
      <div className="CostDivider" />
      <div className="CostEstimateTotal">Total</div>
      <div className="costEstimateFinalCost">${costSum}</div>
    </div>
  );
};

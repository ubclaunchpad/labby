import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_LOGIC } from "../../redux/actions/uiActions";
import "./index.css";
import { appColor } from "../../constants";
import MoneyGray from "../../assets/MoneyGray.png";
import Ellipse from "../../assets/Ellipse.png";
import { Table } from "antd";
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

const columns = [
  {
    dataIndex: "answer",
    key: "name",
  },
  {
    dataIndex: "organization_name",
    key: "quantity",
  },
  {
    dataIndex: "cost",
    key: "$"+"cost",
  }
]


export const CostEstimateFull = () =>  {
  const dispatch = useDispatch();
  const costEstimateList = useSelector((state) => state.costEstimateReducer.costEstimateList);
  const formResponses = useSelector((state) => state.formReducer.formResponses);
  let costSum = 0;
  let costEstimateArr = [];

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
        const org = response.question.fk_organization_id;
        const costArray = costEstimateList;
        costArray.forEach((cost) => {
          if (org == cost.organization_name) {
            if (cost.cost != null && response.question.answer == cost.answer) {
              costSum += cost.cost;
              costEstimateArr.push(cost);
                return (
                  <li key={response.id}>{response.question.answer}{cost.cost}</li>
                );
              }
          }
          })}
      )}

      <Table
        className="table"
        dataSource={costEstimateArr}
        columns={columns}
        pagination={false}
        showHeader={costEstimateArr.length = 0 ? false : true}
      />
      </div>

      {/* <div className="CostEstimates">
      {costEstimateMap.map((response) => {
        const cost = costEstimateMap.get(response.question.answer);
        if (cost != null) {
          costSum += cost;  
            return (
              <li key={response.answe}>{response.question.answer}{cost}</li>
            );
          }
          })}


      </div> */}
      <div className="CostEstimateDivider" />
      <div className="CostDivider" />
      <div className="CostEstimateTotal">Total</div>
      <div className="costEstimateFinalCost">${costSum}</div>
    </div>
  );
};

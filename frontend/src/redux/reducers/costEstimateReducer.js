import { combineReducers } from "redux";
import { TOGGLE_COST_ESTIMATE } from "../actions/uiActions";
import { SET_COST, COST_BILLABLE } from "../actions/costActions";

const defaultCostEstimate = false;

const hideCost = (state = defaultCostEstimate, action) => {
  switch (action.type) {
    case TOGGLE_COST_ESTIMATE: {
      return !state;
    }
    default: {
      return state;
    }
  }
};

const defaultCostEstimateList = [];
const costEstimateMap = new Map();
var costEstimateBillableMap = new Map();

const costEstimateList = (state = defaultCostEstimateList, action) => {
  switch (action.type) {
    case SET_COST: {
      const org = action.payload[0];

      action.payload[1].map((cost) => {
        if (cost.organization_name === org) {
          costEstimateMap.set(cost.fk_answer_id, cost.cost);
        }
        return costEstimateMap;
      });
      return costEstimateMap;
    }
    default: {
      return state;
    }
  }
};

const costEstimateBillables = (state = defaultCostEstimateList, action) => {
  switch (action.type) {
    case COST_BILLABLE: {

      if (action.payload.answer_id != null) {
        costEstimateBillableMap.set(action.payload.answer_id,
          {
            service: action.payload.service,
            quantity: action.payload.quantity,
            cost: action.payload.cost
          })
      }

      return costEstimateBillableMap;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  hideCost,
  costEstimateList,
  costEstimateBillables
});

import { combineReducers } from "redux";
import { TOGGLE_COST_ESTIMATE } from "../actions/uiActions";
import { SET_COST } from "../actions/costActions";

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

const costEstimateList = (state = defaultCostEstimateList, action) => {
  switch (action.type) {
    case SET_COST: {
      const org = action.payload[0];

      action.payload[1].map((cost) => {
        if (cost.organization_name === org) {
          costEstimateMap.set(cost.answer, cost.cost);
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

export default combineReducers({
  hideCost,
  costEstimateList,
});

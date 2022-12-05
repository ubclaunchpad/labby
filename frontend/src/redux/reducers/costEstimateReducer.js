import { combineReducers } from "redux";
import { TOGGLE_LOGIC } from "../actions/uiActions";
import {SET_COST, LOAD_COST} from "../actions/costActions";


const defaultCostEstimate = true;


const costEstimateView = (state = defaultCostEstimate, action) => {
  switch (action.type) {
    case TOGGLE_LOGIC: {
      return !state;
    }
    default: {
      return state;
    }
  }
};

const defaultCostEstimateList = [];

const costEstimateList = (state = defaultCostEstimateList, action) => {
  switch (action.type) {
    case SET_COST: {
      console.log("setting");
      var costIds = [];
      var finalCostEstimates = [];
      action.payload.forEach((cost) => {
        if (!costIds.includes(cost.cost_id)) {
          costIds.push(cost.cost_id);
          finalCostEstimates.push(cost);
        }
      });
      console.log(finalCostEstimates);
      return finalCostEstimates;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  costEstimateView,
  costEstimateList
});
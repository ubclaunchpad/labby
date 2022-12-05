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
const costEstimateMap = new Map();

const costEstimateList = (state = defaultCostEstimateList, action) => {
  switch (action.type) {
    case SET_COST: {
      action.payload.map((cost) => (
        costEstimateMap.set(cost.answer, cost.cost)
      ));
      console.log(costEstimateMap);
      return costEstimateMap;
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
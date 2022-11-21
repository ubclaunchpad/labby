import { combineReducers } from "redux";
import { TOGGLE_LOGIC} from "../actions/uiActions";

const defaultCostEstimate = true;

const costEstimateView = (state = defaultCostEstimate, action) => {
  switch (action.type) {
    case TOGGLE_LOGIC: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  costEstimateView,
});

//(true, click) => close
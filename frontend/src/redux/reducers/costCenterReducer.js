import { combineReducers } from "redux";
import { SET_COSTCENTER } from "../actions/billingActions";

const defaultCostCenterList = [];

const costcenterList = (state = defaultCostCenterList, action) => {
  switch (action.type) {
    case SET_COSTCENTER: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  costcenterList,
});

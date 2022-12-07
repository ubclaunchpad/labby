import { combineReducers } from "redux";
import { SET_BILLABLE } from "../actions/billingActions";

const defaultBillingList = [];

const billingList = (state = defaultBillingList, action) => {
  switch (action.type) {
    case SET_BILLABLE: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  billingList,
});

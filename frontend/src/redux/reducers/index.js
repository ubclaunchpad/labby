import { combineReducers } from "redux";

import questionReducer from "./questionReducer";
import logicReducer from "./logicReducer";
import uiReducer from "./uiReducer";
import formReducer from "./formReducer";
import costReducer from "./costReducer";
import costEstimateReducer from "./costEstimateReducer";
import ticketReducer from "./ticketReducer";
import billingReducer from "./billingReducer";

const rootReducer = combineReducers({
  questionReducer,
  logicReducer,
  uiReducer,
  formReducer,
  costReducer,
  costEstimateReducer,
  ticketReducer,
  billingReducer,
});

export default rootReducer;

import { combineReducers } from "redux";

import questionReducer from "./questionReducer";
import logicReducer from "./logicReducer";
import uiReducer from "./uiReducer";
import formReducer from "./formReducer";
import costReducer from "./costReducer";
import costEstimateReducer from "./costEstimateReducer";

const rootReducer = combineReducers({
  questionReducer,
  logicReducer,
  uiReducer,
  formReducer,
  costReducer,
  costEstimateReducer,
});

export default rootReducer;

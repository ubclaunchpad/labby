import { combineReducers } from "redux";

import questionReducer from "./questionReducer";
import logicReducer from "./logicReducer";
import uiReducer from "./uiReducer";
import formReducer from "./formReducer";
import costEstimateReducer from "./costEstimateReducer";

const rootReducer = combineReducers({
  questionReducer,
  logicReducer,
  uiReducer,
  formReducer,
  costEstimateReducer,
});

export default rootReducer;

import { combineReducers } from "redux";

import questionReducer from "./questionReducer";
import logicReducer from "./logicReducer";
import uiReducer from "./uiReducer";

const rootReducer = combineReducers({
  questionReducer,
  logicReducer,
  uiReducer,
});

export default rootReducer;

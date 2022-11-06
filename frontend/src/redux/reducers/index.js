import { combineReducers } from 'redux'

import questionReducer from './questionReducer';
import logicReducer from './logicReducer';

const rootReducer = combineReducers({
    questionReducer,
    logicReducer,
})

export default rootReducer;
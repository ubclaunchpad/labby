import { combineReducers } from 'redux'

import questionReducer from './questionReducer';

const rootReducer = combineReducers({
    questionReducer,
  // Here you can registering another reducers.
})

export default rootReducer;
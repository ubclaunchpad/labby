import { combineReducers } from "redux";
import { SET_EMPLOYEE, SET_USERLIST } from "../actions/userActions";

const defaultUserList = [];

const userList = (state = defaultUserList, action) => {
  switch (action.type) {
    case SET_USERLIST: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

const employeeList = (state = defaultUserList, action) => {
  switch (action.type) {
    case SET_EMPLOYEE: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  userList,
  employeeList,
});

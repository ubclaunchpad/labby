import { combineReducers } from "redux";
import { SET_USERLIST } from "../actions/userActions";

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

export default combineReducers({
    userList,
});

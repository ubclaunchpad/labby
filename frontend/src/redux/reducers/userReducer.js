import { combineReducers } from "redux";
import {
  SET_CURRENT_USER,
  SET_EMPLOYEE,
  SET_ORGANIZATION,
  SET_USERLIST,
  SET_PENDING_USER,
  SET_USER_SURVEY,
} from "../actions/userActions";

const defaultUserList = [];
const defaultOrganizationList = [];
const defaultPendingUserList = [];
const defaultUserRequestList = [];

const currentUser = (state = null, action) => {
  switch (action.type) {
    case SET_CURRENT_USER: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

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

const organizationList = (state = defaultOrganizationList, action) => {
  switch (action.type) {
    case SET_ORGANIZATION: {
      let organizationList = [];
      action.payload.organizationList.forEach((organization) => {
        organization.projects = [];
        action.payload.projectAssignmentList.forEach((projectAssignment) => {
          if (
            projectAssignment.fk_organization_id ===
            organization.organization_id
          ) {
            organization.projects.push(projectAssignment);
          }
        });
        organizationList.push(organization);
      });
      return organizationList;
    }
    default: {
      return state;
    }
  }
};

const pendingUserList = (state = defaultPendingUserList, action) => {
  switch (action.type) {
    case SET_PENDING_USER: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

const userRequestList = (state = defaultUserRequestList, action) => {
  switch (action.type) {
    case SET_USER_SURVEY: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  pendingUserList,
  userList,
  employeeList,
  organizationList,
  currentUser,
  userRequestList,
});

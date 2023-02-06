import { combineReducers } from "redux";
import {
  SET_EMPLOYEE,
  SET_ORGANIZATION,
  SET_USERLIST,
} from "../actions/userActions";

const defaultUserList = [];
const defaultOrganizationList = [];

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
          if (projectAssignment.fk_organization_id === organization.organization_id) {
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


export default combineReducers({
  userList,
  employeeList,
  organizationList,
});

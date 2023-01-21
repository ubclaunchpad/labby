import { combineReducers } from "redux";
import { SET_PROJECT } from "../actions/billingActions";

const defaultProjectList = [];

const projectList = (state = defaultProjectList, action) => {
  switch (action.type) {
    case SET_PROJECT: {
      let projectList = [];
      action.payload.projectList.forEach((project) => {
        project.costcenter = [];
        action.payload.costcenterAssignmentList.forEach(
          (costCenterAssignment) => {
            if (costCenterAssignment.fk_project_id === project.project_id) {
              project.costcenter.push(costCenterAssignment);
            }
          }
        );
        projectList.push(project);
      });
      return projectList;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  projectList,
});

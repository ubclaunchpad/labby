import defaultAxios from "axios";
import { backend } from "../../constants";

const axios = defaultAxios.create({
  baseURL: backend,
  headers: { "Content-Type": "application/json" },
});

export const getCostcenterApi = async () => {
  try {
    const costcenterList = await axios.get("costcenter/");

    return costcenterList;
  } catch (err) {
    return console.error(err);
  }
};

export const getCostcenterAssignmentApi = async () => {
  try {
    const costcenterAssignmentList = await axios.get("costcenter/assignment/");

    return costcenterAssignmentList;
  } catch (err) {
    return console.error(err);
  }
};

export const clearProjectAssignmentApi = async (payload) => {
  try {
    const assignment = await axios.delete(`costcenter/assignment/${payload}`);

    return assignment;
  } catch (err) {
    return console.error(err);
  }
}

export const addProjectAssignmentApi = async (payload) => {
  try {
    var data = JSON.stringify({
      project_id: payload.project_id,
      cost_center_id: payload.costcenter_id,
      assignment_id: payload.assignment_id,
    });

    const assignment = await axios.post("costcenter/assignment/", data);

    return assignment;
  } catch (err) {
    return console.error(err);
  }
}

import defaultAxios from "axios";
import { backend } from "../../constants";

const axios = defaultAxios.create({
  baseURL: backend,
  headers: { "Content-Type": "application/json" },
});

export const getProjectApi = async () => {
  try {
    const projectList = await axios.get("project/");

    return projectList;
  } catch (err) {
    return console.error(err);
  }
};

export const getProjectAssignmentApi = async () => {
  try {
    const projectAssignmentList = await axios.get("project/assignment/");

    return projectAssignmentList;
  } catch (err) {
    return console.error(err);
  }
};

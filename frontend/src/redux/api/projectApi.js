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

export const postProjectApi = async (payload) => {
  try {
    var data = JSON.stringify({
      project_id: payload.project_id,
      project_name: payload.project_name,
      project_description: payload.project_description,
    });

    const project = await axios.post("project/", data);

    return project;
  } catch (err) {
    return console.error(err);
  }
};

export const deleteProjectApi = async (payload) => {
  try {
    const project = await axios.delete(`project/${payload}`);

    return project;
  } catch (err) {
    return console.error(err);
  }
};

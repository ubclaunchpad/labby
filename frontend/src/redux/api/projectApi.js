import defaultAxios from "axios";
import { backend } from "../../constants";

const axios = defaultAxios.create({
  baseURL: backend,
  headers: { "Content-Type": "application/json" },
});

export const getProjectApi = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const projectList = await axios.get("project/", { headers: headers });

    return projectList;
  } catch (err) {
    return console.error(err);
  }
};

export const getProjectAssignmentApi = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const projectAssignmentList = await axios.get("project/assignment/", {
      headers: headers,
    });

    return projectAssignmentList;
  } catch (err) {
    return console.error(err);
  }
};

export const postProjectApi = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    var data = JSON.stringify({
      project_id: payload.project_id,
      project_name: payload.project_name,
      project_description: payload.project_description,
    });

    const project = await axios.post("project/", data, { headers: headers });

    return project;
  } catch (err) {
    return console.error(err);
  }
};

export const deleteProjectApi = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const project = await axios.delete(`project/${payload}`, {
      headers: headers,
    });

    return project;
  } catch (err) {
    return console.error(err);
  }
};

import defaultAxios from "axios";
import { backend } from "../../constants";

const axios = defaultAxios.create({
  baseURL: backend,
  headers: { "Content-Type": "application/json" },
});

export const getCostcenterApi = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const costcenterList = await axios.get("costcenter/", { headers: headers });

    return costcenterList;
  } catch (err) {
    return console.error(err);
  }
};

export const getCostcenterAssignmentApi = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const costcenterAssignmentList = await axios.get("costcenter/assignment/", {
      headers: headers,
    });

    return costcenterAssignmentList;
  } catch (err) {
    return console.error(err);
  }
};

export const clearProjectAssignmentApi = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const assignment = await axios.delete(`costcenter/assignment/${payload}`, {
      headers: headers,
    });

    return assignment;
  } catch (err) {
    return console.error(err);
  }
};

export const addProjectAssignmentApi = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    var data = JSON.stringify({
      project_id: payload.project_id,
      cost_center_id: payload.costcenter_id,
      assignment_id: payload.assignment_id,
    });

    const assignment = await axios.post("costcenter/assignment/", data, {
      headers: headers,
    });

    return assignment;
  } catch (err) {
    return console.error(err);
  }
};

export const postCostCenterApi = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    var data = JSON.stringify({
      cost_center_id: payload.cost_center_id,
      cost_center_name: payload.cost_center_name,
      cost_center_client_name: payload.cost_center_client_name,
      cost_center_investigator: payload.cost_center_investigator,
      cost_center_contact: payload.cost_center_contact,
      cost_center_email: payload.cost_center_email,
      cost_center_address: payload.cost_center_address,
      cost_center_type: payload.cost_center_type,
    });

    const costcenter = await axios.post("costcenter/", data, {
      headers: headers,
    });

    return costcenter;
  } catch (err) {
    return console.error(err);
  }
};

export const deleteCostCenterApi = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const costcenter = await axios.delete(`costcenter/${payload}`, {
      headers: headers,
    });

    return costcenter;
  } catch (err) {
    return console.error(err);
  }
};

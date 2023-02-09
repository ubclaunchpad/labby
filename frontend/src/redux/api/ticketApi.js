import defaultAxios from "axios";
import uuid from "react-uuid";
import { backend } from "../../constants";

const axios = defaultAxios.create({
  baseURL: backend,
  headers: { "Content-Type": "application/json" },
});

export const getAssignees = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const assigneeList = await axios.get("task/assignee", { headers: headers });
    return assigneeList;
  } catch (err) {
    return console.error(err);
  }
};

export const getTickets = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const tickets = await axios.get("task/", { headers: headers });
    return tickets;
  } catch (err) {
    return console.error(err);
  }
};

export const getSubTickets = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const tickets = await axios.get("task/subtasks/", { headers: headers });
    return tickets;
  } catch (err) {
    return console.error(err);
  }
};

export const getSubTicketsById = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const tickets = await axios.get(`task/subtasks/${payload}`, {
      headers: headers,
    });
    return tickets;
  } catch (err) {
    return console.error(err);
  }
};

export const createSubtask = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    var data = JSON.stringify({
      subtask_id: uuid(),
      subtask_title: `Subtask ${uuid().substring(0, 5)}`,
      subtask_description: `Subtask for ${payload.task_id}`,
      subtask_state: "open",
      task_id: payload.task_id,
    });

    const subtask = await axios.post(
      `task/addsubtask/${payload.task_id}`,
      data,
      { headers: headers }
    );
    return subtask;
  } catch (err) {
    return console.error(err);
  }
};

export const filterTickets = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    var data = JSON.stringify({
      filter: payload.filter,
    });

    const tickets = await axios.post("task/filter", data, { headers: headers });
    return tickets;
  } catch (err) {
    return console.error(err);
  }
};

export const updateTicketStatusApi = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    var data = JSON.stringify({
      status: payload.status,
    });

    const tickets = await axios.post(`task/status/${payload.ticketId}`, data, {
      headers: headers,
    });
    return tickets;
  } catch (err) {
    return console.error(err);
  }
};

export const updateSubticketStatusApi = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    var data = JSON.stringify({
      status: payload.status,
    });

    const tickets = await axios.post(
      `task/subtask/status/${payload.ticketId}`,
      data,
      { headers: headers }
    );
    return tickets;
  } catch (err) {
    return console.error(err);
  }
};

export const updateTicketDescriptionApi = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    var data = JSON.stringify({
      description: payload.description,
    });

    const tickets = await axios.post(
      `task/description/${payload.ticketId}`,
      data,
      { headers: headers }
    );
    return tickets;
  } catch (err) {
    return console.error(err);
  }
};

export const getServiceCostApi = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const billable = await axios.get(`billing/${payload.sow_id}`, {
      headers: headers,
    });
    return billable;
  } catch (err) {
    return console.error(err);
  }
};

export const postServiceCostApi = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    var data = JSON.stringify({
      billable_id: payload.billable_id,
      sow_id: payload.sow_id,
      project_id: payload.project_id,
      name: payload.name,
      quantity: payload.quantity,
      cost: payload.cost,
      createdDate: payload.createdDate,
      completedTime: payload.completedTime,
      billed: payload.billed,
      billedTime: payload.billedTime,
      createdBy: payload.createdBy,
    });

    const billable = await axios.post(`billing/`, data, { headers: headers });
    return billable;
  } catch (err) {
    return console.error(err);
  }
};

export const deleteServiceCost = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const billable = await axios.delete(`billing/${payload.billable_id}`, {
      headers: headers,
    });
    return billable;
  } catch (err) {
    return console.error(err);
  }
};

export const assignUserApi = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    var data = JSON.stringify({
      assignment_id: payload.assignment_id,
      user_id: payload.user_id,
      task_id: payload.task_id,
    });

    const assignment = await axios.post(`assignment/`, data, {
      headers: headers,
    });
    return assignment;
  } catch (err) {
    return console.error(err);
  }
};

export const unassignUserApi = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const assignment = await axios.delete(
      `assignment/${payload.assignment_id}`,
      { headers: headers }
    );
    return assignment;
  } catch (err) {
    return console.error(err);
  }
};

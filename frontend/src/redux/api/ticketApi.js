import defaultAxios from "axios";
import { backend } from "../../constants";

const axios = defaultAxios.create({
  baseURL: backend,
  headers: { "Content-Type": "application/json" },
});

export const getAssignees = async () => {
  try {
    const assigneeList = await axios.get("task/assignee");
    return assigneeList;
  } catch (err) {
    return console.error(err);
  }
};

export const getTickets = async () => {
  try {
    const tickets = await axios.get("task/");
    return tickets;
  } catch (err) {
    return console.error(err);
  }
};

export const getSubTickets = async () => {
  try {
    const tickets = await axios.get("task/subtasks/");
    return tickets;
  } catch (err) {
    return console.error(err);
  }
};

export const getSubTicketsById = async (payload) => {
  try {

      const tickets = await axios.get(`task/subtasks/${payload.ticketId}`);
      return tickets;
  } catch (err) {
    return console.error(err);
  }
};

export const updateTicketStatusApi = async (payload) => {
  try {
    var data = JSON.stringify({
      status: payload.status,
    });

    const tickets = await axios.post(`task/status/${payload.ticketId}`, data);
    return tickets;
  } catch (err) {
    return console.error(err);
  }
};

export const updateSubticketStatusApi = async (payload) => {
  try {
    var data = JSON.stringify({
      status: payload.status,
    });

    const tickets = await axios.post(`task/subtask/status/${payload.ticketId}`, data);
    return tickets;
  } catch (err) {
    return console.error(err);
  }
};

export const updateTicketDescriptionApi = async (payload) => {
  try {
    var data = JSON.stringify({
      description: payload.description,
    });

    const tickets = await axios.post(`task/description/${payload.ticketId}`, data);
    return tickets;
  } catch (err) {
    return console.error(err);
  }
};

export const assignUserApi = async (payload) => {
  try {
    var data = JSON.stringify({
      assignment_id: payload.assignment_id,
      user_id: payload.user_id,
      task_id: payload.task_id,
    });

    const assignment = await axios.post(`assignment/`, data);
    return assignment;
  } catch (err) {
    return console.error(err);
  }
};

export const unassignUserApi = async (payload) => {
  try {
    const assignment = await axios.delete(`assignment/${payload.assignment_id}`);
    return assignment;
  } catch (err) {
    return console.error(err);
  }
};

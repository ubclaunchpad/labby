import defaultAxios from "axios";
import { backend } from "../../constants";

const axios = defaultAxios.create({
  baseURL: backend,
  headers: { "Content-Type": "application/json" },
});

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

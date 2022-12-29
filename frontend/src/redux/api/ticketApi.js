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

export const updateTicketStatusApi = async (payload) => {
  try {
    var data = JSON.stringify({
      status: payload.status,
    });

    const tickets = await axios.post(`task/${payload.ticketId}`, data);
    return tickets;
  } catch (err) {
    return console.error(err);
  }
};

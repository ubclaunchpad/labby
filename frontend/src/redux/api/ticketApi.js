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

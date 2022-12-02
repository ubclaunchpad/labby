import defaultAxios from "axios";
import { backend } from "../../constants";

const axios = defaultAxios.create({
  baseURL: backend,
  headers: { "Content-Type": "application/json" },
});

export const getCosts = async () => {
    try {
      const costs = await axios.get("cost/");
      return costs;
      
    } catch (err) {
      return console.error(err);
    }
  };
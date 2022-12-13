import defaultAxios from "axios";
import { backend } from "../../constants";

const axios = defaultAxios.create({
  baseURL: backend,
  headers: { "Content-Type": "application/json" },
});

export const getForms = async () => {
    try {
      const forms = await axios.get("form/"); 
      return forms;

    } catch (err) {
      return console.error(err);
    }
  };

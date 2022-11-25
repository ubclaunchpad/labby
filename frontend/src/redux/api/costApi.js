import defaultAxios from "axios";
import { backend } from "../../constants";

const axios = defaultAxios.create({
  baseURL: backend,
  headers: { "Content-Type": "application/json" },
});

//cost estimate with backend
export const getCostEstimate = async () => {
    try {
      const costEstimates = await axios.get(“question/“);
      return costEstimates;
    } catch (err) {
      return console.error(err);
    }
  };
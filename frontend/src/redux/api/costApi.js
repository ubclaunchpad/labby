import defaultAxios from "axios";
import { backend } from "../../constants";

const axios = defaultAxios.create({
  baseURL: backend,
  headers: { "Content-Type": "application/json" },
});

export const getCosts = async () => {
    try {
      const costs = await axios.get("quote/"); //what goes here
      return costs;

    } catch (err) {
      return console.error(err);
    }
  };

  export const getCost = async (payload) => {
    try {
      var data = JSON.stringify({
        organization: payload.organization,
        responses: payload.responses
      });
  
      const cost = await axios.post("quote/getQuote", data);
      console.log("api");
      return cost;
    } catch (err) {
      return console.error(err);
    }
  };
import defaultAxios from "axios";
import { backend } from "../../constants";

const axios = defaultAxios.create({
  baseURL: backend,
  headers: { "Content-Type": "application/json" },
});

export const getCosts = async () => {
    try {
      const costs = await axios.get("quote/"); 
      return costs;

    } catch (err) {
      return console.error(err);
    }
  };

  //single quote
  
  // export const getCost = async (payload) => {
  //   try {
  //     var data = JSON.stringify({
  //       organization: payload.organization,
  //       responses: payload.responses,
  //     });
  
  //     const cost = await axios.post("quote/getQuote/", data);
  //     return cost;
  //   } catch (err) {
  //     return console.error(err);
  //   }
  // };

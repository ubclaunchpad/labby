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

export const deleteCosts = async (answerId) => {
  try {
    const costs = await axios.delete(`quote/${answerId}`);
    return costs;
  } catch (err) {
    return console.error(err);
  }
};

export const postCosts = async (payload) => {
  try {
    var data = JSON.stringify({
      answer_id: payload.answer_id,
      org_type: payload.org_type,
      cost: payload.cost,
      cost_id: payload.cost_id,
    });

    const costs = await axios.post(`quote/`, data);
    return costs;
  } catch (err) {
    return console.error(err);
  }
};

export const updateQuantifiableApi = async (payload) => {
  try {
    var data = JSON.stringify({
      answer_id: payload.answer_id,
      quantifiable: payload.quantifiable,
    });

    const costs = await axios.post(`quote/updateQuantifiable/`, data);
    return costs;
  } catch (err) {
    return console.error(err);
  }
}

import defaultAxios from "axios";
import { backend } from "../../constants";

const axios = defaultAxios.create({
  baseURL: backend,
  headers: { "Content-Type": "application/json" },
});

export const getCosts = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const costs = await axios.get("quote/", { headers: headers });
    return costs;
  } catch (err) {
    return console.error(err);
  }
};

export const deleteCosts = async (answerId) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const costs = await axios.delete(`quote/${answerId}`, { headers: headers });
    return costs;
  } catch (err) {
    return console.error(err);
  }
};

export const postCosts = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    var data = JSON.stringify({
      answer_id: payload.answer_id,
      org_type: payload.org_type,
      cost: payload.cost,
      cost_id: payload.cost_id,
    });

    const costs = await axios.post(`quote/`, data, { headers: headers });
    return costs;
  } catch (err) {
    return console.error(err);
  }
};

export const updateQuantifiableApi = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    var data = JSON.stringify({
      answer_id: payload.answer_id,
      quantifiable: payload.quantifiable,
    });

    const costs = await axios.post(`quote/updateQuantifiable/`, data, {
      headers: headers,
    });
    return costs;
  } catch (err) {
    return console.error(err);
  }
};

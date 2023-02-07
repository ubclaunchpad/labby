import defaultAxios from "axios";
import { backend } from "../../constants";

const axios = defaultAxios.create({
  baseURL: backend,
  headers: { "Content-Type": "application/json" },
});

export const saveLogics = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    var data = JSON.stringify({
      condition_id: payload.condition_id,
      question_id: payload.question_id,
      answer_id: payload.answer_id,
      condition_type: payload.condition_type,
      parameters: payload.parameters,
      result: payload.result,
    });

    const logics = await axios.post("logic/", data, { headers: headers });

    return logics;
  } catch (err) {
    return console.error(err);
  }
};

export const getLogics = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const logics = await axios.get("logic/", { headers: headers });

    return logics;
  } catch (err) {
    return console.error(err);
  }
};

export const deleteLogic = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const logics = await axios.delete(`logic/${payload.logic_id}`, {
      headers: headers,
    });

    return logics;
  } catch (err) {
    return console.error(err);
  }
};

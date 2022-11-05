import defaultAxios from "axios";
import { backend } from "../../constants";


const axios = defaultAxios.create({
  baseURL: backend,
  headers: { "Content-Type": "application/json" },
});


export const getLogics = async () => {
  try {
    const logics = await axios.get("logic/");

    return logics;
  } catch (err) {
    return console.error(err);
  }
};

export const deleteLogic = async (payload) => {
  try {
    var data = JSON.stringify({
      logic_id: payload.logic_id,
    });

    const logics = await axios.delete("logic/", data);

    return logics;
  } catch (err) {
    return console.error(err);
  }
};

export const saveLogics = async (payload) => {
  try {
    var data = JSON.stringify({
      logic_id: payload.logic_id,
    });

    const logics = await axios.post("logic/", data);

    return logics;
  } catch (err) {
    return console.error(err);
  }
};

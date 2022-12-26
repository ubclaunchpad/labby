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

export const saveFormsApi = async (payload) => {
  try {
    var data = JSON.stringify({
      form_id: payload.form_id,
      form_name: payload.form_name,
    });

    const form = await axios.post("form/", data);

    return form;
  } catch (err) {
    return console.error(err);
  }
};

export const deleteFormApi = async (payload) => {
  try {
    const form = await axios.delete(`form/${payload.form_id}`);

    return form;
  } catch (err) {
    return console.error(err);
  }
};
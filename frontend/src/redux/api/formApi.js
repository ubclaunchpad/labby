import defaultAxios from "axios";
import { backend } from "../../constants";

const axios = defaultAxios.create({
  baseURL: "http://localhost:8080/", //change back to constants backend
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

export const createTicketApi = async (payload) => {
  try {
    var data = JSON.stringify({
      task_id: payload.task_id,
      fk_form_id: payload.fk_form_id,
      task_title: payload.task_title,
      task_description: payload.task_description,
      task_state: payload.task_state,
    });

    const task = await axios.post("task/", data);

    return task;
  } catch (err) {
    console.log(data);
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
import defaultAxios from "axios";
import { backend } from "../../constants";

const axios = defaultAxios.create({
  baseURL: backend,
  headers: { "Content-Type": "application/json" },
});

export const getForms = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const forms = await axios.get("form/", { headers: headers });
    return forms;
  } catch (err) {
    return console.error(err);
  }
};

export const getPublishedForms = async () => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const forms = await axios.get("form/published", { headers: headers });
    return forms;
  } catch (err) {
    return console.error(err);
  }
};

export const saveFormsApi = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    var data = JSON.stringify({
      form_id: payload.form_id,
      form_name: payload.form_name,
    });

    const form = await axios.post("form/", data, { headers: headers });

    return form;
  } catch (err) {
    return console.error(err);
  }
};

export const saveBuildFormsApi = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    var data = JSON.stringify({});
    const form = await axios.post(`form/${payload.form_id}`, data, {
      headers: headers,
    });

    return form;
  } catch (err) {
    return console.error(err);
  }
}

export const createTicketApi = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    var data = JSON.stringify({
      task_id: payload.task_id,
      fk_survey_id: payload.fk_survey_id,
      fk_form_id: payload.fk_form_id,
      fk_project_id: payload.fk_project_id,
      task_title: payload.task_title,
      task_description: payload.task_description,
      task_state: payload.task_state,
    });

    const task = await axios.post("task/", data, { headers: headers });

    return task;
  } catch (err) {
    console.log(data);
    return console.error(err);
  }
};

export const deleteFormApi = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const form = await axios.delete(`form/${payload.form_id}`, {
      headers: headers,
    });

    return form;
  } catch (err) {
    return console.error(err);
  }
};

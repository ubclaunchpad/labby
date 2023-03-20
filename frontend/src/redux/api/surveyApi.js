import defaultAxios from "axios";
import { backend } from "../../constants";

const axios = defaultAxios.create({
  baseURL: backend,
  headers: { "Content-Type": "application/json" },
});

export const saveSurvey = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    var data = JSON.stringify({
      survey_id: payload.survey_id,
      fk_user_id: payload.user_id,
      date_created: new Date(),
    });

    const survey = await axios.post("survey/", data, { headers: headers });

    return survey;
  } catch (err) {
    return console.error(err);
  }
};

export const loadSurvey = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };

    const surveyList = await axios.get(`survey/${payload.user_id}`, { headers: headers });

    return surveyList;
  } catch (err) {
    return console.error(err);
  }
};

export const saveResponse = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    var data = JSON.stringify(payload);

    const surveyResponse = await axios.post("survey/response/", data, {
      headers: headers,
    });

    return surveyResponse;
  } catch (err) {
    return console.error(err);
  }
};

export const saveClinical = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    var data = JSON.stringify(payload);

    const clinicalResponse = await axios.post("clinical/", data, {
      headers: headers,
    });

    return clinicalResponse;
  } catch (err) {
    return console.error(err);
  }
};

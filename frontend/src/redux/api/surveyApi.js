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
      fk_user_id: null, // TODO change to actual user id
      date_created: new Date(),
    });

    const survey = await axios.post("survey/", data, { headers: headers });

    return survey;
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

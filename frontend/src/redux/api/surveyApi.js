import defaultAxios from "axios";
import { backend } from "../../constants";

const axios = defaultAxios.create({
  baseURL: backend,
  headers: { "Content-Type": "application/json" },
});

export const saveSurvey = async (payload) => {
  try {
    var data = JSON.stringify({
      survey_id: payload.survey_id,
      fk_user_id: "LABBY", // TODO change to actual user id
      date_created: new Date(),
    });

    const survey = await axios.post("survey/", data);

    return survey;
  } catch (err) {
    return console.error(err);
  }
};

export const saveResponse = async (payload) => {
  try {
    var data = JSON.stringify(payload);

    const surveyResponse = await axios.post("survey/response/", data);

    return surveyResponse;
  } catch (err) {
    return console.error(err);
  }
};

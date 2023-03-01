import defaultAxios from "axios";
import { backend } from "../../constants";

const axios = defaultAxios.create({
  baseURL: backend,
  headers: { "Content-Type": "application/json" },
});

export const getQuestions = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    if (payload) {
      const formId = payload;
      const questions = await axios.get(`question/${formId}`, { headers: headers });
      return questions;
    }

    const questions = await axios.get("question/", { headers: headers });
    return questions;
  } catch (err) {
    return console.error(err);
  }
};

export const saveQuestions = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    var data = JSON.stringify({
      question_id: payload.question_id,
      form_id: payload.form_id,
      question_title: payload.question_title,
      question_type: payload.question_type,
      question_index: payload.question_index,
      mandatory: payload.mandatory,
      clinical: payload.clinical,
    });

    const questions = await axios.post("question/", data, { headers: headers });

    return questions;
  } catch (err) {
    return console.error(err);
  }
};

export const removeQuestion = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const questions = await axios.delete(`question/${payload.question_id}`, {
      headers: headers,
    });

    return questions;
  } catch (err) {
    return console.error(err);
  }
};

export const saveAnswer = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    var data = JSON.stringify({
      answer_id: payload.answer_id,
      fk_question_id: payload.fk_question_id,
      question_type: payload.question_type,
      answer: payload.answer,
    });

    const answers = await axios.post("answer/", data, { headers: headers });

    return answers;
  } catch (err) {
    return console.error(err);
  }
};

export const removeAnswer = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const answers = await axios.delete(`answer/${payload.answer_id}`, {
      headers: headers,
    });

    return answers;
  } catch (err) {
    return console.error(err);
  }
};

export const getAnswersBySurvey = async (payload) => {
  try {
    const token = JSON.parse(localStorage.getItem("currentUser")).token;
    var headers = {
      Authorization: `Bearer ${token}`,
    };
    const answers = await axios.get(`answer/${payload.survey_id}`, {
      headers: headers,
    });

    return answers;
  } catch (err) {
    return console.error(err);
  }
};

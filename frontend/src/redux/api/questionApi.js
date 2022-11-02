import defaultAxios from "axios";
import { backend } from "../../constants";

const axios = defaultAxios.create({
  baseURL: backend,
  headers: { "Content-Type": "application/json" },
});

export const getQuestions = async () => {
  try {
    const questions = await axios.get("question/");

    return questions;
  } catch (err) {
    return console.error(err);
  }
};

export const saveQuestions = async (payload) => {
  try {
    var data = JSON.stringify({
      question_id: payload.question_id,
      question_title: payload.question_title,
      question_type: payload.question_type,
      question_index: payload.question_index,
    });

    const questions = await axios.post("question/", data);

    return questions;
  } catch (err) {
    return console.error(err);
  }
};

export const saveAnswer = async (payload) => {
  try {
    var data = JSON.stringify({
      answer_id: payload.answer_id,
      fk_question_id: payload.fk_question_id,
      question_type: payload.question_type,
      answer: payload.answer,
    });

    const questions = await axios.post("answer/", data);

    return questions;
  } catch (err) {
    return console.error(err);
  }
};

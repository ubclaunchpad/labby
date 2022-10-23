import { Router } from "express";
import QuestionController from "../controllers/questionController.js";
import { Question } from "../models/question.js";

const router = Router();
const questionController = new QuestionController();

router.post("/", (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  questionController
    .saveQuestion(req)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.get("/", (_, res) => {
    questionController
    .loadQuestion(req)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

export default router;

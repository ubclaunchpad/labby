import { Router } from "express";
import authorize from "../auth/authorize.js";
import QuestionController from "../controllers/questionController.js";

const router = Router();
const questionController = new QuestionController();

router.post("/", authorize(), (req, res) => {
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

router.get("/", authorize(), (_, res) => {
  questionController
    .loadQuestion()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.get("/:formId", authorize(), (req, res) => {
  questionController
    .loadQuestionByForm(req.params.formId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.delete("/:questionId", authorize(), (req, res) => {
  questionController
    .deleteQuestion(req.params.questionId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

export default router;

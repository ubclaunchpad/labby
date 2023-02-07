import { Router } from "express";
import authorize from "../auth/authorize.js";
import AnswerController from "../controllers/answerController.js";

const router = Router();
const answerController = new AnswerController();

router.post("/", authorize(), (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  answerController
    .saveAnswer(req)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.get("/:surveyId", authorize(), (req, res) => {
  answerController
    .getAnswer(req.params.surveyId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
})


router.delete("/:answerId", authorize(), (req, res) => {
  answerController
    .deleteAnswer(req.params.answerId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

export default router;

import { Router } from "express";
import QuestionController from "../controllers/questionController.js";

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
       (res.status(404).json('Error: ' + err));
    });
});

router.get("/", (_, res) => {
  res.status(200).json({ response: "Question Loaded Successfully" });
});

export default router;

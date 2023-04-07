import { Router } from "express";
import authorize from "../auth/authorize.js";
import TaskLabelController from "../controllers/taskLabelController.js";

const router = Router();
const taskLabelController = new TaskLabelController();

router.post("/", authorize(), (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  taskLabelController
    .saveTaskLabel(req)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

router.delete("/:taskLabelId", authorize(), (req, res) => {
    taskLabelController
      .deleteTaskLabel(req.params.taskLabelId)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  });

export default router;

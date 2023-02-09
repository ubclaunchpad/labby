import { Router } from "express";
import authorize from "../auth/authorize.js";
import AssignmentController from "../controllers/assignmentController.js";

const router = Router();
const assignmentController = new AssignmentController();

router.delete("/:assignmentId", authorize(), (req, res) => {
  assignmentController
    .deleteAssignment(req.params.assignmentId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.post("/", authorize(), (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  assignmentController
    .saveAssignment(req)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

export default router;

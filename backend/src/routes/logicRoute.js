import { Router } from "express";
import authorize from "../auth/authorize.js";
import LogicController from "../controllers/logicController.js";

const router = Router();
const logicController = new LogicController();

router.get("/", authorize(), (_, res) => {
  logicController
    .getLogic()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.delete("/:conditionId", authorize(), (req, res) => {
  logicController
    .deleteLogic(req.params.conditionId)
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
  logicController
    .saveLogic(req)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

export default router;

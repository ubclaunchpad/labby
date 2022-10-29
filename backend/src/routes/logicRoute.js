import { Router } from "express";
import LogicController from "../controllers/logicController.js";

const router = Router();
const logicController = new LogicController();

router.delete("/", (req, res) => {
  logicController
    .deleteLogic(req)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

export default router;

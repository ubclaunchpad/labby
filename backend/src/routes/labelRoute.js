import { Router } from "express";
import authorize from "../auth/authorize.js";
import LabelController from "../controllers/labelController.js";

const router = Router();
const labelController = new LabelController();

router.get("/", authorize(), (_, res) => {
    labelController
      .loadLabel()
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
  labelController
    .saveLabel(req)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

router.delete("/:labelId", authorize(), (req, res) => {
    labelController
      .deleteTaskLabel(req.params.labelId)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  });

export default router;

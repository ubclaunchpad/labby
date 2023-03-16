import { Router } from "express";
import authorize from "../auth/authorize.js";
import FormController from "../controllers/formController.js";

const router = Router();
const formController = new FormController();

router.post("/", authorize(), (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  formController
    .saveForm(req)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.post("/:formId", authorize(), (req, res) => {
  formController
    .saveFormBuild(req.params.formId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.get("/", authorize(), (_, res) => {
  formController
  .loadForm()
  .then((response) => {
    res.status(200).json(response);
  })
  .catch((err) => {
    res.status(404).json(err);
  });
});

router.delete("/:formId", authorize(), (req, res) => {
  formController
    .deleteForm(req.params.formId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

export default router;

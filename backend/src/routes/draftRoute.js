import { Router } from "express";
import authorize from "../auth/authorize.js";
import DraftController from "../controllers/draftController.js";

const router = Router();
const draftController = new DraftController();

router.post("/", authorize(), (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  draftController
    .saveDraft(req)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.get("/:userId/:formId", authorize(), (req, res) => {
  draftController
    .getDraft(req.params.userId, req.params.formId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
})


router.delete("/:draftId", authorize(), (req, res) => {
  draftController
    .deleteDraft(req.params.draftId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.get("/", authorize(), (req, res) => {
  draftController
    .getAllDraft()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
})


export default router;

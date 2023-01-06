import { Router } from "express";
import QuoteController from "../controllers/quoteController.js";

const router = Router();
const quoteController = new QuoteController();

router.post("/", (req, res) => {
    if (!req || req == undefined || !req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }
    quoteController
        .saveCost(req)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

router.get("/", (_, res) => {
    quoteController
      .loadQuote()
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  });

router.post("/getQuote", (req, res) => {
    if (!req || req == undefined || !req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }
    quoteController
        .getQuote(req)
        .then((response) => { 
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

router.delete("/:answerId", (req, res) => {
    quoteController
        .deleteCost(req.params.answerId)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

export default router;
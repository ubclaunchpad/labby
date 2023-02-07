import { Router } from "express";
import authorize from "../auth/authorize.js";
import SurveyController from "../controllers/surveyController.js";

const router = Router();
const surveyController = new SurveyController();

router.post("/", authorize(), (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    surveyController
        .saveSurvey(req)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

router.post("/response", authorize(), (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    surveyController
        .saveResponse(req)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

router.delete("/:surveyId", authorize(), (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    surveyController
        .deleteSurvey(req.params.surveyId)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

export default router;

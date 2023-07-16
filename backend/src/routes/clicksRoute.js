import { Router } from "express";
import authorize from "../auth/authorize.js";
import ClicksController from "../controllers/clicksController.js";

const router = Router();
const clicksController = new ClicksController();

router.post("/", authorize(), (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    clicksController
        .saveClicks(req)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

router.get("/:componentName", authorize(), (req, res) => {
    if (!req.params.componentName) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    clicksController
        .getClicks(req.params.componentName)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

export default router;
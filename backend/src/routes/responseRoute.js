import { Router } from "express";
import ResponseController from "../controllers/responseController.js";

const router = Router();
const responseController = new ResponseController();

router.post("/", (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    responseController
        .saveResponse(req)
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

export default router;

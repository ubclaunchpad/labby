import { Router } from "express";
import authorize from "../auth/authorize.js";
import OrderController from "../controllers/orderController.js";

const router = Router();
const orderController = new OrderController();

router.post("/", authorize(), (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  orderController
    .reorderQuestion(req)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

export default router;

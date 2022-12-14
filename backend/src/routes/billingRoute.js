import { Router } from "express";
import BillingController from "../controllers/billingController.js";

const router = Router();
const billingController = new BillingController();

router.get("/", (_, res) => {
    billingController
      .loadBillable()
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  });

export default router;

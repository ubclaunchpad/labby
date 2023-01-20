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

  router.get("/:sowID", (req, res) => {
    billingController
      .loadBillableBySowId(req.params.sowID)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  });

router.post("/", (req, res) => {
    billingController
      .saveBillable(req)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  });

router.delete("/:id", (req, res) => {
    billingController
      .deleteBillable(req.params.id)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  });

export default router;
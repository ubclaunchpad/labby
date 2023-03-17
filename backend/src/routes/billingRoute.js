import { Router } from "express";
import authorize from "../auth/authorize.js";
import BillingController from "../controllers/billingController.js";

const router = Router();
const billingController = new BillingController();

router.get("/", authorize(), (_, res) => {
    billingController
      .loadBillable()
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  });

  router.get("/:sowID", authorize(), (req, res) => {
    console.log(req.params);
    billingController
      .loadBillableBySowId(req.params.survey_id)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  });

router.post("/", authorize(), (req, res) => {
    billingController
      .saveBillable(req)
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
  });

router.delete("/:id", authorize(), (req, res) => {
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
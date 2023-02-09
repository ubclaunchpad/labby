import { Router } from "express";
import authorize from "../auth/authorize.js";
import CostCentreController from "../controllers/costCentreController.js";

const router = Router();
const costCentreController = new CostCentreController();

router.get("/", authorize(), (_, res) => {
  costCentreController
    .loadCostCentre()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.get("/assignment", authorize(), (req, res) => {
  costCentreController
    .loadCostCentreAssignment()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.post("/assignment", authorize(), (req, res) => {
  costCentreController
    .assignCostCentre(req)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.delete("/assignment/:id", authorize(), (req, res) => {
  costCentreController
    .deleteCostCenterAssignment(req.params.id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.post("/", authorize(), (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }
  costCentreController
    .saveCostcenter(req)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

router.post("/:organizationId/:costCentreId", authorize(), (req, res) => {
  costCentreController
    .assignCostCentre(req.params.organizationId, req.params.costCentreId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.delete("/:costCentreId", authorize(), (req, res) => {
  costCentreController
    .deleteCostCentre(req.params.costCentreId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

export default router;

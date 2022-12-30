import { Router } from "express";
import OrganizationController from "../controllers/OrganizationController.js";

const router = Router();
const organizationController = new OrganizationController();

router.get("/", (_, res) => {
  organizationController
    .getOrganization()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.delete("/:organizationId", (req, res) => {
  organizationController
    .deleteOrganization(req.params.organizationId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.post("/", (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  organizationController
    .saveOrganization(req)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

export default router;

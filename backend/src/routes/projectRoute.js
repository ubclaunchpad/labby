import { Router } from "express";
import authorize from "../auth/authorize.js";
import ProjectController from "../controllers/projectController.js";

const router = Router();
const projectController = new ProjectController();

router.get("/", authorize(), (_, res) => {
  projectController
    .loadProject()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.get("/assignment", authorize(), (req, res) => {
  projectController
    .loadProjectAssignment()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.post("/assignment", authorize(), (req, res) => {
  projectController
    .saveProjectAssignment(req)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.delete("/assignment/:id", authorize(), (req, res) => {
  projectController
    .deleteProjectAssignment(req.params.id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.post("/", authorize(), (req, res) => {
  projectController
    .saveProject(req)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.delete("/:id", authorize(), (req, res) => {
  projectController
    .deleteProject(req.params.id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

export default router;

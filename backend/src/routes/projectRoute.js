import { Router } from "express";
import ProjectController from "../controllers/projectController.js";

const router = Router();
const projectController = new ProjectController();

router.get("/", (_, res) => {
  projectController
    .loadProject()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.get("/assignment", (req, res) => {
  projectController
    .loadProjectAssignment()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.post("/assignment", (req, res) => {
  projectController
    .saveProjectAssignment(req)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.delete("/assignment/:id", (req, res) => {
  projectController
    .deleteProjectAssignment(req.params.id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.post("/", (req, res) => {
  projectController
    .saveProject(req)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
});

router.delete("/:id", (req, res) => {
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

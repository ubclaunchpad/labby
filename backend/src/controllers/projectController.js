import { Project } from "../models/project.js";

export default class ProjectController {
  loadProject() {
    return new Promise((resolve, reject) => {
      const ProjectModel = new Project();

      ProjectModel.loadProjectCall((err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  loadProjectAssignment() {
    return new Promise((resolve, reject) => {
      const ProjectModel = new Project();

      ProjectModel.loadProjectAssignment((err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  saveProjectAssignment(req) {
    return new Promise((resolve, reject) => {
      const ProjectModel = new Project();
      const projectAssignment = {
        assignment_id: req.body.assignment_id,
        project_id: req.body.project_id,
        organization_id: req.body.organization_id,
      };
      
      ProjectModel.saveProjectAssignment(projectAssignment, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  deleteProjectAssignment(organizationId) {
    return new Promise((resolve, reject) => {
      const ProjectModel = new Project();

      ProjectModel.deleteProjectAssignment(organizationId, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  deleteProject(projectId) {
    return new Promise((resolve, reject) => {
      const ProjectModel = new Project();

      ProjectModel.deleteProject(projectId, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  saveProject(req) {
    return new Promise((resolve, reject) => {
      const ProjectModel = new Project();
      const projectData = {
        project_id: req.body.project_id,
        project_name: req.body.project_name,
        project_description: req.body.project_description,
      };

      ProjectModel.saveProject(projectData, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }
}

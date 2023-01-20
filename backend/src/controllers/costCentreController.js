import { CostCentre } from "../models/costCentre.js";

export default class CostCentreController {
  loadCostCentre() {
    return new Promise((resolve, reject) => {
      const CostCentreModel = new CostCentre();

      CostCentreModel.loadCostCentreCall((err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  loadCostCentreAssignment() {
    return new Promise((resolve, reject) => {
      const CostCentreModel = new CostCentre();

      CostCentreModel.loadCostCentreAssignment((err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  saveCostcenter(req) {
    return new Promise((resolve, reject) => {
      const CostCentreModel = new CostCentre();
      const costCenterData = {
        cost_center_id: req.body.cost_center_id,
        cost_center_name: req.body.cost_center_name,
        cost_center_contact: req.body.cost_center_contact,
        cost_center_email: req.body.cost_center_email,
        cost_center_address: req.body.cost_center_address,
        cost_center_type: req.body.cost_center_type,
      };

      CostCentreModel.insertCostCentre(costCenterData, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  saveCostCentreAssignment(req) {
    return new Promise((resolve, reject) => {
      const CostCentreModel = new CostCentre();

      const costcenterAssignment = {
        assignment_id: req.body.assignment_id,
        project_id: req.body.project_id,
        cost_center_id: req.body.cost_center_id,
      };

      CostCentreModel.saveCostCenterAssignment(
        costcenterAssignment,
        (err, result) => {
          if (err) {
            reject({ error: err });
          }
          resolve(result);
        }
      );
    });
  }

  deleteCostCenterAssignment(projectId) {
    return new Promise((resolve, reject) => {
      const CostCentreModel = new CostCentre();

      CostCentreModel.deleteCostCenterAssignment(projectId, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  deleteCostCentre(id) {
    // note: this also needs to be deleted from the organization
    return new Promise((resolve, reject) => {
      const CostCentreModel = new CostCentre();

      CostCentreModel.deleteCostCentre(id, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  assignCostCentre(req) {
    return new Promise((resolve, reject) => {
      const CostCentreModel = new CostCentre();
      const costCenterAssignment = {
        assignment_id: req.body.assignment_id,
        project_id: req.body.project_id,
        cost_center_id: req.body.cost_center_id,
      };

      CostCentreModel.saveCostCenterAssignment(costCenterAssignment, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }
}

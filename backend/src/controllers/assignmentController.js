import { Assignment } from "../models/assignment.js";

export default class AssignmentController {
  deleteAssignment(id) {
    return new Promise((resolve, reject) => {
      const AssignmentModel = new Assignment();

      AssignmentModel.deleteAssignment(id, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  saveAssignment(req) {
    return new Promise((resolve, reject) => {
      const AssignmentModel = new Assignment();

      const assignment = {
        assignment_id: req.body.assignment_id,
        user_id: req.body.user_id,
        task_id: req.body.task_id,
      };

      AssignmentModel.insertAssignment(assignment, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }
}

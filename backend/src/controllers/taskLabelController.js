import { TaskLabel } from "../models/taskLabel.js";

export default class TaskLabelController {
  saveTaskLabel(req) {
    return new Promise((resolve, reject) => {
      const TaskLabelModel = new TaskLabel();

      const TaskLabel = {
        task_label_id: req.body.task_label_id,
        task_id: req.body.task_id,
        label_id: req.body.label_id,
      };

      TaskLabelModel.insertTaskLabel(TaskLabel, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }
  deleteTaskLabel(id) {
    return new Promise((resolve, reject) => {
      const TaskLabelModel = new TaskLabel();

      TaskLabelModel.deleteTaskLabel(id, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }
}

import { Label } from "../models/label.js";

export default class LabelController {

  loadLabel() {
    return new Promise((resolve, reject) => {
      const LabelModel = new Label();
      LabelModel.loadLabel((err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  saveLabel(req) {
    return new Promise((resolve, reject) => {
      const LabelModel = new Label();

      const label = {
        label_name: req.body.label_name,
        label_id: req.body.label_id,
      };

      LabelModel.insertLabel(label, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  deleteLabel(id) {
    return new Promise((resolve, reject) => {
      const LabelModel = new Label();

      LabelModel.deleteLabel(id, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }
}

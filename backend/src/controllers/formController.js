import { Form } from "../models/form.js";

export default class FormController {
  saveForm(req) {
    return new Promise((resolve, reject) => {
      const FormModel = new Form();

      const form = {
        form_id: req.body.form_id,
        form_name: req.body.form_name
      };

      FormModel.insertForm(form, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  loadForm() {
    return new Promise((resolve, reject) => {
      const FormModel = new Form();

      FormModel.loadForm((err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  loadPublishedForm() {
    return new Promise((resolve, reject) => {
      const FormModel = new Form();

      FormModel.loadPublishedForm((err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  deleteForm(id) {
    return new Promise((resolve, reject) => {
      const FormModel = new Form();

      FormModel.deleteForm(id, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  saveFormBuild(id) {
    return new Promise((resolve, reject) => {
      const FormModel = new Form();

      FormModel.insertFormBuild(id, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }
}

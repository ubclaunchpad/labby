import { Clicks } from "../models/clicks.js";

export default class ClicksController {
  saveClicks(req) {
    return new Promise((resolve, reject) => {
      const ClicksModel = new Clicks();

      const clickCount = {
        component_name: req.body.component_name,
      };

      ClicksModel.insertClicks(clickCount, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  getClicks(req) {
    return new Promise((resolve, reject) => {
      const ClicksModel = new Clicks();

      ClicksModel.getClicks(req, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }
}

import { Billable } from "../models/billable.js";

export default class BillingController {
  loadBillable() {
    return new Promise((resolve, reject) => {
      const BillableModel = new Billable();

      BillableModel.loadBillable((err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  deleteBillable(billableId) {
    return new Promise((resolve, reject) => {
      const BillableModel = new Billable();

      BillableModel.deleteBillable(billableId, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  saveBillable(billable) {
    return new Promise((resolve, reject) => {
      const BillableModel = new Billable();

      BillableModel.saveBillable(billable, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }
}

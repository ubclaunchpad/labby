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
}

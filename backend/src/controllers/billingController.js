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

  saveBillable(req) {
    return new Promise((resolve, reject) => {
      const BillableModel = new Billable();
      const billableData = {
        billable_id: req.body.billable_id,
        sow_id: req.body.sow_id,
        name: req.body.name,
        quantity: req.body.quantity,
        cost: req.body.cost,
        createdDate: req.body.createdDate,
        completedTime: req.body.completedTime,
        billed: req.body.billed,
        billedTime: req.body.billedTime,
        createdBy: req.body.createdBy,
      };

      BillableModel.saveBillable(billableData, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }
}

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

  loadBillableByFilter(req) {
    return new Promise((resolve, reject) => {
      const BillableModel = new Billable();

      const billableFilter = {
        service_id: req.body.service_id,
        costcenter_id: req.body.costcenter_id,
        project_id: req.body.project_id,
        organization_id: req.body.organization_id,
        user_id: req.body.user_id,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
      };

      BillableModel.loadBillableByServiceID(billableFilter, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  loadBillableBySowId(sowID) {
    return new Promise((resolve, reject) => {
      const BillableModel = new Billable();

      BillableModel.loadBillableBySowId(sowID, (err, result) => {
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
        project_id: req.body.project_id,
        name: req.body.name,
        quantity: req.body.quantity,
        cost: req.body.cost,
        comment: req.body.comment,
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
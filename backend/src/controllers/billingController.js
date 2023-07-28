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

  loadBillableWithFilter(req) {
    return new Promise((resolve, reject) => {
      const BillableModel = new Billable();

      const billableFilter = {
        service: req.body.service,
        costcenter_id: req.body.costcenter_id,
        project_id: req.body.project_id,
        organization_id: req.body.organization_id,
        user_id: req.body.user_id,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        archived: req.body.archived,
        billed: req.body.billed,
        ready_to_bill: req.body.ready_to_bill,
      };

      BillableModel.loadBillableByFilter(billableFilter, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  loadBillableBySowId(req) {
    return new Promise((resolve, reject) => {
      const BillableModel = new Billable();
      BillableModel.loadBillableBySowId(req.params.sowId, (err, result) => {
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
        answer_id: req.body.answer_id,
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

  billBillable(billableId) {
    return new Promise((resolve, reject) => {
      const BillableModel = new Billable();

      BillableModel.billBillable(billableId, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }
}
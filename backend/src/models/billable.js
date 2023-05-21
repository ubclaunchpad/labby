import con from "../config/Database.js";

export class Billable {
  loadBillable(result) {
    con.query("CALL load_billable", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  }

  loadBillableBySowId(sowId, result) {
    con.query("CALL load_billable_by_sow(?)", sowId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  }

  loadBillableByFilter(billableFilter, result) {
    con.query(
      "CALL load_billable_with_filter(?,?,?,?,?,?,?,?,?,?)",
      [
        billableFilter.service,
        billableFilter.costcenter_id,
        billableFilter.project_id,
        billableFilter.organization_id,
        billableFilter.user_id,
        billableFilter.start_date,
        billableFilter.end_date,
        billableFilter.archived,
        billableFilter.billed,
        billableFilter.ready_to_bill,
      ],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          result(null, res[0]);
        }
      }
    );
  }

  deleteBillable(billableId, result) {
    con.query("CALL delete_billable(?)", billableId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  }

  saveBillable(billable, result) {
    con.query(
      "CALL save_billable(?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        billable.billable_id,
        billable.sow_id,
        billable.project_id,
        billable.name,
        billable.quantity,
        billable.cost,
        billable.comment,
        billable.createdDate,
        billable.completedTime,
        billable.billed,
        billable.billedTime,
        billable.createdBy,
      ],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          result(null, res[0]);
        }
      }
    );
  }
}

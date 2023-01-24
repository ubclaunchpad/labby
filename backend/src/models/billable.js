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
      "CALL save_billable(?,?,?,?,?,?,?,?,?,?,?)",
      [
        billable.billable_id,
        billable.sow_id,
        billable.project_id,
        billable.name,
        billable.quantity,
        billable.cost,
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

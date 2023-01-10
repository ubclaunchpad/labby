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
    con.query("CALL save_billable(?,?,?,?,?,?,?,?,?)", billable, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  }
}
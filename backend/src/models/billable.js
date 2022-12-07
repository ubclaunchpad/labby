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
}

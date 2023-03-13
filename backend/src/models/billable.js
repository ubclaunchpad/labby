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

  loadBillableByServiceID(billableFilter, result) {
    con.query(
      "CALL load_billable_by_service_id(?)",
      [billableFilter.service_id],
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

  loadBillableByCostCenterID(billableFilter, result) {
    con.query(
      "CALL load_billable_by_costcenter_id(?)",
      [billableFilter.costcenter_id],
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

  loadBillableByProjectId(billableFilter, result) {
    con.query(
      "CALL load_billable_by_project(?)",
      [billableFilter.project_id],
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

  loadBillableByOrganizationId(billableFilter, result) {
    con.query(
      "CALL load_billable_by_organization_id(?)",
      [billableFilter.organization_id],
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

  loadBillableByUserId(billableFilter, result) {
    con.query(
      "CALL load_billable_by_user_id(?)",
      [billableFilter.user_id],
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

  loadBillableByDate(billableFilter, result) {
    con.query(
      "CALL load_billable_by_date(?, ?)",
      [billableFilter.start_date, billableFilter.end_date],
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

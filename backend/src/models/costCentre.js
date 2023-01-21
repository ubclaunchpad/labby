import con from "../config/Database.js";

export class CostCentre {
  loadCostCentreCall(result) {
    con.query("CALL load_cost_center", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  }

  loadCostCentreAssignment(result) {
    con.query("CALL load_project_cost_centers", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  }

  saveCostCenterAssignment(costCenterAssignment, result) {
    con.query(
      "CALL save_project_cost_centers(?,?,?)",
      [
        costCenterAssignment.assignment_id,
        costCenterAssignment.cost_center_id,
        costCenterAssignment.project_id,
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

  deleteCostCenterAssignment(projectId, result) {
    con.query("CALL delete_project_cost_centers(?)", projectId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  }

  insertCostCentre(newCostCentre, result) {
    con.query(
      "CALL save_cost_center(?, ?, ?, ?, ?, ?)",
      [
        newCostCentre.cost_center_id,
        newCostCentre.cost_center_name,
        newCostCentre.cost_center_contact,
        newCostCentre.cost_center_email,
        newCostCentre.cost_center_address,
        newCostCentre.cost_center_type,
      ],
      function (error, results) {
        if (error) {
          console.log("error: ", error);
          result(error, null);
        } else {
          result(null, {
            result: `Response ${results.cost_center_id} Saved Successfully`,
          });
        }
      }
    );
  }

  assignCostCentre(organizationId, costCentreId, result) {
    con.query(
      "CALL assign_organization_cost_centre(?, ?)", // stored procedure should add costCentreId to the organization's table
      [organizationId, costCentreId],
      function (error, results) {
        if (error) {
          console.log("error: ", error);
          results(error, null);
        } else {
          result(null, {
            result: `Organization ${organizationId} Sucessfully Assigned to Cost Centre ${costCentreId}`,
          });
        }
      }
    );
  }
  deleteCostCentre(id, result) {
    con.query(`CALL delete_cost_center(?)`, [id], (err, res) => {
      // have to delete the cost centre from the organization too
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }
}

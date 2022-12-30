import con from "../config/Database.js";

export class Organization {
  insertOrganization(newOrg, result) {
    con.query(
      "CALL save_organization(?, ?, ?, ?, ?, ?, ?)",
      [
        newOrg.organization_id,
        newOrg.organization_name,
        newOrg.organization_contact,
        newOrg.organization_email,
        newOrg.organization_address,
        newOrg.organization_type,
        newOrg.internal_department,
      ],
      function (error, results) {
        if(error) {
          console.log("error: ", error);
          result(error,null);
        } else {
          result(null, {
            result: `Response ${results.organization_id} Saved Successfully`,
          });
        }
      }
    );
  }

  getOrganization(result) {
    con.query(`CALL load_organization()`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  }

  deleteOrganization(id, result) {
    con.query(`CALL delete_organization(?)`, [id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }
}

import e from "express";
import con from "../config/Database.js";

export class CostCentre {
    insertCostCentre(newCostCentre, result) {
        con.query(
            "CALL save_cost_centre(?)", 
            [
                newCostCentre.costCentre_id, 
            ], 
            function (error, results) {
                if (error) {
                    console.log("error: ", error);
                    result(error, null);
                } else {
                    result(null, {
                        result: `Response ${results.costCentre_id} Saved Successfully`,
                    });
                }
            }
        );
    }

    assignCostCentre(organizationId, costCentreId, result) {
        con.query(
            "CALL assign_organization_cost_centre(?, ?)", // this stored procedure will add the costCentreId to the organization's table
            [
                organizationId, 
                costCentreId,
            ], 
            function(error, results) {
                if (error) {
                    console.log("error: ", error);
                    result(error, null);
                } else {
                    result(null, {
                        result: `Organization ${organizationId} Sucessfully Assigned to Cost Centre ${costCentreId}`,
                    });
                }
            }
        );
    }
    deleteCostCentre(id, result) {
        con.query(`CALL delete_cost_centre(?)`, [id], (err, res) => { // have to delete the cost centre from the organization too
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }

}


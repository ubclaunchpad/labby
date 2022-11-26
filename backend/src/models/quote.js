import con from "../config/Database.js";
import { QuoteHelper } from "./quoteHelper.js";

export class Quote {
    insertCost(quote, result) {
        con.query(
            "CALL save_cost(?, ?, ?, ?)",
            [
                quote.cost_id,
                quote.cost,
                quote.answer_id,
                quote.organization,

            ],
            function (error, results) {
                if (error) {
                    console.log("error: ", error);
                    result(error, null);
                } else {
                    result(null, {
                        result: `Quote ${quote.cost} Saved Successfully, Inserted ID: ${results.cost_id}`,
                    });
                }
            }
        );
    }

    getCost(organization, answerId) {
        return QuoteHelper.getSpecificCost(organization, answerId);
    }

    deleteCost(answerId, result) {
        con.query(
            "CALL delete_cost(?)",
            answerId,
            function (error, results) {
                if (error) {
                    console.log("error: ", error);
                    result(error, null);
                } else {
                    result(null, {
                        result: `Quote ${quote.cost} Deleted Successfully, Deleted ID: ${results.cost_id}`,
                    });
                }
            }
        )
    }
}
import con from "../config/Database.js";
import { QuoteHelper } from "./quoteHelper.js";

export class Quote {
    insertCost(costData, result) {
        con.query(
            "CALL save_cost(?, ?, ?, ?)",
            [
                costData.cost_id,
                costData.cost,
                costData.answer_id,
                costData.organization,
            ],
            function (error, results) {
                if (error) {
                    console.log("error: ", error);
                    result(error, null);
                } else {
                    result(null, {
                        result: `Cost of ${costData.cost} Saved Successfully for Answer ID: ${costData.answer_id}, Inserted ID: ${results.cost_id}`,
                    });
                }
            }
        );
    }

    getCost(organization, answerId, result) {
        let helper = new QuoteHelper();
        return helper.getAnswerCost(organization, answerId, result);
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
                        result: `Cost for Answer ${answerId} Deleted Successfully, Deleted ID: ${results.cost_id}`,
                    });
                }
            }
        )
    }
}
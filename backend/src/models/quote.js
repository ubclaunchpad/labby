import con from "../config/Database.js";
import { QuoteHelper } from "./quoteHelper.js";

export class Quote {
  insertCost(costData, result) {
    con.query(
      "CALL save_cost(?, ?, ?, ?, ?)",
      [
        costData.cost_id,
        costData.cost,
        costData.answer_id,
        costData.org_type,
        costData.quantifiable,
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

  loadQuote(result) {
    con.query("CALL load_costs", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  }

  updateQuantifiable(costData, result) {
    con.query(
      "CALL save_cost_quantifiable(?, ?)",
      [costData.answer_id, costData.quantifiable],
      function (error, results) {
        if (error) {
          console.log("error: ", error);
        } else {
          result(null, {
            result: `Quantifiable for Answer ID: ${costData.answer_id} Updated Successfully, Updated ID: ${results.cost_id}`,
          });
        }
      }
    );
  }

  async getCost(org_type, answerId) {
    let helper = new QuoteHelper();

    let result = await helper.getAnswerCost(org_type, answerId);

    return result;
  }

  deleteCost(answerId, result) {
    con.query("CALL delete_cost(?)", answerId, function (error, results) {
      if (error) {
        console.log("error: ", error);
        result(error, null);
      } else {
        result(null, {
          result: `Cost for Answer ${answerId} Deleted Successfully, Deleted ID: ${results.cost_id}`,
        });
      }
    });
  }
}

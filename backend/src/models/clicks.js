import con from "../config/Database.js";

export class Clicks {
  insertClicks(newClicks, result) {
    con.query(
      "CALL update_count(?)",
      [
        newClicks.component_name
      ],
      function (error, results) {
        if (error) {
          console.log("error: ", error);
          result(error, null);
        } else {
          result(null, {
            result: `Component ${newClicks.component_name} Count Saved Successfully, Inserted ID: ${results.insertId}`,
          });
        }
      }
    );
  }
}
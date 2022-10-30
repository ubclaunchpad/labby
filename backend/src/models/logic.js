import con from "../config/Database.js";

const Strategy = {
  SingleSelect: 0,
  MultiSelect: 1,
  Answered: 2,
  NotAnswered: 3,
  NotSingleSelect: 4,
  NotMultiSelect: 5,
}

export class Logic {

  deleteLogic(id, result) {
    con.query(`DELETE FROM questions WHERE question_id="TODO"`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }

  insertLogic(newCondition, result) {

    let condition = {
      condition_id: newCondition.condition_id,
      question_id: newCondition.question_id,
      answer_id: newCondition.answer_id,
      condition_type: newCondition.condition_type,
      parameters: newCondition.parameters,
    }

    if (newCondition.result) {
      switch (newCondition.type) {
        case Strategy.SingleSelect: case Strategy.NotSingleSelect:
          condition.parameters = newCondition.parameters[0];
          this.makeQuery(condition, result);
          break
        case Strategy.Answered: case Strategy.NotAnswered:
          condition.parameters = "";
          this.makeQuery(condition, result);
          break
        case Strategy.MultiSelect: case Strategy.NotMultiSelect:
          for (let param of newCondition.parameters) {
            condition.parameters = param;
            this.makeQuery(condition, result);
          }
          break
        default:
          break
      }
    } else {
      newCondition.result = true;
      switch (newCondition.type) {
        case Strategy.SingleSelect:
          newCondition.type = 4;
          this.insertLogic(newCondition, result);
          break
        case Strategy.MultiSelect:
          condition.type = 5;
          this.insertLogic(condition, result);
          break
        case Strategy.Answered:
          condition.type = 3;
          this.insertLogic(condition, result);
          break
        case Strategy.NotAnswered:
          condition.type = 2;
          this.insertLogic(condition, result);
          break
        case Strategy.NotSingleSelect:
          condition.type = 0;
          this.insertLogic(condition, result);
          break
        case Strategy.NotMultiSelect:
          condition.type = 1;
          this.insertLogic(condition, result);
          break
        default:
          break
      }
    }

  }

  makeQuery(newCondition, result) {
    // con.query("CALL save_condition(?, ?, ?, ?, ?)",
    //   [
    //     newCondition.condition_id,
    //     newCondition.question_id,
    //     newCondition.answer_id,
    //     newCondition.condition_type,
    //     newCondition.parameters,
    //   ],
    //   function (error, results) {
    //     if (error) {
    //       console.log("error", error);
    //       result(error, null);
    //     } else {
    result(null, {
      result: "Condition: xx Saved Successfully, Inserted ID: xx"
    });
    //     }
    //   }

    // );
  }
}

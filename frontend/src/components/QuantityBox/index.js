import "./index.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import uuid from "react-uuid";
import DropArrow from "../../assets/DropArrow.png";
import { ADD_RESPONSE } from "../../redux/actions/formActions";

function QuantityBox({ option }) {
  const dispatch = useDispatch();
  // const currentUser = useSelector((state) => state.userReducer.currentUser);
  const [quantityMap, setQuantityMap] = useState({});

  function parseQuantity(quantity, unit) {
    let numbers = quantity.match(/\d+/g);
    if (numbers === null) {
      return [1, `1 ${unit}`];
    }
    if (numbers.length === 1) {
      return [parseInt(numbers[0]), `${parseInt(numbers[0])} ${unit}`];
    }
    let multiplied = parseInt(numbers[0]) * parseInt(numbers[1]);
    return [
      multiplied,
      `${parseInt(numbers[0])} X ${parseInt(
        numbers[1]
      )} = ${multiplied} ${unit}`,
    ];
  }

  return (
    <div className="quantityBox">
        <div className="quantityHeader">
      <img className="quantityImage" alt="DropArrow" src={DropArrow} />
      <div>Quantity</div>
      </div>
      <div className="quantityInputBox">
        <input
          className="quantityInput"
          onBlur={(e) => {
            let quantity = parseQuantity(e.target.value, option.unit);
            setQuantityMap({
              ...quantityMap,
              [option.answer_id]: quantity,
            });
            dispatch({
              type: ADD_RESPONSE,
              payload: {
                id: uuid(),
                response: option.answer_id,
                question: option,
                quantity: quantity[0],
              },
            });
            // const draftObj = {
            //   draft_id: option.question_id + currentUser.user_id,
            //   fk_user_id: currentUser.user_id,
            //   fk_form_id: option.fk_form_id,
            //   fk_question_id: option.question_id,
            //   answer: option.answer_id,
            // }
            // dispatch({
            //   type: ADD_DRAFT,
            //   payload: draftObj,
            // })
          }}
        />
        <div>
          {quantityMap[option.answer_id]
            ? quantityMap[option.answer_id][1]
            : ""}
        </div>
      </div>
    </div>
  );
}

export default QuantityBox;

const DIRECTION = {
    forward: 0,
    backward: 1
}

export default class OrderController {
    reorderQuestion(req) {
        const order = {
            first_question_index: req.body.first_question,
            second_question_index: req.body.second_question,
            direction: req.body.direction,
        };
        const difference = Math.abs(order.first_question_index - order.second_question_index);

        if (difference == 1) {
            // stored procedure that swaps the two position indices 
        } else {
            let max = Number.MAX_VALUE(order.first_question_index, order.second_question_index);
            let min = Number.MIN_VALUE(order.first_question_index, order.second_question_index);

            if (order.direction == DIRECTION.forward) {

                for (let i = min; i + 1 <= max; i++) {
                    // stored proceduce that swaps positions (i, i+1)

                }
            } else {
                for (let i = max; i - 1 >= min; i--) {
                    // stored proceduce that swaps positions (i, i-1)

                }

            }

        }
    }

}

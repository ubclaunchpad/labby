import { Quote } from "../models/quote";
export default class QuoteController {

    saveCost(req) {
        return new Promise((resolve, reject) => {
            const QuoteModel = new Quote();

            const costData = {
                answer_id: req.body.answer_id,
                organization: req.body.organization,
                cost: req.body.cost,
                cost_id: req.body.cost, // where is this generated? 
            };
            QuoteModel.insertCost(costData, (err, result) => {
                if (err) {
                    reject({ error: err });
                }
                resolve(result);
            });
        });
    }

    getQuote(req) {
        return new Promise((resolve, reject) => {

            const QuoteModel = new Quote();
            const responses = req.body.responses;
            const organization = req.body.organization;
            let totalCost = 0;

            for (let response in responses) {
                totalCost += QuoteModel.getCost(organization, response, (err, result) => {
                    if (err) {
                        reject({ error: err });
                    }
                    resolve(result);
                });
            }

            //  for (response in responses) {
            //     let question_id = response[0]; // assumes first index is question id

            //     for (let i = 1; i < response.length; i++) {
            //         const costData = {
            //             answer_id: response[i],
            //             question_id: question_id,
            //             organization: organization,
            //         }

            //         totalCost += QuoteModel.getCost(costData, (err, result) => {
            //             if (err) {
            //                 reject({ error: err });
            //             }
            //             resolve(result);
            //         });
            //     }
            // }
        });
    }

    deleteCost(answerId) {
        return new Promise((resolve, reject) => {
            const QuoteModel = new Quote();
            QuoteModel.deleteCost(answerId, (err, result) => {
                if (err) {
                    reject({ error: err });
                }
                resolve(result);
            });
        });
    }
}

import { Quote } from "../models/quote.js";
export default class QuoteController {

    saveCost(req) {
        return new Promise((resolve, reject) => {
            if (!req.body.answer_id ||!req.body.organization || !req.body.cost) {
                return reject({error: "Error with request body."})
            }
            const QuoteModel = new Quote();
            const costData = {
                answer_id: req.body.answer_id,
                organization: req.body.organization,
                cost: req.body.cost,
                cost_id: Math.floor(Math.random() * 100),
            };
            QuoteModel.insertCost(costData, (err, result) => {
                if (err) {
                    reject({ error: err });
                }
                resolve(result);
            });
        });
    }

    loadQuote() {
        return new Promise((resolve, reject) => {
          const QuoteModel = new Quote();
    
          QuoteModel.loadQuote((err, result) => {
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

            console.log(responses);

            responses.forEach((response) => {
                console.log(response)
                let cost = QuoteModel.getCost(organization, response, (err, result) => {
                    if (err) {
                        reject({ error: err });
                    }
                    return result;
                });
                console.log(cost);
                totalCost += cost;
                resolve(totalCost);
            });
        
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

import { CostCentre, CostCentre} from "../models/costCentre.js";

export default class CostCentre {
    saveCostCentre(req) {
        return new Promise((resolve, reject) => {
            const CostCentreModel = new CostCentre();

            const costCentre = {
                costCentre_id: req.body.costCentre_id, // add any others here
            };

            CostCentreModel.insertCostCentre(costCentre, (err, result) => {
                if (err) {
                    reject({ error: err});
                }
                resolve(result);
            });
        });
    }

    deleteCostCentre(id) { // note: this also needs to be deleted from the organization
        return new Promise((resolve, reject) => {
            const CostCentreModel = new CostCentre();

            CostCentreModel.deleteCostCentre(id, (err, result) => {
                if (err) {
                    reject( {error: err });
                }
                resolve(result);
            });
        });
    }

    assignCostCentre(organizationId) {
        return new Promise((resolve, reject) => {
            const CostCentreModel = new CostCentre();

            CostCentreModel.assignCostCentre(organizationId, (err, result) => {
                if (err) {
                    reject( { error, err });
                }
                resolve(result);
            })
        });
    }
}
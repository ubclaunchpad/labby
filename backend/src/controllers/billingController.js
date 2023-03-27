import { Billable } from "../models/billable.js";

export default class BillingController {
  loadBillable() {
    return new Promise((resolve, reject) => {
      const BillableModel = new Billable();

      BillableModel.loadBillable((err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  loadBillableByFilter(req) {
    return new Promise((resolve, reject) => {
      const BillableModel = new Billable();

      const billableFilter = {
        service: req.body.service,
        costcenter_id: req.body.costcenter_id,
        project_id: req.body.project_id,
        organization_id: req.body.organization_id,
        user_id: req.body.user_id,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
      };

      BillableModel.loadBillableByService(billableFilter, (err, result) => {
        if (err) {
          reject({ error: err });
        }

        BillableModel.loadBillableByCostCenterID(billableFilter, (err2, result2) => {
          if (err2) {
            reject({ error: err2 });
          }

          BillableModel.loadBillableByProjectId(billableFilter, (err3, result3) => {
            if (err3) {
              reject({ error: err3 });
            }

            BillableModel.loadBillableByOrganizationId(billableFilter, (err4, result4) => {
              if (err4) {
                reject({ error: err4 });
              }

              BillableModel.loadBillableByUserId(billableFilter, (err5, result5) => {
                if (err5) {
                  reject({ error: err5 });
                }

                BillableModel.loadBillableByDate(billableFilter, (err6, result6) => {
                  if (err6) {
                    reject({ error: err6 });
                  }
                  
                  const finalResult = result.concat(result2, result3, result4, result5, result6);
                  const distinctFinalResult = [...new Map(finalResult.map(item => [item.billable_id, item])).values()];
                  const finalANDBillable = [];

                  for (let i = 0; i < distinctFinalResult.length; i++) {
                    const billable = distinctFinalResult[i];
                    const serviceCheck = !billableFilter.service || (billableFilter.service === "") || result.some((resBillable) => resBillable.billable_id === billable.billable_id);
                    const costCenterCheck = !billableFilter.costcenter_id || (billableFilter.costcenter_id === "") || result2.some((resBillable) => resBillable.billable_id === billable.billable_id);
                    const projectCheck = !billableFilter.project_id || (billableFilter.project_id === "") || result3.some((resBillable) => resBillable.billable_id === billable.billable_id);
                    const organizationCheck = !billableFilter.organization_id || (billableFilter.organization_id === "") || result4.some((resBillable) => resBillable.billable_id === billable.billable_id);
                    const userCheck = !billableFilter.user_id || (billableFilter.user_id === "") || result5.some((resBillable) => resBillable.billable_id === billable.billable_id);
                    const dateCheck = (!billableFilter.start_date && !billableFilter.end_date) || (billableFilter.start_date === "" && billableFilter.end_date === "") || result6.some((resBillable) => resBillable.billable_id === billable.billable_id);

                    if (serviceCheck && costCenterCheck && projectCheck && organizationCheck && userCheck && dateCheck) {
                      finalANDBillable.push(billable);
                    }
                  }

                  resolve(finalANDBillable);
                });
              });
            });
          });
        });
      });
    });
  }

  loadBillableBySowId(req) {
    return new Promise((resolve, reject) => {
      const BillableModel = new Billable();
      BillableModel.loadBillableBySowId(req.params.sowId, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }
  
  deleteBillable(billableId) {
    return new Promise((resolve, reject) => {
      const BillableModel = new Billable();

      BillableModel.deleteBillable(billableId, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }

  saveBillable(req) {
    return new Promise((resolve, reject) => {
      const BillableModel = new Billable();
      const billableData = {
        billable_id: req.body.billable_id,
        sow_id: req.body.sow_id,
        project_id: req.body.project_id,
        name: req.body.name,
        quantity: req.body.quantity,
        cost: req.body.cost,
        comment: req.body.comment,
        createdDate: req.body.createdDate,
        completedTime: req.body.completedTime,
        billed: req.body.billed,
        billedTime: req.body.billedTime,
        createdBy: req.body.createdBy,
      };

      BillableModel.saveBillable(billableData, (err, result) => {
        if (err) {
          reject({ error: err });
        }
        resolve(result);
      });
    });
  }
}
import con from "../config/Database.js";

export class QuoteHelper {
  organizationCosts = new Map();

  async getOrganizationCosts(org_type) {
    return new Promise((resolve, reject) => {
      con.query("CALL load_organization_costs(?)", org_type, (error, res) => {
        if (error) {
          console.log("error: ", error);
          reject(error);
        } else {
          const answerCosts = new Map();
          res[0].forEach((cost) => {
            answerCosts.set(cost.fk_answer_id, cost.cost);
          });
          resolve(answerCosts);
        }
      });
    });
  }

  async populateOrgCosts(org_type) {
    if (this.organizationCosts.has(org_type)) {
      return;
    } else {
      let res = await this.getOrganizationCosts(org_type);
      this.organizationCosts.set(org_type, res);
    }
  }

  async getAnswerCost(org_type, answerId) {
    await this.populateOrgCosts(org_type);
    let orgMap = this.organizationCosts.get(org_type);
    if (orgMap.has(answerId)) {
      return orgMap.get(answerId);
    } else {
      return 0;
    }
  }
}

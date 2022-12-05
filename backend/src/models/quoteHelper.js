import con from "../config/Database.js";

export class QuoteHelper {
  organizationCosts = new Map();

  async getOrganizationCosts(orgId) {
    return new Promise((resolve, reject) => {
      con.query("CALL load_organization_costs(?)", orgId, (error, res) => {
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

  async populateOrgCosts(orgId) {
    if (this.organizationCosts.has(orgId)) {
      return;
    } else {
      let res = await this.getOrganizationCosts(orgId);
      this.organizationCosts.set(orgId, res);
    }
  }

  async getAnswerCost(orgId, answerId) {
    await this.populateOrgCosts(orgId);
    let orgMap = this.organizationCosts.get(orgId);
    if (orgMap.has(answerId)) {
      return orgMap.get(answerId);
    } else {
      return 0;
    }
  }
}

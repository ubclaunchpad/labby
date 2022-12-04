
export class QuoteHelper {
    organizationCosts = new Map();

    addToMap(orgId, orgCosts) {
      const answerCosts = new Map();

      console.log(answerCosts);

        for (let orgCost in orgCosts) {
            answerCosts.set(orgCost.answer, orgCost.cost);
        }
        console.log(answerCosts)
        this.organizationCosts.set(orgId, answerCosts);
    }
    
    getOrganizationCosts(orgId, result) {
        con.query(
            "CALL load_organization_costs(?)",
            orgId,
            function (error, res) {
                if (error) {
                    console.log("error: ", error);
                    result(error); 
                } else {
                    console.log(res);
                    this.addToMap(orgId, res);
                }
            }
        )
    }

    populateOrgCosts(orgId, result) {
        console.log(this.organizationCosts.has(orgId))
        if (this.organizationCosts.has(orgId)) {
            return;
        } else {
            this.getOrganizationCosts(orgId, result);
        }
    }

    getAnswerCost(orgId, answerId, result) {
        console.log("getAnswerCost")
        this.populateOrgCosts(orgId, result);
        console.log("populateOrgCosts")
        orgMap = this.organizationCosts.get(orgId);
        console.log("getAnswerCost")
        console.log(orgMap)
        if (orgMap.has(answerId)) {
            return orgMap.get(answerId);
        } else {
            return 0;
        }
    }
}

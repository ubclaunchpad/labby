
export class QuoteHelper {
    organizationCosts = new Map();

    addToMap(orgId, orgCosts) {
      const answerCosts = new Map();

        for (let orgCost in orgCosts) {
            answerCosts.set(orgCost.answer, orgCost.cost);
        }
        organizationCosts.set(orgId, answerCosts);
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
                    addToMap(orgId, res)
                }
            }
        )
    }

    populateOrgCosts(orgId, result) {
        if (organizationCosts.has(orgId)) {
            return;
        } else {
            getOrganizationCosts(orgId, result);
        }
    }

    getAnswerCost(orgId, answerId, result) {
        populateOrgCosts(orgId, result);
        orgMap = organizationCosts.get(orgId);
        if (orgMap.has(answerId)) {
            return orgMap.get(answerId);
        } else {
            return 0;
        }
    }
}

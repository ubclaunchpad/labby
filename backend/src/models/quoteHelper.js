
export var QuoteHelper = () => {
    const organizationCosts = new Map();

    function addToMap(orgId, orgCosts) {
      const answerCosts = new Map();

        for (let orgCost in orgCosts) {
            answerCosts.set(orgCost.answer, orgCost.cost);
        }
        organizationCosts.set(orgId, answerCosts);
    }
    function getOrganizationCosts(orgId, result) {
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

    function populateOrgCosts(orgId, result) {
        if (organizationCosts.has(orgId)) {
            return;
        } else {
            getOrganizationCosts(orgId, result);
        }
    }

    function getAnswerCost(orgId, answerId, result) {
        populateOrgCosts(orgId, result);
        orgMap = organizationCosts.get(orgId);
        if (orgMap.has(answerId)) {
            return orgMap.get(answerId);
        } else {
            return 0;
        }
    }
}

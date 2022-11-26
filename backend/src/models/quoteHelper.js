
export var QuoteHelper = () => {
    const quoteHashMap = new Map();

    function addToMap(orgId, getCostResult) {
        answerHashMap = new Map();

        for (let costResult in getCostResult) {
            // POTENTIAL ISSUE: this isn't the answer id, it's the answer --> ask to change stored procedure? 
            answerHashMap.set(costResult.answer, costResult.cost); // key is the answer id, value is the cost associated with it
        }
        quoteHashMap.set(orgId, answerHashMap); // 
    }
    function getOrganizationCosts(orgId) {
        con.query(
            "CALL load_organization_costs(?)",
            orgId,
            function (error, results) {
                if (error) {
                    console.log("error: ", error);
                    result(error, null);
                } else {
                    addToMap(orgId, results)
                }
            }
        )
    }

    function populateHashMap(orgId) {
        if (quoteHashmap.has(orgId)) {
            return;
        } else {
            getOrganizationCosts(orgId);
        }

    }

    function getSpecificCost(orgId, answerId) {
        populateHashMap(orgId);
        orgMap = quoteHashMap.get(orgId);
        return orgMap.get(answerId)
    }

}

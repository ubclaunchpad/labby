# Initialize_Tables
CALL labby.createForms;
CALL labby.createOrganizations;
CALL labby.createUsers;
CALL labby.createSurveys;
CALL labby.createQuestions;
CALL labby.createQuestions_Answer;
CALL labby.createAnswers;
CALL labby.createAssignment;
CALL labby.createProjects;
CALL labby.createBillable;
CALL labby.createClickAnalytics;
CALL labby.createClinical;
CALL labby.createConditions;
CALL labby.createCostCenters;
CALL labby.createCostCenterAssignments;
CALL labby.createDrafts;
CALL labby.createProjectAssignments;
CALL labby.createQuestions_Cost;
CALL labby.createTasks;
CALL labby.createSubtasks;

CALL addUser('DEMO-USER-1', 'ORG-ID-A', 'Mapcore', 'labby@ubc.com', true, 'd7f349eab1e95fa9', '39cb61ac781817affb8d1af5fe4768007e160646af0e8a844db0ae27e0a7263d6182a133347505a442f2672f499e14b51e4830cfcdbe64c9a8a5077cbfd3a831');

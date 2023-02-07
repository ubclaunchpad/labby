-- The following is a sample set of commands to populate the database with data
use labby;

-- Populate the form
CALL save_form('SAMPLE-FORM-1', 'Sample Form');

-- Populate the form title
CALL save_question('RANDOM-ID-A','SAMPLE-FORM-1','My Sample Form','heading', 0, false);

-- Populate some sample questions
CALL save_question('RANDOM-ID-B','Request Type','multi', 1, false);
CALL save_question('RANDOM-ID-C','Contact Details','contact', 2, false);
CALL save_question('RANDOM-ID-D','Study Title','textline', 3, false);
CALL save_question('RANDOM-ID-E','Sample Dropdown','dropdown', 4, false);
CALL save_question('RANDOM-ID-F','Sample Upload','upload', 5, false);
CALL save_question('RANDOM-ID-G','Edit Your Text!','text', 6, false);
CALL save_question('RANDOM-ID-H','Edit Your Single Choice!','single', 7, false);
CALL save_question('RANDOM-ID-I','My Sample Heading','heading', 8, false);

-- Populate Answers
CALL save_answer('ANSWERID-B','Option1','multi', 'RANDOM-ID-B');
CALL save_answer('ANSWERID-C','Option2','multi', 'RANDOM-ID-B');
CALL save_answer('ANSWERID-D','Option3','multi', 'RANDOM-ID-B');

-- Populate Organization / Cost Center
CALL save_organization('ORG-ID-A','MAPcore', 'Julie Ho', 'julieho@demo.com', '123 Main St', 'External', '');
CALL save_organization('ORG-ID-B','Dr David Huntsman', 'Andy Demo', 'andydemo@demo.com', '456 Main St', 'Internal', 'Pathology');
CALL save_organization('ORG-ID-C','Hungrii Inc.', 'Harin Wu', 'harinwu99@gmail.com', '789 Main St', 'Industry', '');

-- Populate Projects
CALL save_project('PROJECTID-A', 'Project A', 'This is project A');
CALL save_project('PROJECTID-B', 'Project B', 'This is project B');
CALL save_project('PROJECTID-C', 'Project C', 'This is project C');

-- Assign Projects to Organizations
CALL save_organization_projects('ORG-PROJ-1', 'PROJECTID-A', 'ORG-ID-A');
CALL save_organization_projects('ORG-PROJ-2', 'PROJECTID-B', 'ORG-ID-A');

-- Populate Cost Centers
CALL ('COST-CENTER-ID-A', 'Cost Center A', 'Harin Wu', 'harinwu99@gmail.com', '123 Main St', 'External');
CALL save_cost_center('COST-CENTER-ID-B', 'Cost Center B', 'Harin Wu', 'harinwu99@gmail.com', '123 Main St', 'Internal', 'Dollar');
CALL save_cost_center('COST-CENTER-ID-C', 'Cost Center C', 'Harin Wu', 'harinwu99@gmail.com', '123 Main St', 'Industry', 'Dollar');

-- Assign Projects to Cost Centers
CALL save_project_cost_centers('COST-CENTER-PROJ-1', 'COST-CENTER-ID-A', 'PROJECTID-A');
CALL save_project_cost_centers('COST-CENTER-PROJ-2', 'COST-CENTER-ID-A', 'PROJECTID-B');

-- Populate Cost
CALL save_cost('COSTID-B', 10.0, 'MAPCORE-105', 'Internal', true);
CALL save_cost('COSTID-C', 10.0, 'MAPCORE-105', 'External', true);
CALL save_cost('COSTID-D', 10.0, 'MAPCORE-105', 'Industry', true);

-- Populate User
CALL addUser('USER-A', 'ORG-ID-A', 'Harin Wu', 'harinwu99@gmail.com', true, 'd7f349eab1e95fa9', '39cb61ac781817affb8d1af5fe4768007e160646af0e8a844db0ae27e0a7263d6182a133347505a442f2672f499e14b51e4830cfcdbe64c9a8a5077cbfd3a831');
CALL addUser('USER-B', 'ORG-ID-A', 'Elon Musk', 'elonmusk@gmail.com', false, 'd7f349eab1e95fa9', '39cb61ac781817affb8d1af5fe4768007e160646af0e8a844db0ae27e0a7263d6182a133347505a442f2672f499e14b51e4830cfcdbe64c9a8a5077cbfd3a831');
CALL addUser('USER-C', 'ORG-ID-A', 'Jeff Bezos', 'jeffbezos@gmail.com', false, 'd7f349eab1e95fa9', '39cb61ac781817affb8d1af5fe4768007e160646af0e8a844db0ae27e0a7263d6182a133347505a442f2672f499e14b51e4830cfcdbe64c9a8a5077cbfd3a831');

-- Populate Surveys
CALL addSurvey('SURVEYA', 'USER-A', 	2008-11-11);
CALL addSurvey('SURVEYB', 'USER-A', 	2008-11-11);
CALL addSurvey('SURVEYC', 'USER-A', 	2008-11-11);

-- Popular Answers
CALL addAnswer('ANSWERA', 'SURVEYA', 'RANDOM-ID-B', 'ANSWERID-B', "Disease #1")


-- Populate Condition
CALL save_condition('CONDITION-A', 'RANDOM-ID-B', 'ANSWERID-B', 'multi','TRUE');
CALL save_condition('CONDITION-B', 'RANDOM-ID-B', 'ANSWERID-C', 'multi','FALSE');


---- BILLING ----
-- Create SOW
CALL save_task('SOW-1', 'SAMPLE-FORM-1', 'PROJECTID-A', 'Testing Billing', 'This SOW is exclusively for testing billing', 'open');

-- Create Subtasks
CALL save_subtask('SUB-1', 'Subtask Testing 1', 'Subtask 1 Description', 'open', 'SOW-1');
CALL save_subtask('SUB-2', 'Subtask Testing 2', 'Subtask 2 Description', 'open', 'SOW-1');

-- Assign Tasks
CALL save_assignment('ASN-1', 'USER-A', 'SOW-1');
CALL save_assignment('ASN-2', 'USER-A', 'SUB-1');
CALL save_assignment('ASN-3', 'USER-B', 'SUB-1');

-- Create Billable Items
CALL save_billable('BILLABLE-1', 'SOW-1', 'PROJECTID-A', 'Testing Billable 1', 1, 10.0, '2015-01-01', '2015-01-01', false, '2015-01-01', 'USER-A');
CALL save_billable('BILLABLE-2', 'SOW-1', 'PROJECTID-A', 'Testing Billable 2', 1, 15.0, '2015-01-01', '2015-01-01', false, '2015-01-01', 'USER-A');

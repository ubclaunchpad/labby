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

-- Populate Cost
CALL save_cost('COSTID-B', 10.0, 'MAPCORE-105', 'Internal');
CALL save_cost('COSTID-C', 10.0, 'MAPCORE-105', 'External');
CALL save_cost('COSTID-D', 10.0, 'MAPCORE-105', 'Industry');

-- Populate User
CALL addUser('USER-A', 'ORG-ID-A', 'Harin Wu', 'harinwu99@gmail.com', true);
CALL addUser('USER-B', 'ORG-ID-A', 'Elon Musk', 'elonmusk@gmail.com', false);
CALL addUser('USER-C', 'ORG-ID-A', 'Jeff Bezos', 'jeffbezos@gmail.com', false);

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
CALL save_task('SOW-1', 'Testing Billing', 'This SOW is exclusively for testing billing', 'open');

-- Create Subtasks
CALL save_subtask('SUB-1', 'Subtask Testing 1', 'Subtask 1 Description', 'open', 'SOW-1');
CALL save_subtask('SUB-2', 'Subtask Testing 2', 'Subtask 2 Description', 'open', 'SOW-1');

-- Assign Tasks
CALL save_assignment('ASN-1', 'USER-A', 'SOW-1');
CALL save_assignment('ASN-2', 'USER-A', 'SUB-1');
CALL save_assignment('ASN-3', 'USER-B', 'SUB-1');

-- Create Billable Items
CALL save_billable('BILLABLE-1', 'SOW-1', 'Testing Billable 1', 1, 10.0, '2015-01-01', '2015-01-01', false, '2015-01-01', 'USER-A');
CALL save_billable('BILLABLE-2', 'SOW-1', 'Testing Billable 2', 1, 15.0, '2015-01-01', '2015-01-01', false, '2015-01-01', 'USER-A');

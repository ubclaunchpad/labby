-- The following is a sample set of commands to populate the database with data
use labby;


-- Populate the form title
CALL save_question('RANDOM-ID-A','My Sample Form','heading', 0, false);

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

-- Populate Organization
CALL save_organization('ORG-A','ORG1');
CALL save_organization('ORG-B','ORG2');
CALL save_organization('ORG-C','ORG3');

-- Populate Cost
CALL save_cost('COSTID-B', 10.0, 'ANSWERID-B', 'ORG-A');
CALL save_cost('COSTID-C', 10.0, 'ANSWERID-B', 'ORG-B');
CALL save_cost('COSTID-D', 10.0, 'ANSWERID-B', 'ORG-C');

-- Populate User
CALL addUser('USERA', 'ORG-A', 'JackSparrow');
CALL addUser('USERB', 'ORG-A', 'JackMa');
CALL addUser('USERC', 'ORG-A', 'JackandJill');

-- Populate Surveys
CALL addSurvey('SURVEYA', 'USERA', 	2008-11-11);
CALL addSurvey('SURVEYB', 'USERA', 	2008-11-11);
CALL addSurvey('SURVEYC', 'USERA', 	2008-11-11);

-- Popular Answers
CALL addAnswer('ANSWERA', 'SURVEYA', 'RANDOM-ID-B', 'ANSWERID-B', "Disease #1")


-- Populate Condition
CALL save_condition('CONDITION-A', 'RANDOM-ID-B', 'ANSWERID-B', 'multi','TRUE');
CALL save_condition('CONDITION-B', 'RANDOM-ID-B', 'ANSWERID-C', 'multi','FALSE');


---- BILLING ----
-- Create SOW
CALL save_task('SOW-1', 'Testing Billing', 'This SOW is exclusively for testing billing', 'open');

-- Create Billable Items
CALL save_billable('BILLABLE-1', 'SOW-1', 'Testing Billable 1', 1, 10.0, '2015-01-01', '2015-01-01', false, '2015-01-01');
CALL save_billable('BILLABLE-2', 'SOW-1', 'Testing Billable 2', 1, 15.0, '2015-01-01', '2015-01-01', false, '2015-01-01');

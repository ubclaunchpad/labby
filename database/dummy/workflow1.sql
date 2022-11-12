-- The following is a sample set of commands to populate the database with data
use labby;


-- Populate the form title
CALL save_question('RANDOM-ID-A','My Sample Form','heading', 0);

-- Populate some sample questions
CALL save_question('RANDOM-ID-B','Request Type','multi', 1);
CALL save_question('RANDOM-ID-C','Contact Details','contact', 2);
CALL save_question('RANDOM-ID-D','Study Title','textline', 3);
CALL save_question('RANDOM-ID-E','Sample Dropdown','dropdown', 4);
CALL save_question('RANDOM-ID-F','Sample Upload','upload', 5);

-- Populate Answers
CALL save_answer('ANSWERID-B','Option1','multi', 'RANDOM-ID-B');
CALL save_answer('ANSWERID-C','Option2','multi', 'RANDOM-ID-B');
CALL save_answer('ANSWERID-D','Option3','multi', 'RANDOM-ID-B');

-- Populate Organization
CALL save_organization('ORG-A','ORG');

-- Populate Cost
CALL save_cost('COSTID-B', 10.0, 'ANSWERID-B', 'ORG-A');
CALL save_cost('COSTID-C', 10.0, 'ANSWERID-B', 'ORG-A');
CALL save_cost('COSTID-D', 10.0, 'ANSWERID-B', 'ORG-A');

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




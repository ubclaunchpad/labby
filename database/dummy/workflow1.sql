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
CALL save_question('RANDOM-ID-G','Edit Your Text!','text', 6);
CALL save_question('RANDOM-ID-H','Edit Your Single Choice!','single', 7);

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

-- Populate Condition
CALL save_condition('CONDITION-A', 'RANDOM-ID-B', 'ANSWERID-B', 'multi','TRUE');
CALL save_condition('CONDITION-B', 'RANDOM-ID-B', 'ANSWERID-C', 'multi','FALSE');

12:46:05	CALL save_question('RANDOM-ID-A','My Sample Form','heading', 0)	Error Code: 1318. Incorrect number of arguments for PROCEDURE labby.save_question; expected 5, got 4	0.059 sec

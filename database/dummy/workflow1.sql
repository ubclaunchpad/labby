-- The following is a sample set of commands to populate the database with data

-- Populate the form title
CALL save_question('RANDOM-ID-A','My Sample Form','heading', 0);

-- Populate some sample questions
CALL save_question('RANDOM-ID-B','Request Type','multi', 1);
CALL save_question('RANDOM-ID-C','Contact Details','contact', 2);
CALL save_question('RANDOM-ID-D','Study Title','textline', 3);
CALL save_question('RANDOM-ID-E','Sample Dropdown','dropdown', 4);
CALL save_question('RANDOM-ID-F','Sample Upload','upload', 5);
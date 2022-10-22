Use labby;

DROP TABLE conditions;
DROP TABLE questions_cost;
DROP TABLE organizations;
DROP TABLE questions_answer;
DROP TABLE questions;


CALL createQuestions;
CALL createQuestions_Answer;
CALL createOrganizations;
CALL createQuestions_Cost;
CALL createConditions;

USE `labby`;

DROP TABLE IF EXISTS `questions_cost`;
DROP PROCEDURE IF EXISTS `createQuestions_Cost`;

DELIMITER $$
USE `labby`$$

CREATE PROCEDURE `createQuestions_Cost` ()
BEGIN

CREATE TABLE `questions_cost` (
	cost_id VARCHAR(50),
	fk_question_id VARCHAR(50),
	cost DOUBLE,
	PRIMARY KEY (`cost_id`),
	FOREIGN KEY (fk_question_id) REFERENCES questions(question_id)
);

END$$

DELIMITER ;

19:37:04	CALL createQuestions_cost()	Error Code: 1072. Key column 'fk_answer_id' doesn't exist in table	0.059 sec

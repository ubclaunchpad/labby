USE `labby`;

DROP TABLE IF EXISTS `questions_cost`;
DROP PROCEDURE IF EXISTS `createQuestions_Cost`;

DELIMITER $$
USE `labby`$$

CREATE PROCEDURE `createQuestions_Cost` ()
BEGIN

CREATE TABLE `questions_cost` (
	cost_id VARCHAR(50),
	fk_answer_id VARCHAR(50),
	cost DOUBLE,
	PRIMARY KEY (`cost_id`),
	FOREIGN KEY (fk_answer_id) REFERENCES questions_answer(answer_id)
);

END$$

DELIMITER ;
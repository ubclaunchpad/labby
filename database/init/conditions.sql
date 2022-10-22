USE `labby`;

DROP TABLE IF EXISTS `conditions`;
DROP PROCEDURE IF EXISTS `createConditions`;

DELIMITER $$
USE `labby`$$

CREATE PROCEDURE `createConditions` ()
BEGIN

CREATE TABLE `conditions` (
	condition_id VARCHAR(50) NOT NULL, 
	fk_question_id VARCHAR(50),
	fk_answer_id VARCHAR(50),
	is_true BOOLEAN,
	PRIMARY KEY (`condition_id`),
	FOREIGN KEY (fk_question_id) REFERENCES questions(question_id),
	FOREIGN KEY (fk_answer_id) REFERENCES questions_answer(answer_id)

);

END$$

DELIMITER ;
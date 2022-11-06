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
	condition_type VARCHAR(50),
	condition_parameter VARCHAR(50),
	PRIMARY KEY (`condition_id`),
	FOREIGN KEY (fk_question_id) REFERENCES questions(question_id) ON DELETE CASCADE,
	FOREIGN KEY (fk_answer_id) REFERENCES questions_answer(answer_id) ON DELETE CASCADE

);

END$$

DELIMITER ;
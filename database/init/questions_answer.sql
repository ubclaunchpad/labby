USE `labby`;

DROP TABLE IF EXISTS `questions_answer`;
DROP PROCEDURE IF EXISTS `createQuestions_Answer`;

DELIMITER $$
USE `labby`$$

CREATE PROCEDURE `createQuestions_Answer` ()
BEGIN

CREATE TABLE `questions_answer` (
	answer_id VARCHAR(50) NOT NULL,
	fk_question_id VARCHAR(50),
	question_type VARCHAR(50),
	answer VARCHAR(50),
	PRIMARY KEY (`answer_id`),
	FOREIGN KEY (fk_question_id) REFERENCES questions(question_id) ON DELETE CASCADE  
);
 
END$$

DELIMITER ;


USE `labby`;

DROP TABLE IF EXISTS `answers`;
DROP PROCEDURE IF EXISTS `createAnswers`;
DROP PROCEDURE IF EXISTS `addAnswer`;
DROP PROCEDURE IF EXIStS `deleteAnswer`;

DELIMITER $$

CREATE PROCEDURE `createAnswers` ()
BEGIN

CREATE TABLE `answers` (
	answer_id VARCHAR(50) NOT NULL,
	fk_survey_id VARCHAR(50),
	fk_question_id VARCHAR (50),
	fk_questions_answer_id VARCHAR (50),
	answer TEXT,

	PRIMARY KEY (`answer_id`),
	FOREIGN KEY (fk_survey_id) REFERENCES surveys(survey_id) ON DELETE CASCADE,
	FOREIGN KEY (fk_question_id) REFERENCES questions(question_id) ON DELETE CASCADE,
	FOREIGN KEY (fk_questions_answer_id) REFERENCES questions_answer(answer_id)
);
END$$


CREATE PROCEDURE `addAnswer` (
	IN `_answer_id` VARCHAR(50),
	IN `_fk_survey_id` VARCHAR(50),
	IN `_fk_question_id` VARCHAR (50),
	IN `_fk_questions_answer_id` VARCHAR (50),
	IN `_answer` TEXT
)
BEGIN REPLACE INTO `answers` (
	`answer_id`,
	`fk_survey_id`,
	`fk_question_id`,
	`fk_questions_answer_id`,
	`answer`
)
VALUES (
	`_answer_id`,
	`_fk_survey_id`,
	`_fk_question_id`,
	`_fk_questions_answer_id`,
	`_answer`
);
END $$

CREATE PROCEDURE `deleteAnswer`  (
    IN id VARCHAR(50)
)
BEGIN
    DELETE FROM answers WHERE answer_id = id;
END $$

DELIMITER ;




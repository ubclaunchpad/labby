USE `labby`;

DROP TABLE IF EXISTS `surveys`;
DROP PROCEDURE IF EXISTS `createSurveys`;
DROP PROCEDURE IF EXISTS `addSurvey`;
DROP PROCEDURE IF EXIStS `deleteSurvey`;

DELIMITER $$

CREATE PROCEDURE `createSurveys` ()
BEGIN

CREATE TABLE `surveys` (
	survey_id VARCHAR(50) NOT NULL,
	fk_user_id VARCHAR (50),
	date_created DATETIME,
	PRIMARY KEY (`survey_id`),
	FOREIGN KEY (fk_user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
END$$



CREATE PROCEDURE `addSurvey` (
	IN `_survey_id` VARCHAR(50),
	IN `_fk_user_id` VARCHAR(50),
	IN `_date_created` DATETIME
)
BEGIN REPLACE INTO `surveys` (
	`survey_id`,
	`fk_user_id`,
	`date_created`
)
VALUES (
	`_survey_id`,
	`_fk_user_id`,
	`_date_created`
);
END $$

CREATE PROCEDURE `deleteSurvey`  (
    IN id VARCHAR(50)
)
BEGIN
    DELETE FROM surveys WHERE survey_id = id;
END $$

CREATE PROCEDURE `load_answers_by_survey` (IN `_survey_id` VARCHAR(50))

BEGIN
	SELECT questions.*, questions_answer.answer FROM answers 

		LEFT JOIN questions
			ON answers.fk_question_id = questions.question_id
			
		LEFT JOIN questions_answer
			ON answers.fk_questions_answer_id = questions_answer.answer_id

		WHERE fk_survey_id = "65c22c34-a28c-5464-881f-91b439621a94"
		
		ORDER BY
			position_index
  
END $$


DELIMITER ;










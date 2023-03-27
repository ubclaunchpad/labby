USE `labby`;

DROP PROCEDURE IF EXISTS `createSurveys`;
DROP PROCEDURE IF EXISTS `addSurvey`;
DROP PROCEDURE IF EXISTS `loadSurveyByUser`;
DROP PROCEDURE IF EXIStS `deleteSurvey`;
DROP PROCEDURE IF EXISTS `load_answers_by_survey`;

DELIMITER $$

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

CREATE PROCEDURE `loadSurveyByUser` (
    IN `_fk_user_id` VARCHAR(50)
)
BEGIN
    SELECT surveys.*, tasks.* FROM surveys 
    INNER JOIN tasks ON surveys.survey_id = tasks.fk_survey_id
    WHERE fk_user_id = `_fk_user_id`;
END $$

CREATE PROCEDURE `deleteSurvey`  (
    IN id VARCHAR(50)
)
BEGIN
    DELETE FROM surveys WHERE survey_id = id;
END $$

CREATE PROCEDURE `load_answers_by_survey` (IN `_survey_id` VARCHAR(50))

BEGIN
SELECT questions.*, questions_answer.answer, answers.answer as answerid FROM answers 
LEFT JOIN questions ON answers.fk_question_id = questions.question_id
LEFT JOIN questions_answer ON answers.fk_questions_answer_id = questions_answer.answer_id
WHERE fk_survey_id = `_survey_id`
ORDER BY position_index;
END $$


DELIMITER ;

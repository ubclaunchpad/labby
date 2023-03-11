USE `labby`;

DROP PROCEDURE IF EXISTS `addClinical`;
DROP PROCEDURE IF EXISTS `load_clinical_by_survey`;

DELIMITER $$

CREATE PROCEDURE `addClinical` (
	IN `_clinical_id` VARCHAR(50),
	IN `_fk_survey_id` VARCHAR(50),
	IN `_fk_question_id` VARCHAR (50),
	IN `_fk_questions_answer_id` VARCHAR (50),
	IN `_sample_id` VARCHAR(50),
	IN `_authorized_by` VARCHAR(50)
)
BEGIN REPLACE INTO `clinical` (
	`clinical_id`,
	`fk_survey_id`,
	`fk_question_id`,
	`fk_questions_answer_id`,
	`sample_id`,
	`authorized_by`
)
VALUES (
	`_clinical_id`,
	`_fk_survey_id`,
	`_fk_question_id`,
	`_fk_questions_answer_id`,
	`_sample_id`,
	`_authorized_by`
);
END $$

CREATE PROCEDURE `load_clinical_by_survey` (IN `_survey_id` VARCHAR(50))

BEGIN
SELECT * FROM clinical 
WHERE fk_survey_id = `_survey_id`;
END $$

DELIMITER ;




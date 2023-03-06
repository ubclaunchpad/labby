USE `labby`;

DROP TABLE IF EXISTS `clinical`;
DROP PROCEDURE IF EXISTS `createClinical`;

DELIMITER $$

CREATE PROCEDURE `createClinical` ()
BEGIN

CREATE TABLE `clinical` (
	clinical_id VARCHAR(50) NOT NULL,
	fk_survey_id VARCHAR(50),
	fk_question_id VARCHAR (50),
	fk_questions_answer_id VARCHAR (50),
	sample_id VARCHAR(50),
	authorized_by VARCHAR(50),

	PRIMARY KEY (`clinical_id`),
	FOREIGN KEY (fk_survey_id) REFERENCES surveys(survey_id) ON DELETE CASCADE,
	FOREIGN KEY (fk_question_id) REFERENCES questions(question_id) ON DELETE CASCADE,
	FOREIGN KEY (fk_questions_answer_id) REFERENCES questions_answer(answer_id)
);
END$$

DELIMITER ;




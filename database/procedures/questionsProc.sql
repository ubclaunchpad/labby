USE `labby`;

DROP procedure IF EXISTS `save_question`;
 
DELIMITER $$

CREATE PROCEDURE `save_question` (
    IN `_question_id` VARCHAR(50),
    IN `_fk_form_id` VARCHAR(50),
    IN `_question` TEXT,
    IN `_question_type` VARCHAR(50),
    IN `_question_order` INT,
    IN `_mandatory` BOOLEAN,
    IN `_clinical` BOOLEAN,
    IN `_question_note` TEXT,
    IN `_numerical_only` BOOLEAN
 
) BEGIN INSERT INTO `questions` (
    `question_id`,
    `fk_form_id`,
    `question`,
    `question_type`,
    `position_index`,
    `mandatory`,
    `clinical`,
    `question_note`,
    `numerical_only`
)
VALUES
    (
    `_question_id`,
    `_fk_form_id`,
    `_question`,
    `_question_type`,
    `_question_order`,
    `_mandatory`,
    `_clinical`,
    `_question_note`,
    `_numerical_only`
    )
ON DUPLICATE KEY UPDATE 
    questions.question_id=`_question_id`, 
    questions.fk_form_id=`_fk_form_id`,
    questions.question=`_question`, 
    questions.question_type=`_question_type`,
    questions.position_index=`_question_order`,
    questions.mandatory=`_mandatory`,
    questions.clinical=`_clinical`,
    questions.question_note=`_question_note`;
    questions.numerical_only=`_numerical_only`;
  
END $$

DELIMITER ;

USE `labby`;

DROP procedure IF EXISTS `save_question`;
 
 CALL save_question("test", "45a0d693-43c4-41e6-7c5f-4d13124d9b26", "test", "test", 12, 12, 12);
SELECT * from questions  where fk_form_id = "45a0d693-43c4-41e6-7c5f-4d13124d9b26";

DELIMITER $$

CREATE PROCEDURE `save_question` (
    IN `_question_id` VARCHAR(50),
    IN `_fk_form_id` VARCHAR(50),
    IN `_question` VARCHAR(255),
    IN `_question_type` VARCHAR(50),
    IN `_question_order` INT,
    IN `_mandatory` BOOLEAN,
    IN `_clinical` BOOLEAN,
    IN `_quantity` INT
 
) BEGIN INSERT INTO `questions` (
    `question_id`,
    `fk_form_id`,
    `question`,
    `question_type`,
    `position_index`,
    `mandatory`,
    `clinical`,
    `quantity`
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
    `_quantity`
    )
ON DUPLICATE KEY UPDATE 
    questions.question_id=`_question_id`, 
    questions.fk_form_id=`_fk_form_id`,
    questions.question=`_question`, 
    questions.question_type=`_question_type`,
    questions.position_index=`_question_order`,
    questions.mandatory=`_mandatory`,
    questions.clinical=`_clinical`,
    questions.quantity=`_quantity`
  
END $$

DELIMITER ;

USE `labby`;
 
DROP procedure IF EXISTS `save_form`;
DROP procedure IF EXISTS `save_question`;
DROP procedure IF EXISTS `save_answer`;
DROP procedure IF EXISTS `save_cost`;
DROP procedure IF EXISTS `save_organization`;
DROP procedure IF EXISTS `save_condition`;
 
DELIMITER $$

CREATE PROCEDURE `save_form` (
   IN `_form_id` VARCHAR(50),
   IN `_form_name` VARCHAR(50)
 
) BEGIN INSERT INTO `forms` (
   `form_id`,
   `form_name`,
   `date_created`
)
VALUES
   (
   `_form_id`,
   `_form_name`,
   now()
   )
ON DUPLICATE KEY UPDATE 
   forms.form_id=`_form_id`, 
   forms.form_name=`_form_name`;
  
END $$
 
CREATE PROCEDURE `save_question` (
   IN `_question_id` VARCHAR(50),
   IN `_fk_form_id` VARCHAR(50),
   IN `_question` VARCHAR(50),
   IN `_question_type` VARCHAR(50),
   IN `_question_order` INT,
   IN `_mandatory` BOOLEAN
 
) BEGIN INSERT INTO `questions` (
   `question_id`,
   `fk_form_id`,
   `question`,
   `question_type`,
   `position_index`,
   `mandatory`
)
VALUES
   (
   `_question_id`,
   `_fk_form_id`,
   `_question`,
   `_question_type`,
   `_question_order`,
   `_mandatory`
   )
ON DUPLICATE KEY UPDATE 
   questions.question_id=`_question_id`, 
   questions.fk_form_id=`_fk_form_id`,
   questions.question=`_question`, 
   questions.question_type=`_question_type`,
   questions.position_index=`_question_order`,
   questions.mandatory=`_mandatory`;
  
END $$
 
CREATE PROCEDURE `save_answer` (
   IN `_answer_id` VARCHAR(50),
   IN `_answer` VARCHAR(50),
   IN `_question_type` VARCHAR(50),
   IN `_fk_question_id` VARCHAR(50)
 
) BEGIN INSERT INTO `questions_answer` (
   `answer_id`,
   `answer`,
   `question_type`,
   `fk_question_id`
)
VALUES
   (
  `_answer_id`,
   `_answer`,
   `_question_type`,
  `_fk_question_id`
   )
ON DUPLICATE KEY UPDATE 
   questions_answer.answer_id=`_answer_id`, 
   questions_answer.answer=`_answer`, 
   questions_answer.question_type=`_question_type`,
   questions_answer.fk_question_id=`_fk_question_id`;
  
END $$
 
CREATE PROCEDURE `save_cost` (
   IN `_cost_id` VARCHAR(50),
   IN `_cost` DOUBLE,
   IN `_fk_answer_id` VARCHAR(50),
   IN `_fk_organization_id` VARCHAR(50)
 
) BEGIN REPLACE INTO `questions_cost` (
   `cost_id`,
   `cost`,
   `fk_answer_id`,
   `fk_organization_id`
  
)
VALUES
   (
   `_cost_id`, 
   `_cost`,
  `_fk_answer_id`,
  `_fk_organization_id`
 
   );

END $$

CREATE PROCEDURE `save_organization` (
   IN `_organization_id` VARCHAR(50),
   IN `_organization_name` VARCHAR(50)
 
) BEGIN INSERT INTO `organizations` (
   `organization_id`,
   `organization_name`
)
VALUES
   (
   `_organization_id`,
   `_organization_name`
   )
ON DUPLICATE KEY UPDATE 
   organizations.organization_id=`_organization_id`, 
   organizations.organization_name=`_organization_name`;
  
END $$

CREATE PROCEDURE `save_condition` (
   IN `_condition_id` VARCHAR(50),
   IN `_fk_question_id` VARCHAR(50),
   IN `_fk_answer_id` VARCHAR(50),
   IN `_condition_type` VARCHAR(50),
   IN `_condition_parameter` VARCHAR(50)
 
) BEGIN REPLACE INTO `conditions` (
   `condition_id`,
   `fk_question_id`,
   `fk_answer_id`,
   `condition_type`,
   `condition_parameter`
)
VALUES
   (
   `_condition_id`,
   `_fk_question_id`,
   `_fk_answer_id`,
   `_condition_type`,
   `_condition_parameter`
   );
  
END $$
 
DELIMITER ;

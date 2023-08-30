USE `labby`;

DROP procedure IF EXISTS `save_form`;
DROP procedure IF EXISTS `save_answer`;
DROP procedure IF EXISTS `save_cost`;
DROP procedure IF EXISTS `save_condition`;

DELIMITER $$

CREATE PROCEDURE `save_form` (
   IN `_form_id` VARCHAR(50),
   IN `_form_name` VARCHAR(50)
) BEGIN INSERT INTO `forms` (
   `form_id`,
   `form_name`,
   `date_created`,
   `published`
)
VALUES
   (
   `_form_id`,
   `_form_name`,
   now(),
   false
   )
ON DUPLICATE KEY UPDATE 
   forms.form_id=`_form_id`, 
   forms.form_name=`_form_name`,
   forms.date_created=now(),
   forms.published=false;

END $$

CREATE PROCEDURE `save_answer` (
   IN `_answer_id` VARCHAR(50),
   IN `_answer` TEXT,
   IN `_question_type` VARCHAR(50),
   IN `_fk_question_id` VARCHAR(50)

) BEGIN INSERT INTO `questions_answer` (
   `answer_id`,
   `answer`,
   `question_type`,
   `fk_question_id`,
   `added_on`
)
VALUES
   (
  `_answer_id`,
   `_answer`,
   `_question_type`,
  `_fk_question_id`,
   now()
   )
ON DUPLICATE KEY UPDATE 
   questions_answer.answer_id=`_answer_id`, 
   questions_answer.answer=`_answer`, 
   questions_answer.question_type=`_question_type`,
   questions_answer.fk_question_id=`_fk_question_id`,
   questions_answer.added_on=now();

END $$

CREATE PROCEDURE `save_cost` (
   IN `_cost_id` VARCHAR(50),
   IN `_cost` DOUBLE,
   IN `_fk_answer_id` VARCHAR(50),
   IN `_price_category` VARCHAR(50),
   IN `_quantifiable` BOOLEAN,
   IN `_unit` VARCHAR(50)
) BEGIN REPLACE INTO `questions_cost` (
   `cost_id`,
   `cost`,
   `fk_answer_id`,
   `price_category`,
   `quantifiable`,
   `unit`
)
VALUES
   (
   `_cost_id`, 
   `_cost`,
   `_fk_answer_id`,
   `_price_category`,
   `_quantifiable`,
   `_unit`
   );

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

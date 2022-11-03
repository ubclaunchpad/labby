USE `labby`;
 
DROP procedure IF EXISTS `save_question`;
 
DROP procedure IF EXISTS `save_answer`;
 
DROP procedure IF EXISTS `save_cost`;

DROP procedure IF EXISTS `save_organization`;

DROP procedure IF EXISTS `save_condition`;
 
DELIMITER $$
 
CREATE PROCEDURE `save_question` (
   IN `_question_id` VARCHAR(50),
   IN `_question` VARCHAR(50),
   IN `_question_type` VARCHAR(50),
   IN `_question_order` INT
 
) BEGIN REPLACE INTO `questions` (
   `question_id`,
   `question`,
   `question_type`,
   `position_index`
)
VALUES
   (
   `_question_id`,
   `_question`,
   `_question_type`,
   `_question_order`
   );
  
END $$
 
CREATE PROCEDURE `save_answer` (
   IN `_answer_id` VARCHAR(50),
   IN `_answer` VARCHAR(50),
   IN `_question_type` VARCHAR(50),
   IN `_fk_question_id` VARCHAR(50)
 
) BEGIN REPLACE INTO `questions_answer` (
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
 
   );
  
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
 
) BEGIN REPLACE INTO `organizations` (
   `organization_id`,
   `organization_name`
)
VALUES
   (
   `_organization_id`,
   `_organization_name`
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

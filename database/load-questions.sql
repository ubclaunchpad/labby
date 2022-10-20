USE `labby.db`;
 
DROP procedure IF EXISTS `load_questions`;
 
DROP procedure IF EXISTS `load_answer`;
 
DROP procedure IF EXISTS `load_cost`;
 
DELIMITER $$
 
CREATE PROCEDURE `load_question` (
   IN `_question` VARCHAR(50),
   IN `_question_type` VARCHAR(50)
 
) BEGIN REPLACE INTO `questions` (
   `question`,
   `question_type`
)
VALUES
   (
   `_question`,
   `_question_type`
   );
  
END $$
 
CREATE PROCEDURE `load_answer` (
   IN `_answer_id` VARCHAR(50),
   IN `_answer` VARCHAR(50),
   IN `_question_type` VARCHAR(50),
   IN `_fk_question_id` VARCHAR(50)
 
) BEGIN REPLACE INTO `question_answers` (
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
 
CREATE PROCEDURE `load_cost` (
   IN `_cost_id` VARCHAR(50),
   IN `_cost` VARCHAR(50),
   IN `_fk_answer_id` INT
 
) BEGIN REPLACE INTO `questions_cost` (
   `cost_id`,
   `cost`,
   `fk_answer_id`
  
)
VALUES
   (
   `_cost_id`,
   `_cost`,
  `_fk_question_id`
 
   );
  
END $$
 
DELIMITER ;
 

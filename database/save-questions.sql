USE `labby.db`;
 
DROP procedure IF EXISTS `save_question`;
 
DROP procedure IF EXISTS `save_answer`;
 
DROP procedure IF EXISTS `save_cost`;
 
DELIMITER $$
 
CREATE PROCEDURE `save_question` (
   IN `_question_id` VARCHAR(50),
   IN `_question` VARCHAR(50),
   IN `_question_type` VARCHAR(50)
 
) BEGIN REPLACE INTO `questions` (
   `question_id`,
   `question`,
   `question_type`
)
VALUES
   (
`_question_id`,
   `_question`,
   `_question_type`
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
   IN `_fk_answer_id` VARCHAR(50)
 
) BEGIN REPLACE INTO `questions_cost` (
   `cost_id`,
   `cost`,
   `fk_answer_id` --check with Martin, discrepancies in vscode and database
  
)
VALUES
   (
   `_cost_id`,
   `_cost`,
  `_fk_answer_id`
 
   );
  
END $$
 
DELIMITER ;
 
15:50:40	CALL save_cost('0',100,'0')	Error Code: 1054. Unknown column 'fk_answer_id' in 'field list'	0.071 sec

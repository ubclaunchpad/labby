USE `labby`;

DROP TABLE IF EXISTS `questions`;
DROP PROCEDURE IF EXISTS `createQuestions`;

DELIMITER $$
USE `labby`$$

CREATE PROCEDURE `createQuestions` ()
BEGIN

CREATE TABLE `questions` (
  `question_id` VARCHAR(50),
  `question_type` VARCHAR(50),
  `question` VARCHAR(50),
  PRIMARY KEY (`question_id`)
);

END$$

DELIMITER ;
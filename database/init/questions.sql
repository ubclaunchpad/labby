USE `labby`;

DROP TABLE IF EXISTS `questions`;
DROP PROCEDURE IF EXISTS `createQuestions`;

DELIMITER $$

CREATE PROCEDURE `createQuestions` ()
BEGIN

CREATE TABLE `questions` (
  `question_id` VARCHAR(50) NOT NULL,
  `fk_form_id` VARCHAR(50),
  `question_type` VARCHAR(50),
  `question` TEXT,
  `position_index` INT,
  `mandatory` BOOLEAN,
  `clinical` BOOLEAN,
  `question_note` TEXT,
  `numerical_only` BOOLEAN,
  PRIMARY KEY (`question_id`),
  FOREIGN KEY (fk_form_id) REFERENCES forms(form_id) ON DELETE CASCADE  
);

END$$

DELIMITER ;
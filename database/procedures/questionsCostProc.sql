USE `labby`;
 
DROP procedure IF EXISTS `save_cost_quantifiable`;
 
DELIMITER $$
 
CREATE PROCEDURE `save_cost_quantifiable` (
   IN `_answer_id` VARCHAR(50),
   IN `_quantifiable` BOOLEAN
) BEGIN 

UPDATE questions_cost 
SET `quantifiable` = `_quantifiable`
WHERE `fk_answer_id` = `_answer_id`;

END $$
 
DELIMITER ;

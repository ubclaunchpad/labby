USE `labby`;
 
DROP procedure IF EXISTS `delete_question`;
DROP procedure IF EXISTS `delete_answer`;
DROP procedure IF EXISTS `delete_cost`;
DROP procedure IF EXISTS `delete_organization`; 
DROP procedure IF EXISTS `delete_condition`;
 
 
DELIMITER $$

-- look into cascade delete
CREATE PROCEDURE `delete_question`  (
    IN id VARCHAR(50)
)
BEGIN
    DELETE FROM questions WHERE question_id = id;
END $$

CREATE PROCEDURE `delete_answer`  (
    IN id VARCHAR(50)
)
BEGIN
    DELETE FROM questions_answer WHERE answer_id = id;
END $$

CREATE PROCEDURE `delete_cost`  (
    IN id VARCHAR(50)
)
BEGIN
    DELETE FROM questions_cost WHERE cost_id = id;

END $$

CREATE PROCEDURE `delete_organization`  (
    IN id VARCHAR(50)
)
BEGIN
    DELETE FROM organizations WHERE organization_id = id;

END $$

CREATE PROCEDURE `delete_condition`  (
    IN id VARCHAR(50)
)
BEGIN
    DELETE FROM conditions WHERE condition_id = id;

END $$

DELIMITER ; 

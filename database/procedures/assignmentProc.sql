USE `labby`;

DROP procedure IF EXISTS `save_assignment`;
DROP procedure IF EXISTS `load_assignees`;
DROP procedure IF EXISTS `load_all_assignees`;

DELIMITER $$

CREATE PROCEDURE `save_assignment` (
    IN `_assignment_id` VARCHAR(50),
    IN `_fk_user_id` VARCHAR(50),
    IN `_task_id` VARCHAR(50)
) BEGIN 
INSERT INTO `assignment` (
    `assignment_id`,
    `fk_user_id`,
    `task_id`
)
VALUES
   (
    `_assignment_id`,
    `_fk_user_id`,
    `_task_id`
   );
END $$

CREATE PROCEDURE `load_assignees` (
    IN `_task_id` VARCHAR(50)
)

BEGIN
    SELECT * FROM assignment 
    LEFT JOIN users ON assignment.fk_user_id = users.user_id
    WHERE assignment.task_id = `_task_id`;
END $$

CREATE PROCEDURE `load_all_assignees` ()

BEGIN
    SELECT * FROM assignment 
    LEFT JOIN users ON assignment.fk_user_id = users.user_id;
END $$
  
DELIMITER ;
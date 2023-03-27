USE `labby`;
 
DROP procedure IF EXISTS `delete_task`;
DROP procedure IF EXISTS `delete_subtask`;

DELIMITER $$

CREATE PROCEDURE `delete_task`  (
    IN id INT(10)
)
BEGIN
    DELETE FROM tasks WHERE task_id = id;
END $$

CREATE PROCEDURE `delete_subtask`  (
    IN id INT(10)
)
BEGIN
    DELETE FROM subtasks WHERE subtask_id = id;
END $$

DELIMITER ;
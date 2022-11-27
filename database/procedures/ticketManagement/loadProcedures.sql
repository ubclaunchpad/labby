USE `labby`;

DROP procedure IF EXISTS `load_tasks`;
DROP procedure IF EXISTS `load_tasks_state`;
DROP procedure IF EXISTS `load_tasks_subtasks`;

DELIMITER $$

CREATE PROCEDURE `load_tasks` ()

BEGIN
    SELECT*FROM tasks;
  
END $$

CREATE PROCEDURE `load_tasks_state` (IN task_state VARCHAR(50))
BEGIN
SELECT *
    FROM
        tasks
        WHERE tasks.task_state = task_state;

END $$

CREATE PROCEDURE `load_tasks_subtasks` ()
BEGIN
SELECT tasks.*, subtasks.*
    FROM
        tasks

    LEFT JOIN subtasks
        ON tasks.task_id = subtasks.fk_task_id;

END $$
  
DELIMITER ;
USE `labby`;

DROP procedure IF EXISTS `load_tasks`;
DROP procedure IF EXISTS `load_tasks_state`;

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

  
DELIMITER ;
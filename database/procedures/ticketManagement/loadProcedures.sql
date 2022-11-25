USE `labby`;

DROP procedure IF EXISTS `load_tasks`;
DROP procedure IF EXISTS `load_tasks_state`;

DELIMITER $$

CREATE PROCEDURE `load_tasks` ()

BEGIN
    SELECT*FROM tasks;

        LEFT JOIN organizations
        ON organizations.organization_id = questions_cost.fk_organization_id
  
END $$

CREATE PROCEDURE 'load_tasks_state' (IN task_state VARCHAR(50))
BEGIN
SELECT task
    FROM
        tasks
        WHERE tasks.task_state = task_state;

END $$

  
DELIMITER ;
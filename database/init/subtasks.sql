USE `labby`;

DROP TABLE IF EXISTS `subtasks`;
DROP PROCEDURE IF EXISTS `createSubtasks`;

DELIMITER $$

CREATE PROCEDURE `createSubtasks` ()
BEGIN

CREATE TABLE `tasks_subtasks` (
	subtask_id VARCHAR(50) NOT NULL,
	subtask_title VARCHAR (100),
	subtask_state VARCHAR(50),
    fk_task_id VARCHAR(50) NOT NULL,
	PRIMARY KEY (`subtask_id`),
    FOREIGN KEY (fk_task_id) REFERENCES tasks(task_id) ON DELETE CASCADE  
);
END$$


DELIMITER ;
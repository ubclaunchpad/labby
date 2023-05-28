USE `labby`;

DROP TABLE IF EXISTS `subtasks`;
DROP PROCEDURE IF EXISTS `createSubtasks`;

DELIMITER $$

CREATE PROCEDURE `createSubtasks` ()
BEGIN

CREATE TABLE `subtasks` (
	subtask_id INT(10) NOT NULL AUTO_INCREMENT,
	subtask_uuid VARCHAR(50),
	subtask_title VARCHAR (100),
	subtask_description VARCHAR (250),
	subtask_state VARCHAR(50),
    fk_task_id INT(10) NOT NULL,
	subtask_created DATETIME,
	subtask_updated DATETIME,
	PRIMARY KEY (`subtask_id`),
    FOREIGN KEY (fk_task_id) REFERENCES tasks(task_id) ON DELETE CASCADE  
);
END$$


DELIMITER ;
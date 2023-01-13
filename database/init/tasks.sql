USE `labby`;

DROP TABLE IF EXISTS `tasks`;
DROP PROCEDURE IF EXISTS `createTasks`;


DELIMITER $$

CREATE PROCEDURE `createTasks` ()
BEGIN

CREATE TABLE `tasks` (
	task_id VARCHAR(50) NOT NULL,
	fk_form_id VARCHAR(50),
	task_title VARCHAR (100),
    task_description VARCHAR (250),
	task_state VARCHAR(50),
	PRIMARY KEY (`task_id`),
	FOREIGN KEY (`fk_form_id`) REFERENCES forms(`form_id`)
);
END$$


DELIMITER ;


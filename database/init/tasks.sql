USE `labby`;

DROP TABLE IF EXISTS `tasks`;
DROP PROCEDURE IF EXISTS `createTasks`;


DELIMITER $$

CREATE PROCEDURE `createTasks` ()
BEGIN

CREATE TABLE `tasks` (
	task_id INT(10) NOT NULL AUTO_INCREMENT,
	task_uuid VARCHAR(50),
	fk_survey_id VARCHAR(50),
	fk_form_id VARCHAR(50),
	fk_project_id VARCHAR(50),
	task_title VARCHAR (100),
    task_description VARCHAR (250),
	task_state VARCHAR(50),
	PRIMARY KEY (`task_id`),
	FOREIGN KEY (`fk_form_id`) REFERENCES forms(`form_id`) ON DELETE CASCADE,
	FOREIGN KEY (`fk_project_id`) REFERENCES projects(`project_id`) ON DELETE CASCADE,
	FOREIGN KEY (`fk_survey_id`) REFERENCES surveys(`survey_id`) ON DELETE CASCADE
);
END$$


DELIMITER ;


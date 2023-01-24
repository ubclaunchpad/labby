USE `labby`;

DROP TABLE IF EXISTS `projects`;
DROP PROCEDURE IF EXISTS `createProjects`;

DELIMITER $$

CREATE PROCEDURE `createProjects` ()
BEGIN

CREATE TABLE `projects` (
	project_id VARCHAR(50) NOT NULL,
	project_name VARCHAR(50),
	project_description VARCHAR(255),
	PRIMARY KEY (`project_id`)
); 

END$$

DELIMITER ;


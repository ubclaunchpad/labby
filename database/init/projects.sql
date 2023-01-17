USE `labby`;

DROP TABLE IF EXISTS `projects`;
DROP PROCEDURE IF EXISTS `createProjects`;

DELIMITER $$

CREATE PROCEDURE `createProjects` ()
BEGIN

CREATE TABLE `projects` (
	project_uuid VARCHAR(50) NOT NULL,
	project_id VARCHAR(50),
	project_name VARCHAR(50),
	fk_cost_center_id VARCHAR(50),
	PRIMARY KEY (`project_uuid`),
	FOREIGN KEY (fk_cost_center_id) REFERENCES cost_centers(cost_center_id) ON DELETE CASCADE
); 

END$$

DELIMITER ;


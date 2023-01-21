USE `labby`;

DROP TABLE IF EXISTS `project_assignments`;
DROP PROCEDURE IF EXISTS `createProjectAssignments`;

DELIMITER $$

CREATE PROCEDURE `createProjectAssignments` ()
BEGIN

CREATE TABLE `project_assignments` (
	assignment_id VARCHAR(50) NOT NULL,
	fk_project_id VARCHAR(50),
	fk_organization_id VARCHAR(50),
	PRIMARY KEY (`assignment_id`),
	FOREIGN KEY (fk_project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
	FOREIGN KEY (fk_organization_id) REFERENCES organizations(organization_id) ON DELETE CASCADE
); 

END$$

DELIMITER ;


USE `labby`;

DROP TABLE IF EXISTS `costcenter_assignments`;
DROP PROCEDURE IF EXISTS `createCostCenterAssignments`;

DELIMITER $$

CREATE PROCEDURE `createCostCenterAssignments` ()
BEGIN

CREATE TABLE `costcenter_assignments` (
	assignment_id VARCHAR(50) NOT NULL,
	fk_cost_center_id VARCHAR(50),
	PRIMARY KEY (`assignment_id`),
	FOREIGN KEY (fk_cost_center_id) REFERENCES cost_centers(cost_center_id) ON DELETE CASCADE
); 

END$$

DELIMITER ;


USE `labby`;

DROP TABLE IF EXISTS `cost_centers`;
DROP PROCEDURE IF EXISTS `createCostCenters`;

DELIMITER $$

CREATE PROCEDURE `createCostCenters` ()
BEGIN

CREATE TABLE `cost_centers` (
	cost_center_id VARCHAR(50) NOT NULL,
	cost_center_name VARCHAR(50),
	cost_center_contact VARCHAR(255),
	cost_center_email VARCHAR(255),
	cost_center_address VARCHAR(255),
	cost_center_type VARCHAR(50),
	cost_center_unit VARCHAR(50),
	PRIMARY KEY (`cost_center_id`)
); 

END$$

DELIMITER ;


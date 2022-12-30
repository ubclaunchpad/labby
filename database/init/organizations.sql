USE `labby`;

DROP TABLE IF EXISTS `organizations`;
DROP PROCEDURE IF EXISTS `createOrganizations`;

DELIMITER $$

CREATE PROCEDURE `createOrganizations` ()
BEGIN

CREATE TABLE `organizations` (
	organization_id VARCHAR(50) NOT NULL,
	organization_name VARCHAR(50),
	organization_contact VARCHAR(255),
	organization_email VARCHAR(255),
	organization_address VARCHAR(255),
	organization_type VARCHAR(50),
	internal_department VARCHAR(50),
	PRIMARY KEY (`organization_id`)
); 

END$$

DELIMITER ;


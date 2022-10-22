USE `labby`;

DROP TABLE IF EXISTS `organizations`;
DROP PROCEDURE IF EXISTS `createOrganizations`;

DELIMITER $$
USE `labby`$$

CREATE PROCEDURE `createOrganizations` ()
BEGIN

CREATE TABLE `organizations` (
	organization_id VARCHAR(50) NOT NULL,
	organization_name VARCHAR(50),
	PRIMARY KEY (`organization_id`)
);

END$$

DELIMITER ;
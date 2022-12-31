USE `labby`;

DROP TABLE IF EXISTS `users`;
DROP PROCEDURE IF EXISTS `createUsers`;

DELIMITER $$

CREATE PROCEDURE `createUsers` ()
BEGIN
CREATE TABLE `users` (
	user_id VARCHAR(50) NOT NULL,
	fk_organization_id VARCHAR (50),
	username VARCHAR(255),
	email VARCHAR(255),
	employee BOOLEAN,
	PRIMARY KEY (`user_id`),
	FOREIGN KEY (fk_organization_id) REFERENCES organizations(organization_id)
);
END$$

DELIMITER ;




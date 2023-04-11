USE `labby`;

DROP TABLE IF EXISTS `users`;
DROP PROCEDURE IF EXISTS `createUsers`;

DELIMITER $$

CREATE PROCEDURE `createUsers` ()
BEGIN
CREATE TABLE `users` (
	user_id VARCHAR(50) NOT NULL,
	fk_organization_id VARCHAR(50),
	username VARCHAR(255),
	last_name VARCHAR(50),
	first_name VARCHAR(50),
	email VARCHAR(255),
	employee BOOLEAN,
	is_approved BOOLEAN,
	salt VARCHAR(255),
	hashed_password VARCHAR(255),
	PRIMARY KEY (`user_id`),
	FOREIGN KEY (fk_organization_id) REFERENCES organizations(organization_id)
);
END$$

DELIMITER ;




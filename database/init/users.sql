USE `labby`;

DROP TABLE IF EXISTS `users`;
DROP PROCEDURE IF EXISTS `createUsers`;
DROP PROCEDURE IF EXISTS `addUser`;
DROP PROCEDURE IF EXIStS `deleteUser`;

DELIMITER $$

CREATE PROCEDURE `createUsers` ()
BEGIN

CREATE TABLE `users` (
	user_id VARCHAR(50) NOT NULL,
	fk_organization_id VARCHAR (50),
	username VARCHAR(50),
	PRIMARY KEY (`user_id`),
	FOREIGN KEY (fk_organization_id) REFERENCES organizations(organization_id)
);
END$$


CREATE PROCEDURE `addUser` (
	IN `_user_id` VARCHAR(50),
	IN `_fk_organization_id` VARCHAR(50),
	IN `_username` VARCHAR(50)
)
BEGIN REPLACE INTO `users` (
	`user_id`,
	`fk_organization_id`,
	`username`
)
VALUES (
	`_user_id`,
	`_fk_organization_id`,
	`_username`
);
END $$

CREATE PROCEDURE `deleteUser`  (
    IN id VARCHAR(50)
)
BEGIN
    DELETE FROM users WHERE user_id = id;
END $$


DELIMITER ;




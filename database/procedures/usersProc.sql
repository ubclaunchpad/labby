USE `labby`;

DROP PROCEDURE IF EXISTS `addUser`;
DROP PROCEDURE IF EXISTS `deleteUser`;
DROP PROCEDURE IF EXISTS `loadUser`;

DELIMITER $$

CREATE PROCEDURE `addUser` (
	IN `_user_id` VARCHAR(50),
	IN `_fk_organization_id` VARCHAR(50),
	IN `_username` VARCHAR(255),
	IN `_email` VARCHAR(255),
	IN `_employee` BOOLEAN
)
BEGIN 
INSERT INTO `users` (
	`user_id`,
	`fk_organization_id`,
	`username`,
	`email`,
	`employee`
)
VALUES (
	`_user_id`,
	`_fk_organization_id`,
	`_username`,
	`_email`,
	`_employee`
) ON DUPLICATE KEY UPDATE
    users.user_id=_user_id,
    users.fk_organization_id=_fk_organization_id,
    users.username=_username,
    users.email=_email,
    users.employee=_employee;
END $$

CREATE PROCEDURE `deleteUser`  (
    IN id VARCHAR(50)
)
BEGIN
    DELETE FROM users WHERE user_id = id;
END $$

CREATE PROCEDURE `loadUser`  ()
BEGIN
    SELECT * FROM users;
END $$

DELIMITER ;
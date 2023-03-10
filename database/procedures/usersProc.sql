USE `labby`;

DROP PROCEDURE IF EXISTS `addUser`;
DROP PROCEDURE IF EXISTS `deleteUser`;
DROP PROCEDURE IF EXISTS `loadUser`;
DROP PROCEDURE IF EXISTS `loadEmployee`;
DROP PROCEDURE IF EXISTS `loadSingleUser`;
DROP PROCEDURE IF EXISTS `loadPendingUsers`;

DELIMITER $$

CREATE PROCEDURE `addUser` (
	IN `_user_id` VARCHAR(50),
	IN `_fk_organization_id` VARCHAR(50),
	IN `_username` VARCHAR(255),
	IN `_email` VARCHAR(255),
	IN `_employee` BOOLEAN,
	IN `_salt` VARCHAR(255),
	IN `_hashed_password` VARCHAR(255)
)
BEGIN 
INSERT INTO `users` (
	`user_id`,
	`fk_organization_id`,
	`username`,
	`email`,
	`employee`,
	`salt`,
	`hashed_password`
)
VALUES (
	`_user_id`,
	`_fk_organization_id`,
	`_username`,
	`_email`,
	`_employee`,
	`_salt`,
	`_hashed_password`
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

CREATE PROCEDURE `approveUser` (
	IN id VARCHAR(50),
)

BEGIN
	UPDATE FROM users WHERE user_id = id 
	SET approved = 1;
END $$


CREATE PROCEDURE `loadUser`  ()
BEGIN
    SELECT * FROM users
	WHERE approved = 1;
END $$

CREATE PROCEDURE `loadPendingUsers`  ()
BEGIN
    SELECT * FROM users
	WHERE approved = 0;
END $$

CREATE PROCEDURE `loadEmployee`  ()
BEGIN
    SELECT * FROM users WHERE employee = 1;
END $$

CREATE PROCEDURE `loadSingleUser`  (
	IN `_email` VARCHAR(255)
)
BEGIN
	SELECT * FROM users WHERE email = _email;
END $$

DELIMITER ;
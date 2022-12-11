USE `labby`;

DROP TABLE IF EXISTS `forms`;
DROP PROCEDURE IF EXISTS `createForms`;

DELIMITER $$

CREATE PROCEDURE `createForms` ()
BEGIN

CREATE TABLE `forms` (
	form_id VARCHAR(50) NOT NULL,
	form_name VARCHAR (255),
	date_created DATETIME,
	PRIMARY KEY (`form_id`)
);
END$$

DELIMITER ;






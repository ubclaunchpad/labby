USE `labby`;

DROP TABLE IF EXISTS `forms`;
DROP PROCEDURE IF EXISTS `createForms`;
DROP PROCEDURE IF EXISTS `publish_form`;

DELIMITER $$

CREATE PROCEDURE `createForms` ()
BEGIN

CREATE TABLE `forms` (
	form_id VARCHAR(50) NOT NULL,
	form_name VARCHAR (255),
	date_created DATETIME,
	published BOOLEAN,
	PRIMARY KEY (`form_id`)
);
END$$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE `publish_form` (IN `_form_id` VARCHAR(50))

BEGIN
    UPDATE forms
	SET published = true
    WHERE forms.form_id = `_form_id`;
  
END $$

DELIMITER ;


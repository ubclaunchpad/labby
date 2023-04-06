USE `labby`;

DROP TABLE IF EXISTS `label`;
DROP PROCEDURE IF EXISTS `createLabel`;

DELIMITER $$

CREATE PROCEDURE `createLabel` ()
BEGIN
CREATE TABLE `label` (
	label_name VARCHAR(50) NOT NULL,
	label_id VARCHAR(50) NOT NULL,
	PRIMARY KEY (`label_id`)
);
END$$

DELIMITER ;




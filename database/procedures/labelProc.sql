USE `labby`;

DROP PROCEDURE IF EXISTS `addLabel`;
DROP PROCEDURE IF EXISTS `deleteLabel`;

DELIMITER $$

CREATE PROCEDURE `addLabel` (
	IN `_label_name` VARCHAR(50)
)
BEGIN 
INSERT INTO `label` (
	`label_name`
)
VALUES (
	`_label_name`
)
END $$

CREATE PROCEDURE `deleteLabel`  (
    IN `_label_name` VARCHAR(50)
)

BEGIN
    DELETE FROM label WHERE label_name=label_name;
END $$

DELIMITER ;
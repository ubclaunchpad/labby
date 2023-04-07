USE `labby`;

DROP PROCEDURE IF EXISTS `loadLabel`;
DROP PROCEDURE IF EXISTS `saveLabel`;
DROP PROCEDURE IF EXISTS `deleteLabel`;

DELIMITER $$

CREATE PROCEDURE `loadLabel`  ()
BEGIN
    SELECT * FROM label
END $$

CREATE PROCEDURE `saveLabel` (
	IN `_label_name` VARCHAR(50),
	IN `_label_id` VARCHAR(50)
)
BEGIN 
INSERT INTO `label` (
	`label_name`,
	`label_id`
)
VALUES (
	`_label_name`,
	`label_id`
) ON DUPLICATE KEY UPDATE
    label.label_name=_label_name;
END $$

CREATE PROCEDURE `deleteLabel`  (
    IN `_label_id` VARCHAR(50)
)
BEGIN
    DELETE FROM label WHERE label_id=_label_id;
END $$

DELIMITER ;
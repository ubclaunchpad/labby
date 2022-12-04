USE `labby`;

DROP procedure IF EXISTS `save_billable`;
DROP procedure IF EXISTS `load_billable`;

DELIMITER $$

CREATE PROCEDURE `save_billable` (
    IN `_billable_id` VARCHAR(50),
    IN `_fk_sow_id` VARCHAR(100),
    IN `_name` VARCHAR(50),
    IN `_quantity` DOUBLE,
    IN `_cost` DOUBLE,
    IN `_createdDate` DATETIME,
    IN `_completedTime` DATETIME,
    IN `_billed` BOOLEAN,
    IN `_billedTime` DATETIME
) BEGIN INSERT INTO `billable` (
    `billable_id`,
    `fk_sow_id`,
    `name`,
    `quantity`,
    `cost`,
    `createdDate`,
    `completedTime`,
    `billed`,
    `billedTime`
)
VALUES
   (
    `_billable_id`,
    `_fk_sow_id`,
    `_name`,
    `_quantity`,
    `_cost`,
    `_createdDate`,
    `_completedTime`,
    `_billed`,
    `_billedTime`
   );
  
END $$

CREATE PROCEDURE `load_billable` ()

BEGIN
    SELECT * FROM billable;
END $$
  
DELIMITER ;
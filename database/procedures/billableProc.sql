USE `labby`;

DROP procedure IF EXISTS `save_billable`;
DROP procedure IF EXISTS `load_billable`;
DROP procedure IF EXISTS `delete_billable`;

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
    IN `_billedTime` DATETIME,
    IN `_created_by` VARCHAR(50)
) BEGIN 
INSERT INTO `billable` (
    `billable_id`,
    `fk_sow_id`,
    `name`,
    `quantity`,
    `cost`,
    `createdDate`,
    `completedTime`,
    `billed`,
    `billedTime`,
    `created_by`
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
    `_billedTime`,
    `_created_by`
   ) ON DUPLICATE KEY UPDATE
    billable.billable_id=_billable_id,
    billable.fk_sow_id=_fk_sow_id,
    billable.name=_username,
    billable.quantity=_quantity,
    billable.cost=_cost,
    billable.createdDate=_createdDate,
    billable.completedTime=_completedTime,
    billable.billed=_billed,
    billable.billedTime=_billedTime,
    billable.created_by=_created_by;
  
END $$

CREATE PROCEDURE `load_billable` ()

BEGIN
    SELECT * FROM billable;
END $$

CREATE PROCEDURE `delete_billable`  (
    IN id VARCHAR(50)
)
BEGIN
    DELETE FROM billable WHERE billable_id = id;
END $$
  
DELIMITER ;
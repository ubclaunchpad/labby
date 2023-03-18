USE `labby`;

DROP procedure IF EXISTS `save_billable`;
DROP procedure IF EXISTS `load_billable`;
DROP procedure IF EXISTS `load_billable_by_service`;
DROP procedure IF EXISTS `load_billable_by_costcenter_id`;
DROP procedure IF EXISTS `load_billable_by_project_id`;
DROP procedure IF EXISTS `load_billable_by_organization_id`;
DROP procedure IF EXISTS `load_billable_by_user_id`;
DROP procedure IF EXISTS `load_billable_by_date`;
DROP procedure IF EXISTS `load_billable_by_sow`;
DROP procedure IF EXISTS `delete_billable`;

DELIMITER $$

CREATE PROCEDURE `save_billable` (
    IN `_billable_id` VARCHAR(50),
    IN `_fk_sow_id` VARCHAR(50),
    IN `_fk_project_id` VARCHAR(50),
    IN `_name` VARCHAR(50),
    IN `_quantity` DOUBLE,
    IN `_cost` DOUBLE,
    IN `_comment` VARCHAR(255),
    IN `_createdDate` DATETIME,
    IN `_completedTime` DATETIME,
    IN `_billed` BOOLEAN,
    IN `_billedTime` DATETIME,
    IN `_created_by` VARCHAR(50)
) BEGIN 
INSERT INTO `billable` (
    `billable_id`,
    `fk_sow_id`,
    `fk_project_id`,
    `name`,
    `quantity`,
    `cost`,
    `comment`,
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
    `_fk_project_id`,
    `_name`,
    `_quantity`,
    `_cost`,
    `_comment`,
    `_createdDate`,
    `_completedTime`,
    `_billed`,
    `_billedTime`,
    `_created_by`
   ) ON DUPLICATE KEY UPDATE
    billable.billable_id=_billable_id,
    billable.fk_sow_id=_fk_sow_id,
    billable.fk_project_id=_fk_project_id,
    billable.name=_name,
    billable.quantity=_quantity,
    billable.cost=_cost,
    billable.comment=_comment,
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

CREATE PROCEDURE `load_billable_by_service` (
    IN `_service_name` VARCHAR(50)
)

BEGIN
    SELECT * FROM billable WHERE name = _service_name;
END $$

CREATE PROCEDURE `load_billable_by_costcenter_id` (
    IN `_costcenter_id` VARCHAR(50)
)

BEGIN
    SELECT * FROM billable
    LEFT JOIN costcenter_assignments ca on ca.fk_project_id = billable.fk_project_id
    WHERE ca.fk_cost_center_id = _costcenter_id;
END $$

CREATE PROCEDURE `load_billable_by_project_id` (
    IN `_project_id` VARCHAR(50)
)

BEGIN
    SELECT * FROM billable where fk_project_id = _project_id;
END $$

CREATE PROCEDURE `load_billable_by_organization_id` (
    IN `_organization_id` VARCHAR(50)
)

BEGIN
    SELECT * FROM billable
    LEFT JOIN project_assignments pa on pa.fk_project_id = billable.fk_project_id
    WHERE pa.fk_organization_id = _organization_id;
END $$

CREATE PROCEDURE `load_billable_by_user_id` (
    IN `_user_id` VARCHAR(50)
)

BEGIN
    SELECT * FROM billable where created_by = _user_id;
END $$

CREATE PROCEDURE `load_billable_by_date` (
    IN `_start_date` DATETIME,
    IN `_end_date` DATETIME
)

BEGIN
    SELECT * FROM billable where createdDate BETWEEN _start_date AND _end_date;
END $$

CREATE PROCEDURE `load_billable_by_sow` (
    IN `_sow_id` VARCHAR(100)
)

BEGIN
    SELECT * FROM billable WHERE fk_sow_id = _sow_id;
END $$

CREATE PROCEDURE `delete_billable`  (
    IN id VARCHAR(50)
)
BEGIN
    DELETE FROM billable WHERE billable_id = id;
END $$
  
DELIMITER ;
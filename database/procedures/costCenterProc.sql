USE `labby`;

DROP procedure IF EXISTS `save_cost_center`;
DROP procedure IF EXISTS `load_cost_center`;
DROP procedure IF EXISTS `delete_cost_center`;

DELIMITER $$

CREATE PROCEDURE `save_cost_center` (
    IN `_cost_center_id` VARCHAR(50),
    IN `_cost_center_name` VARCHAR(50),
    IN `_cost_center_contact` VARCHAR(255),
    IN `_cost_center_email` VARCHAR(255),
    IN `_cost_center_address` VARCHAR(255),
    IN `_cost_center_type` VARCHAR(50),
    IN `_cost_center_unit` VARCHAR(50)
) BEGIN 
INSERT INTO `cost_centers` (
    `cost_center_id`,
    `cost_center_name`,
    `cost_center_contact`,
    `cost_center_email`,
    `cost_center_address`,
    `cost_center_type`,
    `cost_center_unit`
)
VALUES
   (
    `_cost_center_id`,
    `_cost_center_name`,
    `_cost_center_contact`,
    `_cost_center_email`,
    `_cost_center_address`,
    `_cost_center_type`,
    `_cost_center_unit`
   ) ON DUPLICATE KEY UPDATE
    cost_centers.cost_center_id=_cost_center_id,
    cost_centers.cost_center_name=_cost_center_name,
    cost_centers.cost_center_contact=_cost_center_contact,
    cost_centers.cost_center_email=_cost_center_email,
    cost_centers.cost_center_address=_cost_center_address,
    cost_centers.cost_center_type=_cost_center_type,
    cost_centers.cost_center_unit=_cost_center_unit;
END $$

CREATE PROCEDURE `load_cost_center` ()

BEGIN
    SELECT * FROM cost_centers;
END $$

CREATE PROCEDURE `delete_cost_center`  (
    IN id VARCHAR(50)
)
BEGIN
    DELETE FROM cost_centers WHERE cost_center_id = id;
END $$
  
DELIMITER ;
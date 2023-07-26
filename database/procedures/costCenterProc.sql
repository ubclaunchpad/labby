USE `labby`;

DROP procedure IF EXISTS `save_cost_center`;
DROP procedure IF EXISTS `load_cost_center`;
DROP procedure IF EXISTS `delete_cost_center`;

DELIMITER $$

CREATE PROCEDURE `save_cost_center` (
    IN `_cost_center_id` VARCHAR(50),
    IN `_cost_center_name` VARCHAR(50),
    IN `_cost_center_client_name` VARCHAR(255),
    IN `_cost_center_investigator` VARCHAR(255),
    IN `_cost_center_contact` VARCHAR(255),
    IN `_cost_center_email` VARCHAR(255),
    IN `_cost_center_address` VARCHAR(255),
    IN `_cost_center_type` VARCHAR(50)
) BEGIN 
INSERT INTO `cost_centers` (
    `cost_center_id`,
    `cost_center_name`,
    `cost_center_client_name`,
    `cost_center_investigator`,
    `cost_center_contact`,
    `cost_center_email`,
    `cost_center_address`,
    `cost_center_type`
)
VALUES
   (
    `_cost_center_id`,
    `_cost_center_name`,
    `_cost_center_client_name`,
    `_cost_center_investigator`,
    `_cost_center_contact`,
    `_cost_center_email`,
    `_cost_center_address`,
    `_cost_center_type`
   ) ON DUPLICATE KEY UPDATE
    cost_centers.cost_center_id=_cost_center_id,
    cost_centers.cost_center_name=_cost_center_name,
    cost_centers.cost_center_client_name=_cost_center_client_name,
    cost_centers.cost_center_investigator=_cost_center_investigator,
    cost_centers.cost_center_contact=_cost_center_contact,
    cost_centers.cost_center_email=_cost_center_email,
    cost_centers.cost_center_address=_cost_center_address,
    cost_centers.cost_center_type=_cost_center_type;
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
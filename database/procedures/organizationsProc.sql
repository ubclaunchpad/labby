USE `labby`;

DROP procedure IF EXISTS `save_organization`;
DROP procedure IF EXISTS `load_organization`;
DROP procedure IF EXISTS `delete_organization`;

DELIMITER $$

CREATE PROCEDURE `save_organization` (
    IN `_organization_id` VARCHAR(50),
    IN `_organization_name` VARCHAR(50),
    IN `_organization_contact` VARCHAR(255),
    IN `_organization_email` VARCHAR(255),
    IN `_organization_address` VARCHAR(255),
    IN `_organization_type` VARCHAR(50),
    IN `_internal_department` VARCHAR(50)
) BEGIN 
INSERT INTO `organizations` (
    `organization_id`,
    `organization_name`,
    `organization_contact`,
    `organization_email`,
    `organization_address`,
    `organization_type`,
    `internal_department`
) VALUES (
    _organization_id,
    _organization_name,
    _organization_contact,
    _organization_email,
    _organization_address,
    _organization_type,
    _internal_department
) ON DUPLICATE KEY UPDATE
    organizations.organization_id=_organization_id,
    organizations.organization_name=_organization_name,
    organizations.organization_contact=_organization_contact,
    organizations.organization_email=_organization_email,
    organizations.organization_address=_organization_address,
    organizations.organization_type=_organization_type,
    organizations.internal_department=_internal_department;
END $$

CREATE PROCEDURE `load_organization` () 
BEGIN
SELECT * FROM organizations;
END $$

CREATE PROCEDURE `delete_organization` (
    IN `_organization_id` VARCHAR(50)
) BEGIN
DELETE FROM organizations WHERE organization_id=_organization_id;
END $$
  
DELIMITER ;
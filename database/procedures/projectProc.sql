USE `labby`;

DROP procedure IF EXISTS `save_project`;
DROP procedure IF EXISTS `load_project`;
DROP procedure IF EXISTS `delete_project`;

DELIMITER $$

CREATE PROCEDURE `save_project` (
    IN `_project_id` VARCHAR(50),
    IN `_project_name` VARCHAR(50),
    IN `_project_description` VARCHAR(255)
) BEGIN 
INSERT INTO `projects` (
    `project_id`,
    `project_name`,
    `project_description`
)
VALUES
   (
    `_project_id`,
    `_project_name`,
    `_project_description`
   ) ON DUPLICATE KEY UPDATE
    projects.project_id=_project_id,
    projects.project_name=_project_name,
    projects.project_description=_project_description;
  
END $$

CREATE PROCEDURE `load_project` ()

BEGIN
    SELECT * FROM projects;
END $$

CREATE PROCEDURE `delete_project`  (
    IN id VARCHAR(50)
)
BEGIN
    DELETE FROM projects WHERE project_id = id;
END $$
  
DELIMITER ;
USE `labby`;

DROP procedure IF EXISTS `save_assignment`;
DROP procedure IF EXISTS `load_assignees`;
DROP procedure IF EXISTS `load_all_assignees`;
DROP procedure IF EXISTS `delete_assignment`;

DROP procedure IF EXISTS `save_organization_projects`;
DROP procedure IF EXISTS `load_organization_projects`;
DROP procedure IF EXISTS `delete_organization_projects`;

DROP procedure IF EXISTS `save_project_cost_centers`;
DROP procedure IF EXISTS `load_project_cost_centers`;
DROP procedure IF EXISTS `delete_project_cost_centers`;

DELIMITER $$

CREATE PROCEDURE `save_assignment` (
    IN `_assignment_id` VARCHAR(50),
    IN `_fk_user_id` VARCHAR(50),
    IN `_task_id` INT(10)
) BEGIN 
INSERT INTO `assignment` (
    `assignment_id`,
    `fk_user_id`,
    `task_id`
)
VALUES
   (
    `_assignment_id`,
    `_fk_user_id`,
    `_task_id`
   ) ON DUPLICATE KEY UPDATE
    assignment.fk_user_id=_fk_user_id,
    assignment.task_id=_task_id;
END $$

CREATE PROCEDURE `delete_assignment` (
    IN `_assignment_id` VARCHAR(50)
) BEGIN
DELETE FROM assignment WHERE assignment_id=_assignment_id;
END $$

CREATE PROCEDURE `load_assignees` (
    IN `_task_id` INT(10)
)

BEGIN
    SELECT * FROM assignment 
    LEFT JOIN users ON assignment.fk_user_id = users.user_id
    WHERE assignment.task_id = `_task_id`;
END $$

CREATE PROCEDURE `load_all_assignees` ()

BEGIN
    SELECT * FROM assignment 
    LEFT JOIN users ON assignment.fk_user_id = users.user_id;
END $$

CREATE PROCEDURE `load_organization_projects` ()

BEGIN 
    SELECT * FROM project_assignments
    LEFT JOIN projects ON project_assignments.fk_project_id = projects.project_id;
END $$

CREATE PROCEDURE `save_organization_projects` (
    IN `_assignment_id` VARCHAR(50),
    IN `_fk_project_id` VARCHAR(50),
    IN `_fk_organization_id` VARCHAR(50)
) BEGIN
INSERT INTO `project_assignments` (
    `assignment_id`,
    `fk_project_id`,
    `fk_organization_id`
)
VALUES
   (
    `_assignment_id`,
    `_fk_project_id`,
    `_fk_organization_id`
   ) ON DUPLICATE KEY UPDATE
    project_assignments.fk_project_id=_fk_project_id,
    project_assignments.fk_organization_id=_fk_organization_id;
END $$

CREATE PROCEDURE `delete_organization_projects` (
    IN `organization_id` VARCHAR(50)
) BEGIN
DELETE FROM project_assignments WHERE fk_organization_id=organization_id;
END $$


CREATE PROCEDURE `load_project_cost_centers` ()
BEGIN 
    SELECT * FROM costcenter_assignments
    LEFT JOIN cost_centers ON costcenter_assignments.fk_cost_center_id = cost_centers.cost_center_id;
END $$

CREATE PROCEDURE `save_project_cost_centers` (
    IN `_assignment_id` VARCHAR(50),
    IN `_fk_cost_center_id` VARCHAR(50),
    IN `_fk_project_id` VARCHAR(50)
) BEGIN
INSERT INTO `costcenter_assignments` (
    `assignment_id`,
    `fk_cost_center_id`,
    `fk_project_id`
)
VALUES
   (
    `_assignment_id`,
    `_fk_cost_center_id`,
    `_fk_project_id`
   ) ON DUPLICATE KEY UPDATE
    costcenter_assignments.fk_cost_center_id=_fk_cost_center_id,
    costcenter_assignments.fk_project_id=_fk_project_id;
END $$

CREATE PROCEDURE `delete_project_cost_centers` (
    IN `project_id` VARCHAR(50)
) BEGIN
DELETE FROM costcenter_assignments WHERE fk_project_id=project_id;
END $$
  
DELIMITER ;
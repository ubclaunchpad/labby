USE `labby`;

DROP TABLE IF EXISTS `billable`;
DROP PROCEDURE IF EXISTS `createBillable`;

DELIMITER $$

CREATE PROCEDURE `createBillable` ()
BEGIN

CREATE TABLE `billable` (
  `billable_id` VARCHAR(50) NOT NULL,
  `task_uuid` VARCHAR(50) NOT NULL,
  `fk_project_id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(50),
  `quantity` DOUBLE,
  `cost` DOUBLE,
  `comment` VARCHAR(255),
  `createdDate` DATETIME,
  `completedTime` DATETIME,
  `billed` BOOLEAN,
  `billedTime` DATETIME,
  `created_by` VARCHAR(50),
  PRIMARY KEY (`billable_id`),
  FOREIGN KEY (fk_project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
  FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE
);
END$$

DELIMITER ;
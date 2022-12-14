USE `labby`;

DROP TABLE IF EXISTS `billable`;
DROP PROCEDURE IF EXISTS `createBillable`;

DELIMITER $$

CREATE PROCEDURE `createBillable` ()
BEGIN

CREATE TABLE `billable` (
  `billable_id` VARCHAR(50) NOT NULL,
  `fk_sow_id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(50),
  `quantity` DOUBLE,
  `cost` DOUBLE,
  `createdDate` DATETIME,
  `completedTime` DATETIME,
  `billed` BOOLEAN,
  `billedTime` DATETIME,
  `created_by` VARCHAR(50),
  PRIMARY KEY (`billable_id`),
  FOREIGN KEY (fk_sow_id) REFERENCES tasks(task_id),
  FOREIGN KEY (created_by) REFERENCES users(user_id)
);

END$$

DELIMITER ;
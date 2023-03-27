USE `labby`;

DROP TABLE IF EXISTS `assignment`;
DROP PROCEDURE IF EXISTS `createAssignment`;

DELIMITER $$

CREATE PROCEDURE `createAssignment` ()
BEGIN

CREATE TABLE `assignment` (
  `assignment_id` VARCHAR(50) NOT NULL,
  `fk_user_id` VARCHAR(50) NOT NULL,
  `task_id` INT(10),
  PRIMARY KEY (`assignment_id`),
  FOREIGN KEY (fk_user_id) REFERENCES users(user_id)
);

END$$

DELIMITER ;
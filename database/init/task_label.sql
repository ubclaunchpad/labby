USE `labby`;

DROP TABLE IF EXISTS `task_label`;
DROP PROCEDURE IF EXISTS `createTask_Label`;

DELIMITER $$

CREATE PROCEDURE `createTask_Label` ()
BEGIN

CREATE TABLE `task_label` (
  `ticket_label_id` VARCHAR(50) NOT NULL,
  `fk_task_id` VARCHAR(50) NOT NULL,
  `fk_label_id` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`ticket_label_id`),
  FOREIGN KEY (fk_task_id) REFERENCES tasks(task_id)
  FOREIGN KEY (fk_label_id) REFERENCES label(label_id)
);

END$$

DELIMITER ;
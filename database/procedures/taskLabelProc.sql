USE `labby`;

DROP procedure IF EXISTS `add_task_label`;
DROP procedure IF EXISTS `delete_task_label`;
DROP procedure IF EXISTS `load_task_labels`;

DELIMITER $$

CREATE PROCEDURE `add_task_label` (
    IN `_task_label_id` VARCHAR(50),
    IN `_fk_task_id` VARCHAR(50),
    IN `_fK_label_name` VARCHAR(50)
) BEGIN 
INSERT INTO `task_label` (
    `task_label_id`,
    `fk_task_id`,
    `fK_label_name`
)
VALUES
   (
    `_task_label_id`,
    `_fk_task_id`,
    `_fK_label_name`
   ) 
END $$

CREATE PROCEDURE `delete_task_label` (
    IN `_task_label_id` VARCHAR(50)
) BEGIN
DELETE FROM task_label WHERE task_label_id=_task_label_id;
END $$

CREATE PROCEDURE `load_all_task_labels` (
    IN `_fk_task_id` VARCHAR(50)
)

BEGIN
    SELECT * FROM task_label 
    LEFT JOIN tasks ON task_label.fk_task_id = tasks.task_id
END $$

DELIMITER ;
USE `labby`;

DROP procedure IF EXISTS `save_task_label`;
DROP procedure IF EXISTS `delete_task_label`;
DROP procedure IF EXISTS `load_task_labels`;

DELIMITER $$

CREATE PROCEDURE `save_task_label` (
    IN `_task_label_id` VARCHAR(50),
    IN `_fk_task_id` VARCHAR(50),
    IN `_fk_label_id` VARCHAR(50)
) BEGIN 
INSERT INTO `task_label` (
    `task_label_id`,
    `fk_task_id`,
    `fk_label_id`
)
VALUES
   (
    `_task_label_id`,
    `_fk_task_id`,
    `_fk_label_id`
   ) ON DUPLICATE KEY UPDATE
    task_label.fk_task_id=_fk_task_id,
    task_label.fk_label_id=_fk_label_id;
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
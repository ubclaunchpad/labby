USE `labby`;

DROP procedure IF EXISTS `save_task`;
DROP procedure IF EXISTS `save_subtask`;

DELIMITER $$

CREATE PROCEDURE `save_task` (
   IN `_task_id` VARCHAR(50),
   IN `_task_title` VARCHAR(100),
   IN `_task_description` VARCHAR(250),
   IN `_task_state` VARCHAR(50)
 
) BEGIN INSERT INTO `tasks` (
   `task_id`,
   `task_title`,
   `task_description`,
   `task_state`
)
VALUES
   (
   `_task_id`,
   `_task_title`,
   `_task_description`,
   `_task_state`
   );
  
END $$


CREATE PROCEDURE `save_subtask` (
   IN `_subtask_id` VARCHAR(50),
   IN `_subtask_title` VARCHAR(100),
   IN `_subtask_state` VARCHAR(50),
   IN `_fk_task_id` VARCHAR(50)

 
) BEGIN INSERT INTO `subtasks` (
   `subtask_id`,
   `subtask_title`,
   `subtask_state`,
   `fk_task_id`
)
VALUES
   (
   `_subtask_id`,
   `_subtask_title`,
   `_subtask_state`,
   `_fk_task_id`
   );
  
END $$
  
DELIMITER ;
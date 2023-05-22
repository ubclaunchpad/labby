USE `labby`;

DROP procedure IF EXISTS `save_billable`;
DROP procedure IF EXISTS `bill_billable`;
DROP procedure IF EXISTS `load_billable`;
DROP procedure IF EXISTS `load_billable_with_filter`;
DROP procedure IF EXISTS `load_billable_by_sow`;
DROP procedure IF EXISTS `delete_billable`;

DELIMITER $$

CREATE PROCEDURE `save_billable` (
    IN `_billable_id` VARCHAR(50),
    IN `_task_uuid` VARCHAR(50),
    IN `_fk_project_id` VARCHAR(50),
    IN `_name` VARCHAR(50),
    IN `_quantity` DOUBLE,
    IN `_cost` DOUBLE,
    IN `_comment` VARCHAR(255),
    IN `_createdDate` DATETIME,
    IN `_completedTime` DATETIME,
    IN `_billed` BOOLEAN,
    IN `_billedTime` DATETIME,
    IN `_created_by` VARCHAR(50)
) BEGIN 
INSERT INTO `billable` (
    `billable_id`,
    `task_uuid`,
    `fk_project_id`,
    `name`,
    `quantity`,
    `cost`,
    `comment`,
    `createdDate`,
    `completedTime`,
    `billed`,
    `billedTime`,
    `created_by`
)
VALUES
   (
    `_billable_id`,
    `_task_uuid`,
    `_fk_project_id`,
    `_name`,
    `_quantity`,
    `_cost`,
    `_comment`,
    `_createdDate`,
    `_completedTime`,
    `_billed`,
    `_billedTime`,
    `_created_by`
   ) ON DUPLICATE KEY UPDATE
    billable.billable_id=_billable_id,
    billable.task_uuid=_task_uuid,
    billable.fk_project_id=_fk_project_id,
    billable.name=_name,
    billable.quantity=_quantity,
    billable.cost=_cost,
    billable.comment=_comment,
    billable.createdDate=_createdDate,
    billable.completedTime=_completedTime,
    billable.billed=_billed,
    billable.billedTime=_billedTime,
    billable.created_by=_created_by;
  
END $$

CREATE PROCEDURE `bill_billable` (
    IN `_billable_id` VARCHAR(50)
) BEGIN
UPDATE billable SET billed = 1, billedTime = NOW() WHERE billable_id = _billable_id;
END $$

CREATE PROCEDURE `load_billable` ()

BEGIN
    SELECT billable.*, t.task_id, st.fk_task_id FROM billable
    LEFT JOIN tasks t on t.task_uuid = billable.task_uuid
    LEFT JOIN subtasks st on st.subtask_uuid = billable.task_uuid
    WHERE billable.billed = 0;
END $$

CREATE PROCEDURE `load_billable_with_filter` (
    IN `_service_name` VARCHAR(50),
    IN `_costcenter_id` VARCHAR(50),
    IN `_project_id` VARCHAR(50),
    IN `_organization_id` VARCHAR(50),
    IN `_user_id` VARCHAR(50),
    IN `_start_date` DATETIME,
    IN `_end_date` DATETIME,
    IN `_archive` BOOLEAN,
    IN `_billed` BOOLEAN,
    IN `_ready_to_bill` BOOLEAN
)

BEGIN
    SELECT billable.*, t.task_id, st.fk_task_id, t.task_state FROM billable
    LEFT JOIN tasks t on t.task_uuid = billable.task_uuid
    LEFT JOIN subtasks st on st.subtask_uuid = billable.task_uuid
    LEFT JOIN costcenter_assignments ca on ca.fk_project_id = billable.fk_project_id
    LEFT JOIN project_assignments pa on pa.fk_project_id = billable.fk_project_id
    WHERE (name = _service_name OR _service_name IS NULL OR _service_name = '')
    AND (ca.fk_cost_center_id = _costcenter_id OR _costcenter_id IS NULL OR _costcenter_id = '')
    AND (billable.fk_project_id = _project_id OR _project_id IS NULL OR _project_id = '')
    AND (pa.fk_organization_id = _organization_id OR _organization_id IS NULL OR _organization_id = '')
    AND (created_by = _user_id OR _user_id IS NULL OR _user_id = '')
    AND ((createdDate BETWEEN _start_date AND _end_date) OR (_start_date IS NULL OR _end_date IS NULL))
    AND (((t.task_state != "archived" OR t.task_state IS NULL) and (st.subtask_state != "archived" OR st.subtask_state IS NULL) and (_archive IS NULL OR _archive = 0)) OR _archive = 1)
    AND (_billed OR ((_billed IS NULL OR _billed = 0) AND billable.billed = 0))
    AND (((t.task_state = "completed" OR st.subtask_state = "completed") AND _ready_to_bill = 1) OR _ready_to_bill = 0 OR _ready_to_bill IS NULL);

END $$

CREATE PROCEDURE `load_billable_by_sow` (
    IN `_task_uuid` VARCHAR(50)
)

BEGIN
    SELECT billable.*, t.task_id, st.fk_task_id FROM billable
    LEFT JOIN tasks t on t.task_uuid = billable.task_uuid
    LEFT JOIN subtasks st on st.subtask_uuid = billable.task_uuid
    WHERE billable.task_uuid = _task_uuid;
END $$

CREATE PROCEDURE `delete_billable`  (
    IN id VARCHAR(50)
)
BEGIN
    DELETE FROM billable WHERE billable_id = id;
END $$
  
DELIMITER ;
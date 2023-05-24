USE `labby`;

DROP PROCEDURE IF EXISTS `addDraft`;
DROP PROCEDURE IF EXISTS `getDraft`;
DROP PROCEDURE IF EXISTS `deleteDraft`;

DELIMITER $$

CREATE PROCEDURE `addDraft` (
	IN `_draft_id` VARCHAR(50),
	IN `_fk_user_id` VARCHAR(50),
	IN `_fk_form_id` VARCHAR (50),
	IN `_fk_question_id` VARCHAR (50),
	IN `_answer` TEXT
)
BEGIN REPLACE INTO `drafts` (
	`draft_id`,
	`fk_user_id`,
	`fk_form_id`,
	`fk_question_id`,
	`answer`
)
VALUES (
	`_draft_id`,
	`_fk_user_id`,
	`_fk_form_id`,
	`_fk_question_id`,
	`_answer`
);
END $$

CREATE PROCEDURE `getDraft` (
    IN `_fk_user_id` VARCHAR(50),
    IN `_fk_form_id` VARCHAR (50)
)
BEGIN
    SELECT drafts.*, questions.* FROM drafts
    LEFT JOIN questions ON drafts.fk_question_id = questions.question_id 
    WHERE drafts.fk_user_id = `_fk_user_id` AND drafts.fk_form_id = `_fk_form_id`;
END $$

CREATE PROCEDURE `deleteDraft`  (
    IN id VARCHAR(50)
)
BEGIN
    DELETE FROM drafts WHERE draft_id = id;
END $$

DELIMITER ;

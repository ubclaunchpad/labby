USE `labby`;

DROP TABLE IF EXISTS `drafts`;
DROP PROCEDURE IF EXISTS `createDrafts`;

DELIMITER $$

CREATE PROCEDURE `createDrafts` ()
BEGIN

CREATE TABLE `drafts` (
	draft_id VARCHAR(50) NOT NULL,
	fk_user_id VARCHAR(50),
    fk_form_id VARCHAR(50),
	fk_question_id VARCHAR (50),
	answer TEXT,

	PRIMARY KEY (`draft_id`),
	FOREIGN KEY (fk_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
	FOREIGN KEY (fk_question_id) REFERENCES questions(question_id) ON DELETE CASCADE,
    FOREIGN KEY (fk_form_id) REFERENCES forms(form_id) ON DELETE CASCADE
);
END$$

DELIMITER ;

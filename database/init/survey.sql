USE `labby`;

DROP TABLE IF EXISTS `surveys`;
DROP PROCEDURE IF EXISTS `createSurveys`;
DROP PROCEDURE IF EXISTS `addSurvey`;
DROP PROCEDURE IF EXIStS `deleteSurvey`;

DELIMITER $$

CREATE PROCEDURE `createSurveys` ()
BEGIN

CREATE TABLE `surveys` (
	survey_id VARCHAR(50) NOT NULL,
	fk_user_id VARCHAR (50),
	date_created DATETIME,
	PRIMARY KEY (`survey_id`),
	FOREIGN KEY (fk_user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
END$$



CREATE PROCEDURE `addSurvey` (
	IN `_survey_id` VARCHAR(50),
	IN `_fk_user_id` VARCHAR(50),
	IN `_date_created` DATETIME
)
BEGIN REPLACE INTO `surveys` (
	`survey_id`,
	`fk_user_id`,
	`date_created`
)
VALUES (
	`_survey_id`,
	`_fk_user_id`,
	`_date_created`
);
END $$

CREATE PROCEDURE `deleteSurvey`  (
    IN id VARCHAR(50)
)
BEGIN
    DELETE FROM surveys WHERE survey_id = id;
END $$


DELIMITER ;






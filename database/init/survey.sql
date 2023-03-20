USE `labby`;

DROP TABLE IF EXISTS `surveys`;

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

DELIMITER ;

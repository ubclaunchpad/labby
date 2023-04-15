USE `labby`;

DROP PROCEDURE IF EXISTS `createClickAnalytics`;

DELIMITER $$

CREATE PROCEDURE `createClickAnalytics` ()
BEGIN

CREATE TABLE `click_analytics` (
  `component` VARCHAR(50) NOT NULL,
  `click_count` INT
);

END$$

DELIMITER ;
USE `labby`;

DROP PROCEDURE IF EXISTS `createClickAnalytics`;
DROP PROCEDURE IF EXISTS `update_count`;
DROP PROCEDURE IF EXISTS `initialize_count`;

DELIMITER $$

CREATE PROCEDURE `createClickAnalytics` ()
BEGIN

CREATE TABLE `click_analytics` (
  `component` VARCHAR(50) NOT NULL,
  `click_count` INT
);

END$$

CREATE PROCEDURE `update_count`(IN component_name VARCHAR(50))
BEGIN
  UPDATE click_analytics
  SET click_count = click_count + 1
  WHERE component = component_name;
END$$


CREATE PROCEDURE `initialize_count`(IN component_name VARCHAR(50))
BEGIN
  INSERT INTO click_analytics (component, click_count)
  VALUES (component_name, 0)
  ON DUPLICATE KEY UPDATE click_count = 0;

END$$

DELIMITER ;

USE `labby`;

CALL initialize_count('billing_page');
CALL initialize_count('sow_chart');
CALL initialize_count('services_chart');
CALL initialize_count('projects_chart');
SELECT*from click_analytics
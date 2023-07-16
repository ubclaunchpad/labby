USE `labby`;

DROP PROCEDURE IF EXISTS `update_count`;
DROP PROCEDURE IF EXISTS `initialize_count`;
DROP PROCEDURE IF EXISTS `get_count`;

DELIMITER $$

CREATE PROCEDURE `update_count`(IN component_name VARCHAR(50))
BEGIN
  UPDATE click_analytics
  SET click_count = click_count + 1
  WHERE component = component_name;
END$$

CREATE PROCEDURE `get_count`(IN component_name VARCHAR(50))
BEGIN
  SELECT click_count
  FROM click_analytics
  WHERE component = component_name;
END$$


CREATE PROCEDURE `initialize_count`(IN component_name VARCHAR(50))
BEGIN
  INSERT INTO click_analytics (component, click_count)
  VALUES (component_name, 0)
  ON DUPLICATE KEY UPDATE click_count = 0;

END$$

DELIMITER ;
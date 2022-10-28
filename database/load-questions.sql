USE `labby.db`;
 
DROP procedure IF EXISTS `load_questions`;
 
 
DELIMITER $$
 
CREATE PROCEDURE `load_questions` ()

BEGIN
    SELECT question, question_type
    FROM
        questions

    ORDER BY 
        question;
  
END $$
 
DELIMITER ;


    -- A sample data set used to visualize joining tables
CALL save_question('0','question_one','type_one');
CALL save_question('1','question_two','type_two');

CALL save_answer('0','answer_one', 'type_one','0');
CALL save_answer('1','answer_two', 'type_one','0');
CALL save_answer('2','answer_three', 'type_one','0');
CALL save_answer('3','answer_four', 'type_one','0');
CALL save_answer('4','answer_five', 'type_two','1');
CALL save_answer('5','answer_six', 'type_two','1');

CALL save_cost('0',100,'0');
CALL save_cost('1',10,'1');


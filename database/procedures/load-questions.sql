USE `labby.db`;
 
DROP procedure IF EXISTS `load_questions`;

DROP procedure IF EXISTS `load_questions_answers`;

DROP procedure IF EXISTS `load_conditions`;
 
 
DELIMITER $$
 
CREATE PROCEDURE `load_questions` ()

BEGIN
    SELECT questions.*, questions_answer.answer_id, questions_answer.fk_question_id, questions_answer.answer, questions_cost.*
    FROM
        questions
    
    LEFT JOIN questions_answer
        ON questions.question_id = questions_answer.fk_question_id

    LEFT JOIN questions_cost
        ON questions_answer.answer_id = questions_cost.fk_answer_id

    ORDER BY 
        position_index;
  
END $$

CREATE PROCEDURE `load_questions_answers` ()

BEGIN
    SELECT question, questions.question_type, answer
    FROM
        questions

    INNER JOIN questions_answer
        ON questions.question_id = questions_answer.fk_question_id
    
    ORDER BY 
        question;
  
END $$

CREATE PROCEDURE `load_conditions` ()

BEGIN
    SELECT*FROM conditions;
  
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



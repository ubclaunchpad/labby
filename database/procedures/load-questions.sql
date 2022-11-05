USE `labby`;
 
DROP procedure IF EXISTS `load_questions`;

DROP procedure IF EXISTS `load_questions_answers`;

DROP procedure IF EXISTS `load_conditions`;

DROP procedure IF EXISTS `load_cost`;
 
 
DELIMITER $$
 
CREATE PROCEDURE `load_questions` ()

BEGIN
    SELECT*FROM questions;
  
END $$

CREATE PROCEDURE `load_questions_answers` ()

BEGIN
    SELECT question, questions.question_type, answer
    FROM
        questions

    LEFT JOIN questions_answer
        ON questions.question_id = questions_answer.fk_question_id
    
    ORDER BY 
        question;
  
END $$

CREATE PROCEDURE `load_conditions` ()

BEGIN
    SELECT*FROM conditions;
  
END $$

CREATE PROCEDURE `load_cost` ()

BEGIN
    SELECT question, answer, organization_name, cost
    FROM
        questions
    
    LEFT JOIN questions_answer
        ON questions.question_id = questions_answer.fk_question_id

    LEFT JOIN questions_cost
        ON questions_answer.answer_id = questions_cost.fk_answer_id

    LEFT JOIN organizations
        ON organizations.organization_id = questions_cost.fk_organization_id
    ORDER BY 
        position_index;
  
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




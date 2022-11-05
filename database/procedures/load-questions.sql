USE `labby`;
 
DROP procedure IF EXISTS `load_questions`;

DROP procedure IF EXISTS `load_questions_answers`;

DROP procedure IF EXISTS `load_conditions`;

DROP procedure IF EXISTS `load_costs`;
 
 
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

CREATE PROCEDURE `load_costs` ()

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



USE `labby`;
 
DROP procedure IF EXISTS `load_forms`;
DROP procedure IF EXISTS `load_published_forms`;
DROP procedure IF EXISTS `load_questions`;
DROP procedure IF EXISTS `load_questions_by_form`;
DROP procedure IF EXISTS `load_questions_answers`;
DROP procedure IF EXISTS `load_conditions`;
DROP procedure IF EXISTS `load_costs`;
DROP procedure IF EXISTS `load_organization_costs`;
 
 
DELIMITER $$

CREATE PROCEDURE `load_forms` ()

BEGIN
    SELECT * FROM forms
    ORDER BY date_created DESC;
  
END $$

CREATE PROCEDURE `load_published_forms` ()

BEGIN
    SELECT * FROM forms
    WHERE published = 1
    ORDER BY date_created DESC;
  
END $$
 
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

CREATE PROCEDURE `load_questions_by_form` (IN `_form_id` VARCHAR(50))

BEGIN
    SELECT questions.*, questions_answer.answer_id, questions_answer.fk_question_id, questions_answer.answer, questions_cost.*
    FROM
        questions
    
    LEFT JOIN questions_answer
        ON questions.question_id = questions_answer.fk_question_id

    LEFT JOIN questions_cost
        ON questions_answer.answer_id = questions_cost.fk_answer_id

    WHERE questions.fk_form_id = _form_id

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

CREATE PROCEDURE `load_costs` ()

BEGIN
    SELECT question, answer, questions_cost.fk_answer_id, organization_name, cost, questions_cost.*
    FROM
        questions
    
    LEFT JOIN questions_answer
        ON questions.question_id = questions_answer.fk_question_id

    LEFT JOIN questions_cost
        ON questions_answer.answer_id = questions_cost.fk_answer_id

    LEFT JOIN organizations
        ON organizations.organization_type = questions_cost.price_category

    WHERE cost IS NOT NULL
    ORDER BY 
        position_index;
  
END $$

CREATE PROCEDURE `load_organization_costs` (IN org_type VARCHAR(50))
BEGIN
SELECT question, answer, fk_answer_id, cost
    FROM
        questions
    
    LEFT JOIN questions_answer
        ON questions.question_id = questions_answer.fk_question_id

    LEFT JOIN questions_cost
        ON questions_answer.answer_id = questions_cost.fk_answer_id
        WHERE questions_cost.price_category = org_type

    ORDER BY 
        position_index;
END $$
  
DELIMITER ;


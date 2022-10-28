USE `labby.db`;
DROP procedure IF EXISTS `join_questions_answers`;

DELIMITER $$
 
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
 
DELIMITER ;

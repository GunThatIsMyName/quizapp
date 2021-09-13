import React from "react";
import { useGlobalContext } from "./context";
import Modal from "./Modal";

const Quiz = () => {
  const { closeModal,handleAnswer, correct, questions, modal, index, handleQuiz } =
    useGlobalContext();
  const data = questions[index];
  const { incorrect_answers, correct_answer, question } = data;
  console.log(incorrect_answers,"ㅇㅣㅆ노")
  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random()*answers.length)
  if(tempIndex === answers.length){
      answers.push(correct_answer)
  }else{
      answers.push(answers[tempIndex]);
      answers[tempIndex] = correct_answer;
  }
  return (
    <main>
      <Modal />
      <div className="quiz quiz-small">
          <p>
            answer {correct} / {index}
          </p>
          <h3 dangerouslySetInnerHTML={{ __html: question }} />
          {answers.map((item, index) => {
            return (
              <button
                className="answer-btn"
                key={index}
                type="submit"
                value={item}
                onClick={()=>handleAnswer(correct_answer === item)}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            );
          })}
          <button onClick={handleQuiz}>next btn</button>
      </div>
    </main>
  );
};

export default Quiz;

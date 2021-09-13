import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
  const {quiz,error,handleSubmit,handleChange}=useGlobalContext();
  return (
    <main>
      <section className="quiz quiz-small">
        <form className="setup-form">
          <h2>Quiz Machine</h2>
          <div className="form-control">
            <label htmlFor="amount">amount of question</label>
            <input 
              type='number'
              name='amount'
              id='amount'
              value={quiz.amount}
              onChange={handleChange}
              className='form-input'
              min={1}
              max={50}
            />
          </div>
          <div className="form-control">
            <label htmlFor="category">categry of question</label>
            <select 
            onChange={handleChange}
            value={quiz.category}
            className='form-input' name="category" id="category">
              <option value="sports">sports</option>
              <option value="animal">animal</option>
              <option value="history">history</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="difficulty">difficulty of question</label>
            <select 
            onChange={handleChange}
            value={quiz.difficulty}
            className='form-input' name="difficulty" id="difficulty">
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          {error && (
            <p className='error'>
              can't generate questions, please try different options
            </p>
          )}
          <button type='submit' onClick={handleSubmit} className='submit-btn'>
            start
          </button>
        </form>
      </section>
    </main>
  );
};

export default SetupForm;

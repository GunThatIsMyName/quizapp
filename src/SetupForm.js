import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { quiz, setQuiz, error, handleChange, handleSubmit } =
    useGlobalContext();
  return (
    <div className="quiz quiz-small">
      <form className="setup-form">
        <h2>setup quiz</h2>
        <div className="form-control">
          <label htmlFor="amout">number of questions</label>
          <input
            onChange={handleChange}
            value={quiz.amount}
            className="form-input"
            type="number"
            name="amount"
            id="amount"
            min={1}
            max={30}
          />
        </div>
        {/* category */}
        <div className="form-control">
          <label htmlFor="category">category of questions</label>
          <select
            onChange={handleChange}
            value={quiz.category}
            className="form-input"
            name="category"
            id="category"
          >
            <option value="sports">sports</option>
            <option value="animal">animal</option>
            <option value="politics">politics</option>
            <option value="history">history</option>
          </select>
        </div>
        {/* difficulty */}
        <div className="form-control">
          <label htmlFor="difficulty">category of questions</label>
          <select
            onChange={handleChange}
            value={quiz.difficulty}
            className="form-input"
            name="difficulty"
            id="difficulty"
          >
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </div>
        {error && (
          <p className="error">can't generate question plz try again</p>
        )}
        <button type="submit" onClick={handleSubmit} className="submit-btn">
          start
        </button>
      </form>
    </div>
  );
};

export default SetupForm;

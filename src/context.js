import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
  animal: 27,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";
const tempURL =
  "https://opentdb.com/api.php?amount=3&category=13&difficulty=medium&type=multiple";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(false);
  const [index, setIndex] = useState(0);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });
  const [correct, setCorrect] = useState(0);

  const fetchQuestion = async (tempURL) => {
    setWaiting(false);
    setLoading(true);
    try {
      const {
        data: { results },
      } = await axios(tempURL);
      if (results.length > 0) {
        setQuestions(results);
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error, "errro");
    } finally {
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   fetchQuestion(tempURL);
  // }, []);
  const handleQuiz = () => {
    nextQuestion();
  };
  const handleAnswer = (value) => {
    if (value) {
      setCorrect((old) => old + 1);
    }
    nextQuestion();
  };
  const nextQuestion = () => {
    setIndex((old) => {
      if (old === questions.length - 1) {
        openModal();
        return 0;
      }
      return old + 1;
    });
  };
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
    setWaiting(true);
    setCorrect(0)
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;
    const apiUrl = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}`;
    fetchQuestion(apiUrl);
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };
  return (
    <AppContext.Provider
      value={{
        quiz,
        closeModal,
        handleAnswer,
        handleQuiz,
        correct,
        index,
        questions,
        waiting,
        loading,
        modal,
        handleSubmit,
        handleChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
  animal:27,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestion] = useState([]);
  const [index, setIndex] = useState(0);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "medium",
  });
  const fetchQuestion = async (url) => {
    setLoading(true);
    setWaiting(false);
    try {
      const {
        data: { results },
      } = await axios(url);
      if (results.length > 0) {
        setQuestion(results);
        setError(false);
      } else {
        setQuestion([]);
        setWaiting(true);
        setError(true);
      }
    } catch (error) {
      console.log(error, "error");
      setError(true);
    } finally {
      setLoading(false);
      setWaiting(false);
    }
  };
  const handleIndex = () => {
    setIndex((oldIndex) => {
      if (oldIndex + 1 > questions.length - 1) {
        openModal();
        return 0;
      }
      return oldIndex + 1;
    });
  };
  const handleAnswer = (value) => {
    console.log(value, "@@@@");
    if (value) {
      setCorrect((old) => {
        return old + 1;
      });
    }
    handleIndex();
  };
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
    setWaiting(true);
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({...quiz,[name]:value})
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const {amount,category,difficulty}=quiz
    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}`
    fetchQuestion(url)
  };

  return (
    <AppContext.Provider
      value={{
        waiting,
        quiz,
        setQuiz,
        loading,
        questions,
        index,
        modal,
        error,
        correct,
        handleAnswer,
        closeModal,
        handleIndex,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

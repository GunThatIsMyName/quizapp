import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
import Quiz from "./quiz";


function App() {
  const {waiting,loading}=useGlobalContext();
  // waiting
  if(waiting){
    return(
      <SetupForm />
    )
  }
  // loading
  if(loading){
    return(
      <Loading />
    )
  }
  return(
    <Quiz />
  )
}

export default App;

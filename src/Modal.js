import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {
  const {closeModal,correct,questions,modal} =useGlobalContext();
  return(
    <div className={`modal-container ${modal?"isOpen":""}`}>
      <div className="modal-content">
        <h2>{correct > 5 ? "Awesome work" : "study hard"}</h2>
        <p>Your answer {((correct/questions.length)*100).toFixed(0)} % of questions correctyly </p>
        <button onClick={closeModal} className="close-btn">
          play again
        </button>
      </div>
    </div>
  )
}

export default Modal

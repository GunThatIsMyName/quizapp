import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {
  const {closeModal,correct,questions,modal} =useGlobalContext();
  return(
    <h1>MOLDA</h1>
  )
}

export default Modal

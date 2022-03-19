import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import modalStyle from './modal.module.css'
import { CloseIcon, } from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory } from "react-router-dom";

const modalRoot = document.getElementById('modal');

export const Modal = (props) => {
  let history = useHistory();


  React.useEffect(()=>{
    document.addEventListener('keydown', closeEscButton);
    return()=>{
      document.removeEventListener('keydown', closeEscButton);
    }
  })

  function closeEscButton (e) {
    if (e.key === 'Escape') {
      props.toggleModal(e)
    }
  };

  function onBackgroundClick(e) {
    if(e.target.className === modalStyle.overlay){
      props.toggleModal(e)
    }
  } 

  return ReactDOM.createPortal(
    <div className={modalStyle.overlay} onClick={onBackgroundClick}>
      <div className={modalStyle.modal}>
        <div className={`${modalStyle.title} mt-10`}>
          <p className={`${modalStyle.header} text text_type_main-large mr-9`}>{props.title}</p>
          <button className={modalStyle.closeButton} onClick={props.toggleModal}><CloseIcon type="primary" /></button>
        </div>
        {props.children}
      </div>
    </div>,
      modalRoot
    )
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  title: PropTypes.string, 
  children: PropTypes.node.isRequired
};

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import modalStyle from './modal.module.css'
import {ModalOverlay} from "../ModalOverlay/ModalOverlay.jsx";
import { CloseIcon, } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById('modal');

export const Modal = (props) => {
  
  return ReactDOM.createPortal(
    <ModalOverlay>
      <div className={modalStyle.modal}>
        <div className={`${modalStyle.title} mt-10`}>
          <p className={`${modalStyle.header} text text_type_main-large mr-9`}>{props.title}</p>
          <button className={modalStyle.closeButton} onClick={props.toggleModal}><CloseIcon type="primary" /></button>
        </div>
        {props.children}
      </div>
    </ModalOverlay>,
      modalRoot
    )
}

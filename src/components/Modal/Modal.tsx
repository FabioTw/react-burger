import React, { FC } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import modalStyle from './modal.module.css'
import { CloseIcon, } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot: HTMLElement | null = document.getElementById('modal') as HTMLElement;;

interface IModal {
  title?: string;
  toggleModal: (event?: React.BaseSyntheticEvent<HTMLDivElement> | 
    React.KeyboardEvent<HTMLDivElement> | 
    KeyboardEvent | 
    React.MouseEvent<HTMLDivElement> |
    React.MouseEvent<HTMLButtonElement> 
    ) => void;
}

export const Modal: FC<IModal> = ({title, toggleModal, children}) => {

  React.useEffect(()=>{
    document.addEventListener('keydown', closeEscButton);
    return()=>{
      document.removeEventListener('keydown', closeEscButton);
    }
  })

  function closeEscButton (event: React.KeyboardEvent<HTMLDivElement> | KeyboardEvent): void {
    if (event.key === 'Escape') {
      toggleModal(event)
    }
  };

  function onBackgroundClick(event: React.MouseEvent<HTMLDivElement> | React.BaseSyntheticEvent<HTMLDivElement>): void {
    if(event.target.className === modalStyle.overlay){
      toggleModal(event)
    }
  } 

  return ReactDOM.createPortal(
    <div className={modalStyle.overlay} onClick={onBackgroundClick}>
      <div className={modalStyle.modal}>
        <div className={`${modalStyle.title} mt-10`}>
          <p className={`${modalStyle.header} text text_type_main-large mr-9`}>{title}</p>
          <button className={modalStyle.closeButton} onClick={toggleModal}><CloseIcon type="primary" /></button>
        </div>
        {children}
      </div>
    </div>,
      modalRoot
    )
}

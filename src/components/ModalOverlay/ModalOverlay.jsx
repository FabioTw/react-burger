import React from "react";
import PropTypes from "prop-types";
import modalOverlay from './modal-overlay.module.css'

export const ModalOverlay = (props) => {

  React.useEffect(()=>{
    document.addEventListener('keydown', closeEscButton);
    return()=>{
      document.removeEventListener('keydown', closeEscButton);
    }
  })

  function closeEscButton (e) {
    if (e.key === 'Escape') {
      props.toggleModal()
    }
  };

  function onBackgroundClick(e) {
    if(e.target.className === modalOverlay.overlay){
      props.toggleModal()
    }
  } 

  return (
    <div className={modalOverlay.overlay} onClick={onBackgroundClick} >
      {props.children}
    </div>
  )
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  toggleModal: PropTypes.func.isRequired
};

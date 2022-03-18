import React from "react";
import PropTypes from "prop-types";
import modalOverlay from './modal-overlay.module.css'
import { CLOSE_INGREDIENT } from "../../services/actions/ingredient";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export const ModalOverlay = (props) => {
  let history = useHistory();
  const dispatch = useDispatch(); 

  const back = e => {
    e.stopPropagation();
    dispatch({type: CLOSE_INGREDIENT})
    history.goBack();
  };
  React.useEffect(()=>{
    document.addEventListener('keydown', closeEscButton);
    return()=>{
      document.removeEventListener('keydown', closeEscButton);
    }
  })

  function closeEscButton (e) {
    if (e.key === 'Escape') {
      back(e)
    }
  };

  function onBackgroundClick(e) {
    if(e.target.className === modalOverlay.overlay){
      back(e)
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
};

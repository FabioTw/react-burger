import React from "react";
import PropTypes from "prop-types";
import modalOverlay from './modal-overlay.module.css'

export const ModalOverlay = (props) => {
  return (
    <section className={modalOverlay.overlay}>
      {props.children}
    </section>
  )
}
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/thunk/getIngredients";
import { OrderBlock } from "../OrderBlock/OrderBlock";
import styles from './orders-feed.module.css'

export const OrdersFeed = ({toggleFeedOverlay}) => {
  const {orders, } = useSelector(state => state.ws);
  let status = false
  return (
    <div className={`${styles.orders}`}>
      {orders.map((element)=> {
        return ( <OrderBlock 
        key={element._id} 
        element={element} 
        toggleFeedOverlay={toggleFeedOverlay} 
        pathname={`/feed/${element._id}`} 
        width={'584px'}
        height={'214px'} 
        status={status}
        /> )
      })}
    </div>
  )
}

OrdersFeed.propTypes = {
  toggleFeedOverlay: PropTypes.func.isRequired,
};

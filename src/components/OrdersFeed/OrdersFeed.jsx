import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/thunk/getIngredients";
import { OrderBlock } from "../OrderBlock/OrderBlock";
import styles from './orders-feed.module.css'

export const OrdersFeed = ({toggleFeedOverlay}) => {
  const { standartIngredients,} = useSelector(state => state.ingredients);
  const {orders, } = useSelector(state => state.ws);
  const dispatch = useDispatch();

  React.useEffect(()=>{
    if (standartIngredients[0] === undefined) {
      dispatch(getIngredients())
    }
  },[standartIngredients]);

  return (
    <div className={`${styles.orders}`}>
      {orders.map((element)=> {
        return <OrderBlock key={element._id} element={element} toggleFeedOverlay={toggleFeedOverlay} />
      })}
    </div>
  )
}

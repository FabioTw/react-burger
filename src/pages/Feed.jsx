import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { FeedDetails } from "../components/FeedDetails/FeedDetails";
import { OrdersFeed } from "../components/OrdersFeed/OrdersFeed"
import { StatsFeed } from "../components/StatsFeed/StatsFeed"
import { WS_CLOSE_ORDER, WS_CONNECTION_START, WS_GET_MESSAGE, WS_SELECT_ORDER } from "../services/actions/wsActionTypes";
import { getIngredients } from "../services/thunk/getIngredients";
import styles from './index.module.css';

export const Feed = () => {
  const dispatch = useDispatch()
  const {standartIngredients} = useSelector(state => state.ingredients);
  const { total, totalToday, orders, wsConnected, feedOverlay} = useSelector(state => state.ws);

  const toggleFeedOverlay = () => {
    if (feedOverlay) {
      dispatch({type: WS_CLOSE_ORDER})
    } else {
      dispatch({type: WS_SELECT_ORDER})
    }
  }

  React.useEffect(()=>{
    if (standartIngredients[0] === undefined) {
      dispatch(getIngredients())
    }
  },[standartIngredients]);
  
  React.useEffect(
    () => {
      if(!wsConnected){
        dispatch({ type: WS_CONNECTION_START });
      }
    },
    [wsConnected]
  )
  return (
    <div className={`${styles.field}`}>
      <p className={`${styles['page-header']} text text_type_main-large mt-10`}>Лента заказов</p>
      <div className={`${styles.field} ${styles.feed}`}>
        <OrdersFeed toggleFeedOverlay={toggleFeedOverlay}/>
        <StatsFeed />
      </div>
      {/* {feedOverlay && <FeedDetails updateFeedOverlay={toggleFeedOverlay}/>} */}
    </div>
  )
}
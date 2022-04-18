import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { OrdersFeed } from "../components/OrdersFeed/OrdersFeed"
import { StatsFeed } from "../components/StatsFeed/StatsFeed"
import { WS_CLEAN_ORDERS, WS_CLOSE_ORDER, WS_CONNECTION_CLOSED, WS_CONNECTION_START, WS_GET_MESSAGE, WS_SELECT_ORDER } from "../services/actions/wsActionTypes";
import styles from './index.module.css';

export const Feed = () => {
  const dispatch = useDispatch()
  const { wsConnected, feedOverlay, wsPrivateConnected} = useSelector(state => state.ws);
  
  const toggleFeedOverlay = () => {
    if (feedOverlay) {
      dispatch({type: WS_CLOSE_ORDER})
    } else {
      dispatch({type: WS_SELECT_ORDER})
    }
  }

  React.useEffect(
    () => {
      dispatch({ type: WS_CLEAN_ORDERS })
      if(!wsConnected){
        dispatch({ type: WS_CONNECTION_START });
      }
      return () => dispatch({ type: WS_CONNECTION_CLOSED })
    },
    [wsPrivateConnected]
  )
  
  return (
    <div className={`${styles.field}`}>
      <p className={`${styles['page-header']} text text_type_main-large mt-10`}>Лента заказов</p>
      <div className={`${styles.field} ${styles.feed}`}>
        <OrdersFeed toggleFeedOverlay={toggleFeedOverlay}/>
        <StatsFeed />
      </div>
    </div>
  )
}
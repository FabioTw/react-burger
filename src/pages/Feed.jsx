import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { OrdersFeed } from "../components/OrdersFeed/OrdersFeed"
import { StatsFeed } from "../components/StatsFeed/StatsFeed"
import { WS_CLEAN_ORDERS, WS_CLOSE_ORDER, WS_CONNECTION_CLOSED, WS_CONNECTION_START, WS_GET_MESSAGE, WS_SELECT_ORDER } from "../services/actions/wsActionTypes";
import { socket } from "../services/middleware";
import { wsUrl } from "../services/store";
import styles from './index.module.css';

export const Feed = () => {
  const dispatch = useDispatch()
  const { wsConnected, feedOverlay, wsClosed} = useSelector(state => state.ws);
  
  const toggleFeedOverlay = () => {
    if (feedOverlay) {
      dispatch({type: WS_CLOSE_ORDER})
    } else {
      dispatch({type: WS_SELECT_ORDER})
    }
  }
//Вот что заметил, иногда почему-то появляются проблемы с подключением к WS, но при включении VPN проблема проподает, может конечно у меня какие-то проблемы с провайдером,
//но во избежании проблем с подключением прошу протестит с VPN
  React.useEffect(
    () => {
      if (socket !== null) {
        socket.close() //закрывает соединение, если по какой-либо причине оно не было закрыто до этого
      }
      dispatch({ type: WS_CLEAN_ORDERS })
      if(!wsConnected || socket.url !== wsUrl){
        dispatch({ type: WS_CONNECTION_START });
      }       
      return () => {dispatch({ type: WS_CONNECTION_CLOSED }); socket.close();}
    },[]
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
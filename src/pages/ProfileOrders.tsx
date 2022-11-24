import React, { FC } from "react"
import { useDispatch, useSelector } from '../services/hooks/hooks'
import { NavigationProfile } from "../components/NavigationProfile/NavigationProfile"
import { OrdersProfile } from "../components/OrdersProfile/OrdersProfile"
import { WS_CLEAN_ORDERS, WS_CLOSE_ORDER, WS_PRIVATE_CONNECTION_START, WS_SELECT_ORDER, WS_CONNECTION_CLOSED } from "../services/actions/wsActionTypes"
import { socket } from "../services/middleware";

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const {feedOverlay, wsPrivateConnected} = useSelector(state => state.ws)
  const toggleFeedOverlay = (): void => {
    if (feedOverlay) {
      dispatch({type: WS_CLOSE_ORDER})
    } else {
      dispatch({type: WS_SELECT_ORDER})
    }
  }

  React.useEffect(
    () => {
      if (socket !== null) {
        socket.close() //закрывает соединение, если по какой-либо причине оно не было закрыто до этого
      }
      dispatch({ type: WS_CLEAN_ORDERS })
      if(!wsPrivateConnected){
        dispatch({ type: WS_PRIVATE_CONNECTION_START });
      } 
      return () => {dispatch({ type: WS_CONNECTION_CLOSED }); socket?.close();}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]
  )
  
  return (
    <>
      <NavigationProfile />
      <OrdersProfile toggleFeedOverlay={toggleFeedOverlay}/>
    </>
  )
}
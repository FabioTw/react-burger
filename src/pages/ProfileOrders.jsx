import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation } from 'react-router-dom'; 
import { EditProfile } from "../components/EditProfile/EditProfile"
import { NavigationProfile } from "../components/NavigationProfile/NavigationProfile"
import { OrdersProfile } from "../components/OrdersProfile/OrdersProfile"
import { WS_CLEAN_ORDERS, WS_CLOSE_ORDER, WS_PRIVATE_CONNECTION_START, WS_SELECT_ORDER, WS_CONNECTION_CLOSED } from "../services/actions/wsActionTypes"
import { socket } from "../services/middleware";

export const ProfileOrders = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {feedOverlay, wsPrivateConnected, wsClosed} = useSelector(state => state.ws)
  const toggleFeedOverlay = () => {
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
      setTimeout(()=>{
        if(!wsPrivateConnected){
          dispatch({ type: WS_PRIVATE_CONNECTION_START });
        } 
      },800) //задержка на случай если соединение не успело закрыться 
      return () => {dispatch({ type: WS_CONNECTION_CLOSED }); socket.close();}
    },[]
  )
  
  return (
    <>
      <NavigationProfile />
      <OrdersProfile toggleFeedOverlay={toggleFeedOverlay}/>
    </>
  )
}
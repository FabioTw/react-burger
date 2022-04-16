import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation } from 'react-router-dom'; 
import { EditProfile } from "../components/EditProfile/EditProfile"
import { NavigationProfile } from "../components/NavigationProfile/NavigationProfile"
import { OrdersProfile } from "../components/OrdersProfile/OrdersProfile"
import { WS_CLEAN_ORDERS, WS_CLOSE_ORDER, WS_PRIVATE_CONNECTION_START, WS_SELECT_ORDER,WS_CONNECTION_CLOSED } from "../services/actions/wsActionTypes"

export const ProfileOrders = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {feedOverlay, wsPrivateConnected} = useSelector(state => state.ws)
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
      if(!wsPrivateConnected){
        dispatch({ type: WS_PRIVATE_CONNECTION_START });
      } 
      return () => dispatch({ type: WS_CONNECTION_CLOSED })
    },
    [wsPrivateConnected]
  )
  
  return (
    <>
      <NavigationProfile />
      <OrdersProfile toggleFeedOverlay={toggleFeedOverlay}/>
    </>
  )
}
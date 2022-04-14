import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { EditProfile } from "../components/EditProfile/EditProfile"
import { NavigationProfile } from "../components/NavigationProfile/NavigationProfile"
import { OrdersProfile } from "../components/OrdersProfile/OrdersProfile"
import { WS_CLOSE_ORDER, WS_CONNECTION_START, WS_SELECT_ORDER } from "../services/actions/wsActionTypes"

export const ProfileOrders = () => {
  const dispatch = useDispatch();
  const {feedOverlay, wsConnected} = useSelector(state => state.ws)
  const toggleFeedOverlay = () => {
    if (feedOverlay) {
      dispatch({type: WS_CLOSE_ORDER})
    } else {
      dispatch({type: WS_SELECT_ORDER})
    }
  }

  React.useEffect(
    () => {
      if(!wsConnected){
        dispatch({ type: WS_CONNECTION_START });
      }
    },
    [wsConnected]
  )
  return (
    <>
      <NavigationProfile />
      <OrdersProfile toggleFeedOverlay={toggleFeedOverlay}/>
    </>
  )
}
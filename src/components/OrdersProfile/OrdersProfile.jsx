import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { personalAccess } from "../../services/store";
import { getIngredients } from "../../services/thunk/getIngredients";
import { OrderBlock } from "../OrderBlock/OrderBlock";
import styles from './orders-profile.module.css'

export const OrdersProfile = ({toggleFeedOverlay}) => {
  const { standartIngredients,} = useSelector(state => state.ingredients);
  const {orders, wsPrivateConnected} = useSelector(state => state.ws);
  let status = true
  const sortedOrders = []
  if (orders.length === undefined)  {
    return null
  }

  for (let index = orders.length-1; index >= 0; index--) {
    let element = orders[index]
    sortedOrders.push(element)
 }
  if (standartIngredients[0] !== undefined) {
    return (
      <div className={`${styles.orders}`}>
        {sortedOrders.map((element)=> {
          return ( <OrderBlock 
          key={element._id} 
          element={element} 
          toggleFeedOverlay={toggleFeedOverlay} 
          pathname={`/profile/orders/${element._id}`}
          width={'856px'}
          height={'246px'}
          status={status}
        /> )
        })}
      </div>
    )
  }
  return null
}


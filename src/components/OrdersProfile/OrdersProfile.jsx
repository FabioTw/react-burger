import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { personalAccess } from "../../services/store";
import { getIngredients } from "../../services/thunk/getIngredients";
import { OrderBlock } from "../OrderBlock/OrderBlock";
import styles from './orders-profile.module.css'

export const OrdersProfile = ({toggleFeedOverlay}) => {
  const createdTime = 'Сегодня, 16:20 i-GMT+3'
  const { standartIngredients,} = useSelector(state => state.ingredients);
  const ingredient = [standartIngredients[0], standartIngredients[4], standartIngredients[5], standartIngredients[6]]
  const {orders, } = useSelector(state => state.ws);
  let status = true
  const dispatch = useDispatch();
  React.useEffect(()=>{
    if (standartIngredients[0] === undefined) {
      dispatch(getIngredients())
    }
  },[standartIngredients]);
  if (standartIngredients[0] !== undefined) {
    return (
      <div className={`${styles.orders}`}>
        {orders.map((element)=> {
          return <OrderBlock 
          key={element._id} 
          element={element} 
          toggleFeedOverlay={toggleFeedOverlay} 
          pathname={`/profile/orders/${element._id}`}
          width={'856px'}
          height={'246px'}
          status={status}
        />
        })}
      </div>
    )
  }
  return null
}
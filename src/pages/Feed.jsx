import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { OrdersFeed } from "../components/OrdersFeed/OrdersFeed"
import { StatsFeed } from "../components/StatsFeed/StatsFeed"
import { WS_CONNECTION_START, WS_GET_MESSAGE } from "../services/actions/wsActionTypes";
import { getIngredients } from "../services/thunk/getIngredients";
import styles from './index.module.css';

export const Feed = () => {
  const dispatch = useDispatch()
  const {standartIngredients} = useSelector(state => state.ingredients);
  const { total, totalToday, orders, wsConnected} = useSelector(state => state.ws);
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
        <OrdersFeed />
        <StatsFeed />
      </div>
    </div>
  )
}
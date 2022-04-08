import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/thunk/getIngredients";
import styles from './orders-feed.module.css'

export const OrdersFeed = () => {
  const orderNumber = '#034535';
  const createdTime = 'Сегодня, 16:20 i-GMT+3'
  const orderName = 'Death Star Starship Main бургер'
  const ordePrice = 480;
  const { standartIngredients, constructorIngredients, selectedBun, constructorKeys } = useSelector(state => state.ingredients);
  const ingredient = [standartIngredients[0], standartIngredients[4], standartIngredients[5], standartIngredients[6]]
  const dispatch = useDispatch();
  
  React.useEffect(()=>{
    if (standartIngredients[0] === undefined) {
      dispatch(getIngredients())
    }
  },[standartIngredients]);
  
  return (
    <div className={`${styles.orders}`}>
      <div className={`${styles['order-block']} pl-6 pr-6 mb-4 mt-5 mr-2`}>
        <div className={`${styles['order-title']} mt-6`}>
          <p className="text text_type_main-medium">{orderNumber}</p>
          <p className="text text_type_main-default text_color_inactive">{createdTime}</p>
        </div>
        <p className="text text_type_main-medium mt-6 mb-6">{orderName}</p>
        <div className={`${styles['order-ingredients']} mb-6`}>
          <div>
          <img className={styles.image} style={{zIndex:1}} src={ standartIngredients[0] === undefined ? '#' : ingredient[0].image_mobile} alt="" />
          <img className={styles.image} style={{zIndex:-1, left:-20}} src={ standartIngredients[1] === undefined ? '#' : ingredient[1].image_mobile} alt="" />
          <img className={styles.image} style={{zIndex:-2, left:-40}} src={ standartIngredients[2] === undefined ? '#' :ingredient[2].image_mobile} alt="" />
          <img className={styles.image} style={{zIndex:-3, left:-60}} src={ standartIngredients[3] === undefined ? '#' :ingredient[3].image_mobile} alt="" />
          </div>
          <div className={`${styles['order-price']}`}>
            <p className="text text_type_digits-default mr-2">{ordePrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  )
}
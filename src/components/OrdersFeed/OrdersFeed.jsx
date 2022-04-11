import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/thunk/getIngredients";
import { v4 as uuidv4 } from 'uuid'
import styles from './orders-feed.module.css'

export const OrdersFeed = () => {
  const orderNumber = '#034535';
  const createdTime = 'Сегодня, 16:20 i-GMT+3'
  let picLength = ''
  let ordePrice = 0;
  const { standartIngredients, constructorIngredients, selectedBun, constructorKeys } = useSelector(state => state.ingredients);
  const {orders, } = useSelector(state => state.ws);
  const dispatch = useDispatch();
  React.useEffect(()=>{
    if (standartIngredients[0] === undefined) {
      dispatch(getIngredients())
    }
  },[standartIngredients]);
  return (
    <div className={`${styles.orders}`}>
      {orders.map((element)=> {
        return (
        <div key={element._id} className={`${styles['order-block']} pl-6 pr-6 mb-4 mt-5 mr-2`}>
          <div className={`${styles['order-title']} mt-6`}>
            <p className="text text_type_main-medium">{`#${element.number}`}</p>
            <p className="text text_type_main-default text_color_inactive">{element.updatedAt}</p>
          </div>
          <p className={`${styles['order-name']} text text_type_main-medium mt-6 mb-6`}>{element.name}</p>
          <div className={`${styles['order-ingredients']} mb-6`}>
            <div className={`${styles['pic-ingredients-box']}`}>
              {element.ingredients.map((ingredient, index)=> {
                return standartIngredients.map(standartIngredient => {
                  if (standartIngredient._id === ingredient){
                    if (index === 0) {
                      ordePrice = 0
                      ordePrice+=standartIngredient.price
                    } else {
                      ordePrice+=standartIngredient.price
                    }
                    if (index >=6) {
                      return
                    } 
                    if (index === 5) {
                      return (<div key={uuidv4()} className={`${styles['pic-ingredients']}`}><img src={standartIngredient.image_mobile} className={styles.image} style={{zIndex: index===0 ? 1: (index+2)*-1, left: index!==0 ? index*20*-1 : 0 }} alt="" /><p className={`${styles['pic-number']} text text_type_main-small`}>{`+${element.ingredients.length-index}`}</p></div>)
                    }
                    return <img key={uuidv4()} src={standartIngredient.image_mobile} className={styles.image} style={{zIndex: index===0 ? 1: (index+2)*-1, left: index!==0 ? index*20*-1 : 0 }} alt="" />
                  }
                });
                })
              }
            </div>
            <div className={`${styles['order-price']}`}>
              <p className="text text_type_digits-default mr-2">{ordePrice}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>)
      })}
    </div>
  )
}
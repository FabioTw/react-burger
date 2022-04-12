import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { WS_SELECT_ORDER } from "../../services/actions/wsActionTypes";
import styles from './order-block.module.css'
import { v4 as uuidv4 } from 'uuid'
import {
  NavLink,
  useLocation,
} from "react-router-dom";

export const OrderBlock = ({element, toggleFeedOverlay}) => {
  let orderPrice = 0;
  const dispatch = useDispatch();
  let location = useLocation();
  const { standartIngredients,} = useSelector(state => state.ingredients);
  const selectOrder = (e) => {
    e.stopPropagation();
    toggleFeedOverlay()
    dispatch({type: WS_SELECT_ORDER, payload: element});
  }
  console.log(element)
  return (
    <NavLink to={{pathname: `/feed/${element._id}`, state: {background: location}}} className={`${styles['order-block']} pl-6 pr-6 mb-4 mt-5 mr-2`} onClick={selectOrder}>
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
                  orderPrice = 0
                  orderPrice+=standartIngredient.price
                } else {
                  orderPrice+=standartIngredient.price
                }
                if (standartIngredient.type ==='bun') {
                  orderPrice+=standartIngredient.price
                }
                if (index >=6) {
                  return
                } 
                if (index === 5) {
                  return (
                  <div key={uuidv4()} className={`${styles['pic-ingredients']}`}>
                    <img src={standartIngredient.image_mobile} 
                    className={styles.image} 
                    style={{zIndex: index===0 ? 1: (index+2)*-1, left: index!==0 ? index*20*-1 : 0 }} 
                    alt="Картинка ингредиента" 
                    />
                    <p className={`${styles['pic-number']} text text_type_main-small`}>{`+${element.ingredients.length-index}`}</p>
                  </div>)
                }
                return (
                <img key={uuidv4()} src={standartIngredient.image_mobile} 
                className={styles.image} 
                style={{zIndex: index===0 ? 1: (index+2)*-1, left: index!==0 ? index*20*-1 : 0 }} 
                alt="Картинка ингредиента" 
                />)
              }
            });
            })
          }
        </div>
        <div className={`${styles['order-price']}`}>
          <p className="text text_type_digits-default mr-2">{orderPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </NavLink>)
}
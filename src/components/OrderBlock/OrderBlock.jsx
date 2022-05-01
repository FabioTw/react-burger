import PropTypes from "prop-types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { WS_SELECT_ORDER } from "../../services/actions/wsActionTypes";
import styles from './order-block.module.css'
import { v4 as uuidv4 } from 'uuid'
import {
  NavLink,
  useLocation,
} from "react-router-dom";
import { convertDate } from "../../utils/convertDate";

export const OrderBlock = ({element, toggleFeedOverlay, pathname, width, height, status}) => {
  const createdTime = 'Today, 16:20 i-GMT+3'
  let orderPrice = 0;
  const needStatus = status
  const dispatch = useDispatch();
  let location = useLocation();
  const { standartIngredients,} = useSelector(state => state.ingredients);
  const selectOrder = (e) => {
    e.stopPropagation();
    toggleFeedOverlay()
    dispatch({type: WS_SELECT_ORDER, payload: element});
  }

  let dateString = convertDate(element.updatedAt);

  return (
    <NavLink to={{pathname: `${pathname}`, state: {background: location}}} className={`${styles['order-block']} pl-6 pr-6 mb-4 mt-5 mr-2`} style={{width: width, height:height}} onClick={selectOrder}>
      <div className={`${styles['order-title']} mt-6`}>
        <p className="text text_type_main-medium">{`#${element.number}`}</p>
        <p className="text text_type_main-default text_color_inactive">{dateString}</p>
      </div>
      <p className={`${styles['order-name']} text text_type_main-medium mt-6 ${!needStatus && 'mb-6'}`}>{element.name}</p>
      {needStatus &&  <p className={`${styles.status} text text_type_main-default mt-2 mb-6`} 
      style={element.status === 'done' ? {color: '#00CCCC'} : {color: '#F2F2F3'}}>
        {`${element.status === 'done' ? 'Выполнен' : element.status === 'created' ? 'Создан': 'Готовится'}`}
      </p>}
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

OrderBlock.propTypes = {
  toggleFeedOverlay: PropTypes.func.isRequired,
};
import { useHistory, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from './feed-info.module.css'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { WS_CONNECTION_START } from "../../services/actions/wsActionTypes";
import { getIngredients } from "../../services/thunk/getIngredients";
import { convertDate } from "../../utils/convertDate";

export const FeedInfo = () => {
  let orderPrice;
  let history = useHistory();
  const dispatch = useDispatch();
  let { id } = useParams();
  const selected = []
  const {orders, wsConnected} = useSelector(state => state.ws)
  const { standartIngredients,} = useSelector(state => state.ingredients);

  React.useEffect(() => {
      if(!wsConnected){
        dispatch({ type: WS_CONNECTION_START });
      }
      if (standartIngredients[0] === undefined) {
        dispatch(getIngredients())
      }
    },[wsConnected, standartIngredients]
  )
  if (wsConnected){
    orders.map((element) => {
      if (element._id === id) {
        selected.push(element)
      }
    })
    const selectedIngredient = []
    let iterations = 0;
    if (selected[0] !== undefined) {
      selected[0].ingredients.map((element, index) => {
        standartIngredients.map(standartIngredient => {
          if (standartIngredient._id === element){
            if (selectedIngredient[0] === undefined) {
              selectedIngredient.push({
                id: standartIngredient._id, 
                iteration: 0, 
                image_mobile: 
                standartIngredient.image_mobile, 
                name: standartIngredient.name, 
                type: standartIngredient.type, 
                price: standartIngredient.price
              })
              iterations+= 1
            } 
            if (selectedIngredient.some(e => e.id === element)) {
              selectedIngredient.forEach((e, index) => {
                if (e.id === element){
                  selectedIngredient[index] = {
                    id: element, 
                    iteration: selectedIngredient[index].iteration+1, 
                    image_mobile: selectedIngredient[index].image_mobile, 
                    name: selectedIngredient[index].name, 
                    type: selectedIngredient[index].type, 
                    price: selectedIngredient[index].price
                  }
                  iterations+= 1
                }
              })
            } else {
              selectedIngredient.push({
                id: standartIngredient._id, 
                iteration: 1, 
                image_mobile: standartIngredient.image_mobile, 
                name: standartIngredient.name, 
                type: standartIngredient.type, 
                price: standartIngredient.price
              })
              iterations+= 1
            }
            if (index === 0) {
              orderPrice = 0
              orderPrice+=standartIngredient.price
            } else {
              orderPrice+=standartIngredient.price
            }
            if (standartIngredient.type ==='bun') {
              orderPrice+=standartIngredient.price
            }
          }
        })
      })

      let dateString = convertDate(selected[0].updatedAt);
      
      return (
        <div className={`${styles['main-block']} mt-30`}>
          <p className={`${styles.number} text text_type_main-medium`}>{`#${selected[0].number}`}</p>
          <p className={`${styles.name} text text_type_main-medium`}>{`${selected[0].name}`}</p>
          <p className={`${styles.status} text text_type_main-default mt-2`} 
          style={selected[0].status === 'done' ? {color: '#00CCCC'} : {color: '#F2F2F3'}}>
            {`${selected[0].status === 'done' ? 'Выполнен' : selected[0].status === 'created' ? 'Создан': 'Готовится'}`}
          </p>
          <p className={`${styles.composition} text text_type_main-medium mt-15 mb-6`}>Состав:</p>
          <div className={`${styles['info-block']}`}>
            {selectedIngredient.map((infoIngredient) => {
              return (
                <div className={`${styles['info-element']} mb-4`} key={infoIngredient.id}>
                  <div className={styles.info}>
                    <img src={infoIngredient.image_mobile} className={styles.image} alt='Картинка ингридиента'/>
                    <p className={`text text_type_main-default ml-4`}>{`${infoIngredient.name} `}</p>
                  </div>
                  <div className={`${styles.info} mr-6`}>
                    <p className={`${styles['ingredient-price']} text text_type_main-default mr-2`}>{`${infoIngredient.type === 'bun' ? 2 : infoIngredient.iteration}x${infoIngredient.price}`}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              )
            })}
          </div>
          <div className={`${styles['info-element']} mt-10 mb-10`}>
            <p className={`${styles.date} text text_type_main-default text_color_inactive`}>{dateString}</p>
            <div className={styles.info}>
              <p className="text text_type_main-default mr-2">{`${orderPrice}`}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      )
    }
  }
  return null
}

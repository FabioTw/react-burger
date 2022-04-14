import { Modal } from "../Modal/Modal";
import { useHistory, useParams} from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import styles from './feed-details.module.css'
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const FeedDetails = () => {
  let orderPrice;
  let history = useHistory();
  let { id } = useParams();
  const selected = []
  const {selectedOrder} = useSelector(state => state.ws)
    if (selectedOrder._id === id) {
      selected.push(selectedOrder)
    }
  const { standartIngredients,} = useSelector(state => state.ingredients);
  const selectedIngredient = []
  let iterations = 0;
  selectedOrder.ingredients.map((element, index) => {
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

  const updateFeedOverlay = () => {

  }

  const back = e => {
    e.stopPropagation();
    updateFeedOverlay()
    history.goBack();
  };



  if (!selected[0]) return null;
  return (
    <Modal toggleModal={back}>
      <p className={`${styles.number} text text_type_main-medium`}>{`#${selectedOrder.number}`}</p>
      <p className={`${styles.name} text text_type_main-medium`}>{`${selectedOrder.name}`}</p>
      <p className={`${styles.status} text text_type_main-default mt-2`} 
      style={selectedOrder.status === 'done' ? {color: '#00CCCC'} : {color: '#F2F2F3'}}>
        {`${selectedOrder.status === 'done' ? 'Выполнен' : selectedOrder.status === 'created' ? 'Создан': 'Готовится'}`}
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
        <p className={`${styles.date} text text_type_main-default text_color_inactive`}>{selectedOrder.updatedAt}</p>
        <div className={styles.info}>
          <p className="text text_type_main-default mr-2">{`${orderPrice}`}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Modal>
  )
}

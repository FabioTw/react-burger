import PropTypes from "prop-types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import card from './card.module.css'

export const Card = ({id, img, price, text, updateIngredient, onClick}) => {

  const addIngrenientInList = () => {
    updateIngredient(id);
  }
// при клике на картинку открывает описание ингридиента, при клике на название или цену добавляет в заказ
  return (
    <div className={`${card.card} mt-6 mb-6 ml-3 mr-3`} >
      <img src={img} alt="ингредиент бургера" onClick={onClick} />
      <div className={`${card["card-info"]} mt-1 mb-1`} onClick={addIngrenientInList}>
        <p className="text text_type_digits-default mr-2">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${card["card-name"]} text text_type_main-default`} onClick={addIngrenientInList}>{text}</p>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  updateIngredient: PropTypes.func.isRequired, 
  onClick: PropTypes.func.isRequired
};

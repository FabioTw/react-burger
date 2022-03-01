import PropTypes from "prop-types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import card from './card.module.css'
import { useDrag } from "react-dnd";

export const Card = ({id, img, price, text, type, onClick}) => {

  const [{ opacity }, dragRef] = useDrag({
    type: type,
    item: { id , type},
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });
// при клике на картинку открывает описание ингридиента, при клике на название или цену добавляет в заказ
  return (
    <div className={`${card.card} mt-6 mb-6 ml-3 mr-3`} ref={dragRef} style={{opacity}}>
      <img src={img} alt="ингредиент бургера" onClick={onClick} />
      <div className={`${card["card-info"]} mt-1 mb-1`}>
        <p className="text text_type_digits-default mr-2">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${card["card-name"]} text text_type_main-default`}>{text}</p>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

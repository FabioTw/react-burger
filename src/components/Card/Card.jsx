import PropTypes from "prop-types";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import card from './card.module.css'
import { useDrag } from "react-dnd";
import {
  NavLink,
  useLocation,
} from "react-router-dom";
export const Card = ({id, img, price, text, type, onClick, counterList}) => {
  let location = useLocation();
  const [{ opacity }, dragRef] = useDrag({
    type: type,
    item: { id , type},
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });
  return (
    <NavLink to={{pathname: `/ingredients/${id}`, state: {background: location}}} className={`${card.card} mt-6 mb-6 ml-3 mr-3`} ref={dragRef} style={{opacity}} onClick={onClick}>
      {counterList.length > 0 &&  (
        <div className={`${card.counter}`}>
          <Counter count={counterList.length} size="default" />
        </div>
      )}
      <img src={img} alt="ингредиент бургера"/>
      <div className={`${card["card-info"]} mt-1 mb-1`}>
        <p className="text text_type_digits-default mr-2">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${card["card-name"]} text text_type_main-default`}>{text}</p>
    </NavLink>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  counterList: PropTypes.arrayOf(PropTypes.string),
};

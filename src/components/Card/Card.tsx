import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import card from './card.module.css'
import { useDrag } from "react-dnd";
import {
  NavLink,
  useLocation,
} from "react-router-dom";
import { FC } from "react";

interface ILocationState {
  from: {
    pathname: string;
  };
}

interface ICard {
  id: string;
  img: string;
  price: number;
  text: string;
  type: string;
  onClick: () => void;
  counterList: Array<string>;
}

export const Card: FC<ICard> = ({id, img, price, text, type, onClick, counterList}) => {
  let location = useLocation<ILocationState>();
  const [{ opacity }, dragRef] = useDrag({
    type: type,
    item: { id , type},
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <NavLink to={{pathname: `/react-burger/ingredients/${id}`, state: {background: location}}} className={`${card.card} mt-6 mb-6 ml-3 mr-3`} ref={dragRef} style={{opacity}} onClick={onClick}>
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

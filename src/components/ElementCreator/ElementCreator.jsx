import PropTypes from "prop-types";
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import elementCreator from "./element-creator.module.css";
import { ingredientsPropType } from "../../utils/propTypes";
import { useDrag } from "react-dnd";

export const ElementCreator = ({ array, _id, isTop, onRemoveItem}) => {
  const correct = [];
  //сдесь осуществляется поиск элемента из массива, состоящего только из _id в основном массиве где хранится полностью обьект со всеми параметрами
  //чтобы выбрать нужный элемент, и в массив correct передается не только id элемента а также другая информация по типу имени, цены, картинки и тд

  console.log(correct)
  // const [{ opacity }, dragRef] = useDrag({
  //   type: item.type,
  //   item: {item},
  //   collect: monitor => ({
  //     opacity: monitor.isDragging() ? 0.5 : 1
  //   })
  // });

  array.forEach((item) => {
    if (item._id === _id) {
      correct.push(item);
    }
  });
  return correct.map((item) => {
    if (item.type === "bun") {
      return (
        <div key={item._id}>
          <ConstructorElement
            type={isTop ? 'top' : 'bottom'}
            isLocked={true}
            text={isTop ? `${item.name} (верх)`: `${item.name} (низ)`}
            price={item.price}
            thumbnail={item.image}
          />
        </div>
      );
    } else {
      return  (
        <div key={item._id} className={`${elementCreator.filling} mb-2 mt-2`}>
          <DragIcon type="primary" />
          <div className={elementCreator.element}>
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
              handleClose={() => onRemoveItem(item._id)}
            />
          </div>
        </div>
      );
    }
  });
};

ElementCreator.propTypes = {
  array: ingredientsPropType,
  _id: PropTypes.string,
  isTop: PropTypes.bool,
  onRemoveItem: PropTypes.func,
};

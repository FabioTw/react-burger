import PropTypes from "prop-types";
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import elementCreator from "./element-creator.module.css";
import { ingredientsPropType } from "../../utils/propTypes";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";

export const ElementCreator = ({ array, _id, isTop, onRemoveItem, index, moveCard}) => {
  const correct = [];
  //сдесь осуществляется поиск элемента из массива, состоящего только из _id в основном массиве где хранится полностью обьект со всеми параметрами
  //чтобы выбрать нужный элемент, и в массив correct передается не только id элемента а также другая информация по типу имени, цены, картинки и тд
  const ref = useRef(null);
  array.forEach((item) => {
    if (item._id === _id) {
      correct.push(item);
    }
  });

  const [, dropDragableItem] = useDrop({
    accept: 'ingredients',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      } 
      item.index = hoverIndex;
      moveCard(dragIndex, hoverIndex);
  }})


  const [, pickDragableItem] = useDrag({
    type: 'ingredients',
    item: { _id , index},
  })

  pickDragableItem(dropDragableItem(ref));

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
        <div key={item._id} className={`${elementCreator.filling} mb-2 mt-2`} ref={ref}>
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
  index: PropTypes.number,
  moveCard: PropTypes.func,
};

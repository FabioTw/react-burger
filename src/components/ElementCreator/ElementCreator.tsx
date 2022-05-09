import PropTypes from "prop-types";
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import elementCreator from "./element-creator.module.css";
import { TIngredients } from "../../types/types";
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { FC, useRef } from "react";

interface IElementCreator {
  array: Array<TIngredients>;
  _id?: string;
  isTop?: boolean;
  onRemoveItem?: ((id:string) => void);
  index?: number;
  moveCard?: ((id: number, index: number) => void);
}

export const ElementCreator: FC<IElementCreator> = ({ array, _id, isTop, onRemoveItem, index, moveCard}) => {
  const correct: Array<TIngredients> = [];
  //сдесь осуществляется поиск элемента из массива, состоящего только из _id в основном массиве где хранится полностью обьект со всеми параметрами
  //чтобы выбрать нужный элемент, и в массив correct передается не только id элемента а также другая информация по типу имени, цены, картинки и тд
  const ref = useRef<HTMLDivElement>(null);
  array.forEach((item) => {
    if (item._id === _id) {
      correct.push(item);
    }
  });

  const [, dropDragableItem] = useDrop({
    accept: 'ingredients',
    drop(item: {_id:number; index:number;}, monitor: DropTargetMonitor<{_id: string; index: number;}, unknown>){
      if (item) {
        setTimeout(() => {   
          moveCard?.(item.index, index!);
          item.index = index!;
        });
      }
    },

  })

  const [{opacity}, pickDragableItem] = useDrag({
    type: 'ingredients',
    item: { _id , index},
    collect: (monitor:DragSourceMonitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  pickDragableItem(dropDragableItem(ref));

  return <>
    {correct.map((item) => {
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
          <div key={item._id} className={`${elementCreator.filling} mb-2 mt-2`} ref={ref} style={{opacity}}>
            <DragIcon type="primary" />
            <div className={elementCreator.element}>
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => onRemoveItem?.(item._id)}
              />
            </div>
          </div>
        );
      }
    })}
  </>;
};


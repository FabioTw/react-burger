import { Card } from "../Card/Card";
import { TCardIngredient, TIngredients } from "../../types/types";
import cardList from "./card-list.module.css" 
import { FC } from "react";

interface ICArdList {
  data: TCardIngredient;
  showIngredientDetailsModal: (item: TIngredients)=>void
}

export const CardList: FC<ICArdList> = ({ data, showIngredientDetailsModal }) => {
  return  (
    <>
      <div id={data.array.length>0 ? data.array[0].type : undefined} className="text text_type_main-medium mb-6">
        <p> 
          {data.name}
        </p>
        <div className={`${cardList["card-block"]} mb-4`}>
          {data.array.map((item) => {
            const result: Array<string> = []
            data.selected.forEach(element => {
              if (item._id === element) {result.push(element)}
            });
            return (
              <Card 
                key={item._id} 
                id={item._id} 
                img={item.image} 
                price={item.price} 
                text={item.name} 
                type={item.type}
                onClick={()=> showIngredientDetailsModal(item)}
                counterList={result} 
              />
            )
            })}
        </div>
      </div>
    </>
  )
};

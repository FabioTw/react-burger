import React, { FC } from "react";
import { Tabs } from "../Tabs/Tabs";
import { CardList } from "../CardList/CardList";
import burgerIngredients from "./burger-ingredients.module.css";
import { useSelector } from "../../services/hooks/hooks";
import { TCardIngredient, TIngredients } from "../../types/types";

interface IBurgerIngredients {
  showIngredientDetailsModal: () => void;
}

export const BurgerIngredients: FC<IBurgerIngredients> = ({showIngredientDetailsModal}) => {
  const { standartIngredients, constructorIngredients, selectedBun} = useSelector(state => state.ingredients);
  const [activeTab, setTab] = React.useState<string>('one')
  const bun: TCardIngredient = {name:'Булки', array:[], selected:[]}
  const sauce: TCardIngredient = {name:'Соусы', array:[], selected:[]}
  const main: TCardIngredient = {name:'Начинки', array:[], selected:[]}

  React.useEffect(()=>{
    if (standartIngredients[0] !== undefined) {
      let options = {
        root: document.querySelector(`.${burgerIngredients["burger-ingredients"]}`),
        rootMargin: '0px 0px -500px 0px',
        threshold: 0
      }
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting ) {
            entry.target.id === 'bun' ? 
              setTab('one') : 
              entry.target.id === 'sauce'? 
              setTab('two') : 
              setTab('three');
          }
        })
      }, options)
        const scrollSections: (HTMLElement | null)[] = [document.getElementById('bun'), document.getElementById('sauce'), document.getElementById('main')]
        scrollSections.forEach((section) => observer.observe(section!))
    }
  },[standartIngredients])

  bun.selected[0] = selectedBun
  standartIngredients.forEach((item) => {
    const type: string = item.type
    if (item.type === 'bun') {
      bun.array.push(item);
    } else if (item.type === 'sauce') {
      sauce.array.push(item);
    } else if (item.type === 'main') {
      main.array.push(item);
    } 
    constructorIngredients.forEach((element) => {
      if (item._id === element.id) {
       if (type==='sauce') {
          sauce.selected.push(element.id)
        } else {
          main.selected.push(element.id)
        } 
      } 
      })
  });
  return (
    <section className={`${burgerIngredients["burger-ingredients"]} mr-10`}>
      <p className="text text_type_main-large mt-10 mb-5">
        Соберите бургер
      </p>
      <Tabs current={activeTab} setCurrent={setTab}/>
      <div className={burgerIngredients.ingredients}>
          <CardList data={bun} showIngredientDetailsModal={showIngredientDetailsModal} />
          <CardList data={sauce} showIngredientDetailsModal={showIngredientDetailsModal}  />
          <CardList data={main} showIngredientDetailsModal={showIngredientDetailsModal} />
      </div>
    </section>
  );
};

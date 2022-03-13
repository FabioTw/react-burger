import React from "react";
import PropTypes from "prop-types";
import { Tabs } from "../Tabs/Tabs";
import { CardList } from "../CardList/CardList";
import burgerIngredients from "./burger-ingredients.module.css";
import { useSelector } from "react-redux";

export const BurgerIngredients = ({showIngredientDetailsModal}) => {
  const { standartIngredients, constructorIngredients, selectedBun} = useSelector(state => state.ingredients);
  const [activeTab, setTab] = React.useState('one')
  const bun = {name:'Булки', array:[], selected:[]}
  const sauce = {name:'Соусы', array:[], selected:[]}
  const main = {name:'Начинки', array:[], selected:[]}

  React.useEffect(()=>{
    function scroll() {
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
        const scrollSections = [document.getElementById('bun'), document.getElementById('sauce'), document.getElementById('main')]
        scrollSections.forEach((section) => observer.observe(section))
    }
    setTimeout(scroll, 1000)
  },[])

  bun.selected[0] = selectedBun
  standartIngredients.forEach((item) => {
    const type = item.type
    if (item.type === 'bun') {
      bun.array.push(item);
    } else if (item.type === 'sauce') {
      sauce.array.push(item);
    } else if (item.type === 'main') {
      main.array.push(item);
    } 
    constructorIngredients.forEach((element) => {
      if (item._id === element) {
       if (type==='sauce') {
          sauce.selected.push(element)
        } else {
          main.selected.push(element)
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

BurgerIngredients.propTypes = {
  showIngredientDetailsModal: PropTypes.func.isRequired
}

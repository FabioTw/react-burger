import React, { FC } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import tabs from './tabs.module.css'

interface ITabs {
  current: string;
  setCurrent: (current:string) => void;
}

export const Tabs: FC<ITabs> = ({current,setCurrent}) => {
  return (
    <div className={`${tabs.tabs} mb-10`}>
      <a href="#bun">
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
      </a>
      <a href="#sauce">
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
      </a>
      <a href="#main">
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </a>
    </div>
  );
};

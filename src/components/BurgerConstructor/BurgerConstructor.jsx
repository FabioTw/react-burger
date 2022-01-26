import React from 'react';
import { DragIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import "./burger-constructor.css"
import './burger-list/burger-list.css'
import './ingredients-list/ingredients-list.css'

export const BurgerConstructor = () => {
  return <section className="burger-constructor">
    <div className='burger-list'>
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={require('./../../images/bun-02.svg').default}
      />
      <div className='ingredients-list'>
      <div style={{display:'flex', alignItems: 'center'}}>
        <div style={{marginRight: '8px'}}><DragIcon type="primary" /></div>
        <ConstructorElement
          text="Биокотлета из марсианской Магнолии"
          price={300}
          thumbnail={require('./../../images/meat-01.svg').default}
        />
      </div>
      <div style={{display:'flex', alignItems: 'center'}}>
        <div style={{marginRight: '8px'}}><DragIcon type="primary" /></div>
        <ConstructorElement
          text="Биокотлета из марсианской Магнолии"
          price={300}
          thumbnail={require('./../../images/meat-01.svg').default}
        />
      </div>
      <div style={{display:'flex', alignItems: 'center'}}>
        <div style={{marginRight: '8px'}}><DragIcon type="primary" /></div>
        <ConstructorElement
          text="Биокотлета из марсианской Магнолии"
          price={300}
          thumbnail={require('./../../images/meat-01.svg').default}
        />
      </div>
      <div style={{display:'flex', alignItems: 'center'}}>
        <div style={{marginRight: '8px'}}><DragIcon type="primary" /></div>
        <ConstructorElement
          text="Биокотлета из марсианской Магнолии"
          price={300}
          thumbnail={require('./../../images/meat-01.svg').default}
        />
      </div>
      <div style={{display:'flex', alignItems: 'center'}}>
        <div style={{marginRight: '8px'}}><DragIcon type="primary" /></div>
        <ConstructorElement
          text="Биокотлета из марсианской Магнолии"
          price={300}
          thumbnail={require('./../../images/meat-01.svg').default}
        />
      </div>
      <div style={{display:'flex', alignItems: 'center'}}>
        <div style={{marginRight: '8px'}}><DragIcon type="primary" /></div>
        <ConstructorElement
          text="Биокотлета из марсианской Магнолии"
          price={300}
          thumbnail={require('./../../images/meat-01.svg').default}
        />
      </div>
      <div style={{display:'flex', alignItems: 'center'}}>
        <div style={{marginRight: '8px'}}><DragIcon type="primary" /></div>
        <ConstructorElement
          text="Биокотлета из марсианской Магнолии"
          price={300}
          thumbnail={require('./../../images/meat-01.svg').default}
        />
      </div>
      <div style={{display:'flex', alignItems: 'center'}}>
        <div style={{marginRight: '8px'}}><DragIcon type="primary" /></div>
        <ConstructorElement
          text="Биокотлета из марсианской Магнолии"
          price={300}
          thumbnail={require('./../../images/meat-01.svg').default}
        />
      </div>
      <div style={{display:'flex', alignItems: 'center'}}>
        <div style={{marginRight: '8px'}}><DragIcon type="primary" /></div>
        <ConstructorElement
          text="Биокотлета из марсианской Магнолии"
          price={300}
          thumbnail={require('./../../images/meat-01.svg').default}
        />
      </div>
      <div style={{display:'flex', alignItems: 'center'}}>
        <div style={{marginRight: '8px'}}><DragIcon type="primary" /></div>
        <ConstructorElement
          text="Биокотлета из марсианской Магнолии"
          price={300}
          thumbnail={require('./../../images/meat-01.svg').default}
        />
      </div>
      <div style={{display:'flex', alignItems: 'center'}}>
        <div style={{marginRight: '8px'}}><DragIcon type="primary" /></div>
        <ConstructorElement
          text="Биокотлета из марсианской Магнолии"
          price={300}
          thumbnail={require('./../../images/meat-01.svg').default}
        />
      </div></div>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail={require('./../../images/bun-02.svg').default}
      />
    </div>
    <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
      <p style={{marginRight: '8px'}} className="text text_type_digits-medium">890</p>
      <img style={{marginRight: '40px'}} src={require("./../../images/Subtract.svg").default} alt="иконка денег" />
      <Button type="primary" size="medium">Оформить заказ</Button>
    </div>
  </section>
}
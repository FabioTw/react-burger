import { useSelector } from 'react-redux';
import styles from './stats-feed.module.css'
import { v4 as uuidv4 } from 'uuid'

export const StatsFeed = () => {
  const { standartIngredients, constructorIngredients, selectedBun, constructorKeys } = useSelector(state => state.ingredients);
  const { total, totalToday, orders, } = useSelector(state => state.ws);
  const dones = []
  const inWorks = []
  orders.forEach(element => {
    if(element.status === 'done') {
      if (dones.length <= 11) {dones.push(element.number)}
    }
    if(element.status === ('pending' || 'created')) {
      if (inWorks.length <= 11) {inWorks.push(element.number)}
    }
  })
  return (
    <div className={`${styles['stats-feed']} ml-15`}>
      <div className={`${styles['orders-board']}`}>
        <div className={`${styles['orders-list']}`}>
          <p className="text text_type_main-medium mb-6 mr-9">Готовы:</p>
          <div className={`${styles['orders-in-work']}`}>
            {dones.map(element => <p key={uuidv4()} className="text text_type_digits-default">{element}</p> )}
          </div>
        </div>
        <div>
        <div className={`${styles['orders-list']}`}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <div className={`${styles['orders-done']}`}>
            {inWorks.map(element => <p key={uuidv4()} className="text text_type_digits-default">{element}</p> )}
          </div>
        </div>
        </div>
      </div>
      <div>
        <p className="text text_type_main-medium mt-15">Выполнено за все время:</p>
        <p className={`${styles['big-digits']} text text_type_digits-large`}>{total}</p>
      </div>
      <div>
        <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
        <p className={`${styles['big-digits']} text text_type_digits-large`}>{totalToday}</p>
      </div>
    </div>
  )
}

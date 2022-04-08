
import { useSelector } from 'react-redux';
import styles from './stats-feed.module.css'

export const StatsFeed = () => {
  const { standartIngredients, constructorIngredients, selectedBun, constructorKeys } = useSelector(state => state.ingredients);
  const { total, totalToday, orders, } = useSelector(state => state.ws);
  return (
    <div className={`${styles['stats-feed']} ml-15`}>
      <div className={`${styles['orders-board']}`}>
        <div className={`${styles['orders-list']}`}>
          <p className="text text_type_main-medium mb-6 mr-9">Готовы:</p>
          <div className={`${styles['orders-in-work']}`}>
            <p className="text text_type_digits-default">123456</p>
            {orders.forEach(element => {
              if(element.status === 'done'){
                return (<p className="text text_type_digits-default">{element._id}</p>)
              }
            })}
          </div>
        </div>
        <div>
        <div className={`${styles['orders-list']}`}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <div className={`${styles['orders-done']}`}>
            <p className="text text_type_digits-default">123456</p>
            <p className="text text_type_digits-default">123456</p>
            <p className="text text_type_digits-default">123456</p>
            <p className="text text_type_digits-default">123456</p>
            <p className="text text_type_digits-default">123456</p>
            <p className="text text_type_digits-default">123456</p>
            <p className="text text_type_digits-default">123456</p>
            <p className="text text_type_digits-default">123456</p>
            <p className="text text_type_digits-default">123456</p>
            <p className="text text_type_digits-default">123456</p>
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
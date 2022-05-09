
import { FC } from "react";
import { useSelector } from "../../services/hooks/hooks";
import { OrderBlock } from "../OrderBlock/OrderBlock";
import styles from './orders-feed.module.css'

interface IOrdersFeed { 
  toggleFeedOverlay: () => void;
}

export const OrdersFeed: FC<IOrdersFeed> = ({toggleFeedOverlay}) => {
  const {orders, } = useSelector(state => state.ws);
  let status: boolean = false
  return (
    <div className={`${styles.orders}`}>
      {orders.map((element)=> {
        return ( <OrderBlock 
        key={element._id} 
        element={element} 
        toggleFeedOverlay={toggleFeedOverlay} 
        pathname={`/feed/${element._id}`} 
        width={'584px'}
        height={'214px'} 
        status={status}
        /> )
      })}
    </div>
  )
}

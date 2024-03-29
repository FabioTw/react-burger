import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

export const NotFound404: FC = () => {
  return (
    <div className={styles.field}>
      <p className="text text_type_main-default mt-20 mb-4">
        Ошибка 404 
      </p>
      <p className="text text_type_main-default mb-4">
        Cтраница не найдена
      </p>
      <Link to='/react-burger/' className={styles.link}>Перейти в начало</Link>
    </div>
  );
}; 
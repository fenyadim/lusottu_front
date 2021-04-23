import React from 'react';

import styles from './Error.module.scss';

const Error: React.FC = () => {
  return (
    <div className={styles.errorContainer}>
      <h3>Что-то пошло не так 😞</h3>
    </div>
  );
};

export default Error;

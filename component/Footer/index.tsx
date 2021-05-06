import React from 'react';

import { Filter, Pagination } from '..';

import styles from './Footer.module.scss';

const Footer: React.FC<{ quantityPages: number }> = ({ quantityPages }) => {
  return (
    <div className={styles.offer}>
      <Pagination quantityPages={quantityPages} />
      <Filter />
    </div>
  );
};

export default Footer;

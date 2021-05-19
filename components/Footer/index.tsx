import React from 'react';

import { Filter, Pagination } from '..';

import styles from './Footer.module.scss';

const Footer: React.FC<{ quantityPages: number }> = ({ quantityPages }) => {
  return (
    <footer className={styles.offer}>
      <Pagination quantityPages={quantityPages} />
      <Filter />
    </footer>
  );
};

export default Footer;

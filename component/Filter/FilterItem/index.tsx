import React from 'react';

import styles from './FilterItem.module.scss';

interface FilterItemProps {
  title: string;
}

const FilterItem: React.FC<FilterItemProps> = ({ children, title }) => {
  const [itemFilter, setItemFilter] = React.useState<boolean>(false);

  return (
    <div className={`${styles.itemOffer} ${itemFilter ? styles.active : styles.disable}`}>
      <div className={styles.itemHeader} onClick={() => setItemFilter(!itemFilter)}>
        <h3 className={styles.itemTitle}>{title}</h3>
      </div>
      <div className={`${styles.itemData} `}>{children}</div>
    </div>
  );
};

export default FilterItem;

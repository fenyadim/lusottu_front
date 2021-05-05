import React from 'react';

import styles from './FilterItem.module.scss';

interface FilterItemProps {
  title: string;
}

const FilterItem: React.FC<FilterItemProps> = ({ children, title }) => {
  const [itemFilter, setItemFilter] = React.useState<boolean>(false);

  return (
    <div className={styles.itemOffer}>
      <h3 className={styles.itemTitle} onClick={() => setItemFilter(!itemFilter)}>
        {title}
      </h3>
      <div className={`${styles.itemData} ${itemFilter ? styles.active : styles.disable}`}>
        {children}
      </div>
    </div>
  );
};

export default FilterItem;

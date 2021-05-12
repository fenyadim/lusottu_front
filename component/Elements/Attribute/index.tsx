import React from 'react';

import styles from './Attribute.module.scss';

const AttributeWrapper: React.FC<{ name: string; value: string | number; addition?: string }> = ({
  name,
  value,
  addition,
}) => {
  let linearStyle = '';
  if (name === 'Цена' || name === 'Объем' || name === 'Бренд') {
    linearStyle = styles.linearStyle;
  }
  return (
    <div
      className={`${styles.attribute} ${linearStyle}`}
      style={name === 'Цена' ? { marginTop: 40 + 'px' } : { marginTop: 0 }}>
      <h3 className={styles.nameAttr}>{name}:</h3>
      <p>{value ? `${value} ${addition ? addition : ''}` : ''}</p>
    </div>
  );
};

export default AttributeWrapper;

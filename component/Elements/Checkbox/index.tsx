import React from 'react';

import styles from './Checkbox.module.scss';

interface CheckboxProps {
  name: string;
  slug: string;
  isChecked: boolean;
  toggleCheckbox: ({ currentTarget }: React.MouseEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ name, slug, isChecked, toggleCheckbox }: CheckboxProps) => {
  console.log('CHECKBOX')
  return (
    <div className={styles.checkbox}>
      <input
        type="checkbox"
        name={name}
        value={slug}
        checked={isChecked}
        readOnly={true}
        id={`${slug}_checkbox`}
        onClick={toggleCheckbox}
      />
      <label htmlFor={`${slug}_checkbox`}>{name}</label>
    </div>
  );
};

export default Checkbox;

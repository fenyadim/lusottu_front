import React from 'react';
import styles from './Checkbox.module.scss';

interface CheckboxProps {
  name: string;
  slug: string;
  isChecked: boolean;
  onClickFunc: ({ currentTarget }: React.MouseEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ name, slug, isChecked, onClickFunc }: CheckboxProps) => {
  return (
    <div className={styles.checkbox}>
      <input
        type="checkbox"
        name={name}
        value={slug}
        defaultChecked={isChecked}
        id={`${slug}_checkbox`}
        onClick={onClickFunc}
      />
      <label htmlFor={`${slug}_checkbox`}>{name}</label>
    </div>
  );
};

export default Checkbox;

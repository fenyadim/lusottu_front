import React from 'react';

import styles from './TextInput.module.scss';

interface TextInputProps {
  type: string;
  name?: string;
  min?: number;
  max?: number;
  value: string;
  placeholder?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const TextInput: React.FC<TextInputProps> = ({
  type,
  name,
  value,
  setValue,
  placeholder,
  min,
  max,
}) => {
  return type === 'number' ? (
    <label className={styles.inputLabel}>
      {name}:
      <input
        type={type}
        name={name}
        value={value}
        min={min}
        max={max}
        placeholder={min ? String(min) : String(max)}
        onChange={(e) => {
          e && setValue(e.target.value);
        }}
      />
    </label>
  ) : (
    <input
      className={styles.input}
      type={type}
      value={value}
      id={type}
      placeholder={placeholder}
      onChange={(e) => {
        e && setValue(e.target.value);
      }}
    />
  );
};

export default TextInput;

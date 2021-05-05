import React from 'react';

interface CheckboxProps {
  name: string;
  slug: string;
  isChecked: boolean;
  onClickFunc: ({ currentTarget }: React.MouseEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ name, slug, isChecked, onClickFunc }: CheckboxProps) => {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          name={name}
          value={slug}
          defaultChecked={isChecked}
          onClick={onClickFunc}
        />
        {name}
      </label>
    </div>
  );
};

export default Checkbox;

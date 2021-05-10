import React from 'react';

const AttributeWrapper: React.FC<{ value: string | number }> = ({ value, children }) => {
  return <>{value ? children : ''}</>;
};

export default AttributeWrapper;

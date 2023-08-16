import React from 'react';

type IProps = {
  children: React.ReactNode;
};

const PaddingContainer = ({ children }: IProps) => {
  return <div className='w-full px-8 mx-auto max-w-7xl'>{children}</div>;
};

export default PaddingContainer;

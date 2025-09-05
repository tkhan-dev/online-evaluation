import React from 'react';

interface FormProps {
  children: React.ReactNode;
  navbar: React.ReactNode;
}

const Form: React.FC<FormProps> = ({children, navbar}) => {
  return (
    <div className="flex w-full relative overflow-y-auto c2">
      <div className="flex flex-col w-[75%] flex-shrink-0 ps-8 py-6">
        {children}
      </div>
      <div className="flex flex-col w-[25%] gap-y-4 text-base ps-6 py-6 sticky top-0 text-secondary-color overflow-y-auto hide-scrollbar pe-8">
        {navbar}
      </div>
    </div>
  );
};

export default Form;

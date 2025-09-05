import React from 'react';

interface DateInputProps {
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  className?: string;
}

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({value, placeholder, readOnly, onChange, className = '', name}, ref) => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setFullYear(minDate.getFullYear() - 35);
    // const maxDate = new Date(today);
    // maxDate.setFullYear(maxDate.getFullYear() - 16);
    const min = minDate.toISOString().split('T')[0];
    const max = today.toISOString().split('T')[0];

    return (
      <div className="relative flex items-center b2">
        <input
          ref={ref}
          id={`input-${name}`}
          type={'date'}
          value={value}
          placeholder={placeholder}
          readOnly={readOnly}
          onChange={onChange}
          min={min}
          max={max}
          className={`ui-base-input b2  ${className}`}
          name={name}
        />
      </div>
    );
  },
);

export default DateInput;

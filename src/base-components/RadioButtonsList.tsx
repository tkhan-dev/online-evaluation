import React from 'react';

type OptionType = {
  label: string;
  value: string;
};

type RadioButtonListProps = {
  name: string;
  value: string;
  options: OptionType[];
  onChange: (value: string) => void;
  readOnly?: boolean;
};

const RadioButtonList: React.FC<RadioButtonListProps> = ({
  name,
  value,
  options,
  onChange,
  readOnly = false,
}) => {
  return (
    <div className="flex gap-x-3 ui-radioButton-color gap-y-2 items-center  flex-wrap">
      {options.map(option => (
        <label
          key={option.value}
          className={`flex items-center gap-1 ${
            readOnly ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
          }`}
          >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            // onChange={() => onChange(option.value)}
            onChange={() => {
              if (!readOnly) onChange(option.value);
            }}
            disabled={readOnly} 
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioButtonList;

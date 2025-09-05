import React from 'react';
import Select from 'react-select';

interface OptionType {
  label: string;
  value: string | number;
}

interface SelectInputProps {
  options: OptionType[];
  placeholder?: string;
  value?: any;
  isClearable?: boolean;
  control?: any;
  name?: string;
  error?: string;
  readOnly?: boolean;
  onChange?: any;
  iconPrefix?: React.ReactNode;
  iconSuffix?: React.ReactNode;
  isMulti?: boolean;
  isSearchable?: boolean;
  hasBorder?: boolean;
  className?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  options,
  placeholder = 'Select an option',
  readOnly,
  hasBorder = false,
  className = '',
  onChange,
  name,
  isClearable,
  value,
}) => {
  return (
    <Select
      name={name}
      options={options}
      isSearchable={true}
      value={value}
      placeholder={placeholder}
      isClearable={!readOnly && !isClearable}
      styles={{
        control: (base: any, state: any) => ({
          ...base,
          backgroundColor: readOnly ? 'var(--input-disable-color)' : 'white',
          borderColor:
            !readOnly &&
            (state.isFocused || hasBorder ? 'var(--light-gray-color)' : 'white'),
          boxShadow: !readOnly && 'none',
          '&:hover': {
            borderColor: 'var(--primary-color)',
          },
          // cursor: readOnly ? 'not-allowed' : 'default',
        }),
        menu: (base: any) => ({
          ...base,
          zIndex: 10,
        }),
      }}
      isDisabled={readOnly}
      classNamePrefix="react-select"
      className={`w-full b2 ${className}`}
      onChange={onChange}
      menuPosition="fixed"
      id={`container-${name}`}
      inputId={`input-${name}`}
    />
  );
};

export default SelectInput;

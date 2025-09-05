import React from 'react';

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  readOnly?: boolean;
};

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  readOnly = false,
}) => {
  return (
    <label
      className={`flex items-center gap-1 ${
        readOnly ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      }`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={e => {
          if (!readOnly) onChange(e.target.checked);
        }}
        disabled={readOnly}
      />
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;

import React from 'react';
import {UseFormRegister} from 'react-hook-form';

interface TextInputProps {
  type?: string;
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  maxLength?: number;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  iconPrefix?: React.ReactNode;
  iconSuffix?: React.ReactNode;
  register?: UseFormRegister<any>;
  name?: string;
  className?: string;
  max?: string | number;
  min?: number | string;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      type = 'text',
      value,
      placeholder,
      readOnly,
      maxLength,
      onClick,
      onChange,
      onKeyDown,
      iconPrefix,
      iconSuffix,
      className = '',
      max,
      min,
      ...rest
    },
    ref,
  ) => {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (max && type === 'number') {
        let next = e.target.value;

        if (!/^\d*$/.test(next)) return;

        if (next.length > 1) {
          next = next.replace(/^0+/, '') || '0';
        }

        const nextValue = Number(next);
        if (next !== '' && nextValue > Number(max)) {
          next = String(max);
        }

        if (next !== e.target.value) {
          e.target.value = next;
        }
      }

      onChange?.(e); // call the prop onChange only
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
      if (type === 'number') {
        const invalidKeys = ['e', 'E', '+', '-', '.'];
        if (invalidKeys.includes(e.key)) {
          e.preventDefault();
        }
      }

      onKeyDown?.(e);
    }

    return (
      <div className="relative w-full">
        {/* Prefix Icon/Text */}
        {iconPrefix && (
          <div className="absolute left-2 top-1/2 -translate-y-1/2  pointer-events-none text-sm ">
            {iconPrefix}
          </div>
        )}

        {/* Input */}
        <input
          id={`input-${rest.name}`}
          onWheel={e => e.currentTarget.blur()}
          ref={ref}
          type={type}
          value={value}
          placeholder={placeholder}
          readOnly={readOnly}
          maxLength={maxLength}
          onClick={onClick}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          inputMode={type === 'number' ? 'numeric' : undefined}
          pattern={type === 'number' ? '\\d*' : undefined}
          min={min}
          max={max}
          className={`ui-base-input b2  ${
            iconPrefix ? 'pl-[50px]' : 'pl-3'
          } ${iconSuffix ? 'pr-10' : 'pr-3'} ${className}`}
          {...rest}
        />

        {/* Suffix Icon */}
        {iconSuffix && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            {iconSuffix}
          </div>
        )}
      </div>
    );
  },
);

export default TextInput;

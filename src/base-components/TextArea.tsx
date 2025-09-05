import React from 'react';

interface TextareaInputProps {
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  maxLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  register?: any;
  name?: string;
  className?: string;
}

const TextareaInput = React.forwardRef<HTMLTextAreaElement, TextareaInputProps>(
  (
    {
      value,
      placeholder,
      readOnly,
      maxLength,
      onChange,
      register,
      name,
      className = '',
    },
    ref,
  ) => {
    return (
      <textarea
        ref={ref}
        {...(register ? register(name) : {})}
        placeholder={placeholder}
        readOnly={readOnly}
        maxLength={maxLength}
        onChange={onChange}
        value={register ? undefined : value}
        className={`resize-y ui-base-input ${className}`}
        style={{height: 100}}
        rows={4}
      />
    );
  },
);

export default TextareaInput;

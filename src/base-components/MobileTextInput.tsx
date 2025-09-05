import React from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
// import {CountryCode, getExampleNumber} from 'libphonenumber-js';
// import examples from 'libphonenumber-js/examples.mobile.json';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

interface MobileTextInputProps {
  value?: string;
  onChange: (value?: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  isIndiaNumber?: boolean;
  withSearchIcon?: boolean;
  onSearch?: () => void;
}

const CustomInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {country?: string}
>(({country, ...props}, ref) => {

  return (
    <input
      ref={ref}
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      maxLength={20}
      {...props}
      className={`${props.className ?? ''} ${
        !props.readOnly && !props.disabled ? 'pr-12' : ''
      }`}
    />
  );
});
CustomInput.displayName = 'CustomInput';

const MobileTextInput: React.FC<MobileTextInputProps> = ({
  value,
  onChange,
  placeholder,
  readOnly = false,
  isIndiaNumber = false,
  withSearchIcon = false,
  onSearch,
}) => {
  const handleChange = (val?: string) => {
    onChange(val || '');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (withSearchIcon && e.key === 'Enter' && !readOnly && value?.trim()) {
      onSearch?.();
    }
  };

  return (
    <div className="relative w-full">
      <PhoneInput
        international
        defaultCountry="IN"
        value={value}
        onChange={handleChange}
        readOnly={readOnly}
        countryCallingCodeEditable={false}
        limitMaxLength={false}
        inputComponent={CustomInput}
        countries={isIndiaNumber ? ['IN'] : undefined}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={
          withSearchIcon
            ? 'rounded-md bg-gray-100 py-2 pl-4 pr-12 w-full border border-transparent hover:border-black focus:border-black focus:outline-none transition-all duration-200'
            : `ui-base-mobile-input ${
                readOnly ? 'ui-base-mobile-input-read-only' : ''
              }`
        }
      />

      {withSearchIcon && !readOnly && (
        <span
          role="button"
          tabIndex={0}
          onClick={() => {
            if (!readOnly && value?.trim()) onSearch?.();
          }}
          onKeyPress={e => {
            if (
              (e.key === 'Enter' || e.key === ' ') &&
              !readOnly &&
              value?.trim()
            ) {
              onSearch?.();
            }
          }}
          className={`absolute right-4 top-1/2 -translate-y-1/2 flex items-center select-none ${
            readOnly || !value?.trim()
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 cursor-pointer'
          }`}
          aria-label="Search">
          <FontAwesomeIcon icon={faSearch} className="w-5 h-4" />
        </span>
      )}
    </div>
  );
};

export default MobileTextInput;

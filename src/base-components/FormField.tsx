import React, {useRef} from 'react';
import {Controller} from 'react-hook-form';
import TextInput from './TextInput';
import TextArea from './TextArea';
import SelectInput from './SelectInput';
import MobileTextInput from './MobileTextInput';
import RadioButtonList from './RadioButtonsList';
import OTPInput from './OTPTextInput';
// import FileUpload from './FileUploadButton';
import Checkbox from './Checkbox';
import DateInput from './DateInput';
import '../base-components/FormField.scss';


interface OptionType {
  label: string;
  value: string;
}

interface FormFieldProps {
  label?: string;
  fieldLabel?: string;
  name: string;
  type?:
    | 'input'
    | 'textarea'
    | 'select'
    | 'mobile'
    | 'tel'
    | 'radio'
    | 'otp'
    | 'file'
    | 'checkbox'
    | 'aadhaar'
    | 'year'
    | 'date';
  inputType?: React.HTMLInputTypeAttribute;
  register?: any;
  control?: any;
  options?: OptionType[];
  error?: string;
  placeholder?: string;
  readOnly?: boolean;
  maxLength?: number;
  isEdit?: boolean;
  isSearchable?: boolean;
  isRequired?: boolean;
  documentType?: string | null;
  // file?: File | null | StudentDocumentModel;
  iconPrefix?: React.ReactNode;
  iconSuffix?: React.ReactNode;
  value?: any;
  className?: string;
  hasBorder?: boolean;
  onChange?: (val: any) => void;
  onClick?: () => void;
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  max?: number | string;
  isClearable?: boolean;
  isIndiaNumber?: boolean;
}

function FormField({
  label,
  fieldLabel,
  name,
  type = 'input',
  inputType,
  register,
  control,
  options = [],
  error,
  placeholder,
  readOnly = false,
  maxLength = 500,
  isSearchable = false,
  isRequired = false,
  iconPrefix,
  iconSuffix,
  value,
  className,
  onChange,
  onClick,
  onKeyDown,
  hasBorder = false,
  documentType = null,
  isClearable = false,
  max,
  isIndiaNumber,
}: FormFieldProps) {
  const aadhaarInputRef = useRef<HTMLInputElement>(null);

  const formatAadhaar = (value: string): string => {
    if (!value) return '';
    const cleaned = value.replace(/\D/g, '').slice(0, 12);
    return cleaned.replace(/(\d{4})/g, '$1 ').trim();
  };

  const parseAadhaar = (formattedValue: string): string => {
    return formattedValue.replace(/\s/g, '');
  };

  function renderAadhaarInput() {
    if (control) {
      return (
        <Controller
          control={control}
          name={name}
          render={({field}) => {
            const displayValue = formatAadhaar(field.value || '');

            return (
              <TextInput
                ref={el => {
                  field.ref(el);
                  aadhaarInputRef.current = el;
                }}
                value={displayValue}
                onChange={e => {
                  const prevValue = field.value || '';
                  const rawValue = parseAadhaar(e.target.value);

                  field.onChange(rawValue);

                  requestAnimationFrame(() => {
                    if (aadhaarInputRef.current) {
                      const cursorPosition =
                        aadhaarInputRef.current.selectionStart || 0;
                      let newCursor = cursorPosition;

                      const addedChar = rawValue.length > prevValue.length;
                      if (
                        addedChar &&
                        (cursorPosition === 4 || cursorPosition === 9)
                      ) {
                        newCursor = cursorPosition + 1;
                      }

                      aadhaarInputRef.current.setSelectionRange(
                        newCursor,
                        newCursor,
                      );
                    }
                  });

                  if (onChange) onChange(rawValue);
                }}
                iconPrefix={iconPrefix}
                iconSuffix={iconSuffix}
                placeholder={placeholder}
                readOnly={readOnly}
                maxLength={14}
                className={className}
                onClick={onClick}
                onKeyDown={onKeyDown}
                type="text"
              />
            );
          }}
        />
      );
    }

    const displayValue = formatAadhaar(value || '');
    return (
      <TextInput
        ref={aadhaarInputRef}
        value={displayValue}
        onChange={e => {
          const prevValue = value || '';
          const rawValue = parseAadhaar(e.target.value);

          if (onChange) onChange(rawValue);

          requestAnimationFrame(() => {
            if (aadhaarInputRef.current) {
              const cursorPosition =
                aadhaarInputRef.current.selectionStart || 0;
              let newCursor = cursorPosition;

              const addedChar = rawValue.length > prevValue.length;
              if (addedChar && (cursorPosition === 4 || cursorPosition === 9)) {
                newCursor = cursorPosition + 1;
              }

              aadhaarInputRef.current.setSelectionRange(newCursor, newCursor);
            }
          });
        }}
        iconPrefix={iconPrefix}
        iconSuffix={iconSuffix}
        placeholder={placeholder}
        readOnly={readOnly}
        maxLength={14}
        className={className}
        onClick={onClick}
        onKeyDown={onKeyDown}
        type="text"
      />
    );
  }

  function renderMobile() {
    if (control) {
      return (
        <Controller
          control={control}
          name={name}
          render={({field}) => (
            <MobileTextInput
              value={field.value || ''}
              onChange={field.onChange}
              readOnly={readOnly}
              isIndiaNumber={isIndiaNumber}
            />
          )}
        />
      );
    }
    return (
      <MobileTextInput
        value={value}
        onChange={value => onChange?.(value)}
        readOnly={readOnly}
        isIndiaNumber={isIndiaNumber}
      />
    );
  }

  function renderTextArea() {
    if (control) {
      return (
        <Controller
          control={control}
          name={name}
          render={({field}) => (
            <TextArea
              {...field}
              placeholder={placeholder}
              readOnly={readOnly}
              maxLength={maxLength}
              className="resize-none"
            />
          )}
        />
      );
    }

    return (
      <TextArea
        name={name}
        placeholder={placeholder}
        readOnly={readOnly}
        maxLength={maxLength}
        value={value}
        onChange={e => onChange?.(e.target.value)}
      />
    );
  }

  function renderSelect() {
    if (control) {
      return (
        <Controller
          name={name}
          control={control}
          render={({field}) => {
            return (
              <SelectInput
                {...field}
                options={options}
                isClearable={!readOnly && isClearable}
                // isClearable={!readOnly}
                readOnly={readOnly}
                hasBorder={hasBorder}
                isSearchable={isSearchable}
                // isClearable={isClearable}
                placeholder={placeholder}
                value={
                  field.value
                    ? options.find(opt => opt.value === field.value)
                    : null
                }
                onChange={(selected: OptionType | null) => {
                  field.onChange(selected?.value || null); // Explicitly set to null when cleared
                  onChange?.(selected?.value || null);
                }}
              />
            );
          }}
        />
      );
    }

    return (
      <SelectInput
        isClearable={isClearable}
        hasBorder={hasBorder}
        options={options}
        isSearchable={isSearchable}
        placeholder={placeholder}
        value={value ? options.find(opt => opt.value === value) : null}
        onChange={(selected: OptionType | null) => {
          onChange?.(selected?.value || null);
        }}
      />
    );
  }

  // function renderYearPicker() {
  //   if (control) {
  //     return (
  //   <div>
  //     <Controller
  //       name={name}
  //       control={control}
  //       rules={{ required: isRequired }}
  //       render={({ field }) => (
  //         <DatePicker
  //           {...field}
  //           selected={field.value ? new Date(field.value, 0) : null}
  //           onChange={(date) => field.onChange(date?.getFullYear())}
  //           showYearPicker
  //           dateFormat="yyyy"
  //           placeholderText="Select Year"
  //            className="w-full px-3 py-2 border-rounded"
  //           readOnly={readOnly}
  //         />
  //       )}
  //     />
  //   </div>
  // );
  //   }
  // }

  function renderOTPInput() {
    if (control) {
      return (
        <Controller
          control={control}
          name={name}
          render={({field}) => (
            <OTPInput
              name={name}
              value={field.value || ''}
              onChange={field.onChange}
              length={6}
            />
          )}
        />
      );
    }
  }

  function renderDatePicker() {
    if (register) {
      return (
        <DateInput
          {...register(name)}
          className={className}
          placeholder={placeholder}
          readOnly={readOnly}
        />
      );
    }
    return (
      <DateInput
        className={className}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={e => onChange?.(e.target.value)}
        value={value}
      />
    );
  }

  function renderDefaultInput() {
    if (type === 'aadhaar') {
      return renderAadhaarInput();
    }

    if (register) {
      return (
        <TextInput
          {...register(name)}
          className={className}
          iconPrefix={iconPrefix}
          iconSuffix={iconSuffix}
          placeholder={placeholder}
          readOnly={readOnly}
          maxLength={maxLength}
          onClick={onClick}
          onKeyDown={onKeyDown}
          type={inputType}
          max={max}
        />
      );
    }
    return (
      <TextInput
        className={className}
        iconPrefix={iconPrefix}
        iconSuffix={iconSuffix}
        placeholder={placeholder}
        readOnly={readOnly}
        maxLength={maxLength}
        onClick={onClick}
        onKeyDown={onKeyDown}
        type={inputType}
        onChange={e => onChange?.(e.target.value)}
        value={value}
        max={max}
      />
    );
  }

  function renderRadio() {
    if (control) {
      return (
        <Controller
          name={name}
          control={control}
          render={({field}) => (
            <RadioButtonList
              name={name}
              value={field.value}
              options={options}
              onChange={field.onChange}
              readOnly={readOnly}
            />
          )}
        />
      );
    }
  }

  function renderCheckBox() {
    if (control) {
      return (
        <Controller
          name={name}
          control={control}
          render={({field}) => (
            <Checkbox
              checked={field.value}
              onChange={readOnly ? () => {} : field.onChange}
              label={fieldLabel ?? ''}
              readOnly={readOnly}
            />
          )}
        />
      );
    }
  }

  // function renderFileUpload() {
  //   return (
  //     <Controller
  //       name={name}
  //       control={control}
  //       render={({field: {onChange, value, name}}) => (
  //         <FileUpload
  //           name={name}
  //           file={value}
  //           onChange={readOnly ? () => {} : e => onChange?.(e)}
  //           readOnly={readOnly}
  //           documentType={documentType}
  //         />
  //       )}
  //     />
  //   );
  // }

  function renderContent() {
    switch (type) {
      case 'textarea':
        return renderTextArea();
      case 'select':
        return renderSelect();
      case 'mobile':
        return renderMobile();
      case 'radio':
        return renderRadio();
      case 'otp':
        return renderOTPInput();
      case 'checkbox':
        return renderCheckBox();
      // case 'file':
      //   return renderFileUpload();
      case 'aadhaar':
        return renderAadhaarInput();
      case 'date':
        return renderDatePicker();
      default:
        return renderDefaultInput();
    }
  }

  return (
    <div className="w-full">
      {label && (
        <label
          className={`block text-sm font-medium text-black mb-1 s2 ${
            readOnly ? 'text-opacity-50' : ''
          }`}>
          {label}
          {isRequired && (
            <span
              className={`text-red-600  ${readOnly ? 'text-opacity-50' : ''}`}>
              {' '}
              *
            </span>
          )}
        </label>
      )}
      {renderContent()}
      <p
        className={`text-sm mb-1 b2 transition-all duration-300 ${
          error ? 'text-red-500 visible' : 'invisible'
        }`}
        style={{minHeight: '1.42rem'}}>
        {error || ''}
      </p>
    </div>
  );
}

export default FormField;

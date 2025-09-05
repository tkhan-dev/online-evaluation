import React, {useRef, useEffect} from 'react';

interface OTPInputProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  length?: number;
}

const OTPInput: React.FC<OTPInputProps> = ({
  value,
  onChange,
  length = 6,
  name,
}) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, length);
  }, [length]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const val = e.target.value;

    if (!/^\d?$/.test(val)) return;

    let newOtp = value;
    if (newOtp.length !== length) {
      newOtp = newOtp.padEnd(length, ' ');
    }

    newOtp = newOtp.substring(0, index) + val + newOtp.substring(index + 1);
    const event = {
      target: {
        name,
        value: newOtp.trim(),
      },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);

    if (val && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData('text/plain')
      .replace(/\D/g, '')
      .slice(0, length);
    const event = {
      target: {
        name,
        value: pasteData,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
    inputsRef.current[length - 1]?.focus();
  };

  const displayValue = value.padEnd(length, ' ');

  return (
    <div className={`flex gap-4`}>
      {Array.from({length}).map((_, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={displayValue[index] === ' ' ? '' : displayValue[index]}
          ref={el => {
            inputsRef.current[index] = el;
          }}
          onChange={e => handleChange(e, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          onPaste={handlePaste}
          onClick={e => {
            const target = e.target as HTMLInputElement;
            target.select();
          }}
          className={`w-12 h-12 ui-base-input px-4`}
          placeholder="-"
        />
      ))}
    </div>
  );
};

export default OTPInput;

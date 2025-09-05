import React, {ButtonHTMLAttributes} from 'react';
import Spinner from './Spinner';
import './Button.scss';

type ButtonAppearance =
  | 'primary'
  | 'secondary'
  | 'outlined'
  | 'text'
  | 'danger'
  | 'danger-text'
  | 'none'
  | 'success'
  | 'default';

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (event:any) => void;
  appearance?: ButtonAppearance;
  isLoading?: boolean;
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  loadingText?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  onClick,
  appearance = 'primary',
  isLoading = false,
  className = '',
  type = 'button',
  loadingText,
}) => {
  return (
    <button
      className={`ui-button btn ${appearance} ${className}`}
      disabled={disabled || isLoading}
      type={type}
      onClick={onClick}>
      {isLoading ? <Spinner /> : children}
      {isLoading && <>&nbsp;&nbsp;{loadingText}</>}
    </button>
  );
};

export default Button;

// Example usage: Next and Previous buttons with 'text' appearance
export const PaginationControls: React.FC = () => {
  const handleNext = () => {
    console.log('Next clicked');
    // Add navigation logic here
  };

  const handlePrevious = () => {
    console.log('Previous clicked');
    // Add navigation logic here
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        marginTop: '16px',
      }}>
      <Button appearance="text" onClick={handlePrevious}>
        &larr; Previous
      </Button>
      <Button appearance="text" onClick={handleNext}>
        Next &rarr;
      </Button>
    </div>
  );
};

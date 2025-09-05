import React, { createContext, useContext, useState } from 'react';

interface SpinnerContextType {
  isLoading: boolean;
  showSpinner: () => void;
  hideSpinner: () => void;
  toggleSpinner: (state: boolean) => void;
}

const SpinnerContext = createContext<SpinnerContextType | undefined>(undefined);

export const SpinnerProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showSpinner = () => setIsLoading(true);
  const hideSpinner = () => setIsLoading(false);
  const toggleSpinner = (state: boolean) => setIsLoading(state);

  return (
    <SpinnerContext.Provider value={{ isLoading, showSpinner, hideSpinner, toggleSpinner }}>
      {children}
    </SpinnerContext.Provider>
  );
};

export const useSpinner = () => {
  const context = useContext(SpinnerContext);
  if (context === undefined) {
    throw new Error('useSpinner must be used within a SpinnerProvider');
  }
  return context;
};
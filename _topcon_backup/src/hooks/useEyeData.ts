import { useContext } from 'react';
import { EyeDataContext, EyeDataContextType } from '../context/EyeDataContext';

export function useEyeData(): EyeDataContextType {
  const context = useContext(EyeDataContext);
  if (!context) {
    throw new Error('useEyeData must be used within EyeDataProvider');
  }
  return context;
}

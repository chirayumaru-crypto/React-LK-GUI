import { useContext } from 'react';
import { SimulatorContext } from '../context/SimulatorContext';

export const useSimulator = () => {
  const context = useContext(SimulatorContext);
  if (!context) {
    throw new Error('useSimulator must be used within a SimulatorProvider');
  }
  return context;
};

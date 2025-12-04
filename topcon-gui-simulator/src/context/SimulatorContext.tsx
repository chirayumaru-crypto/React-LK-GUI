import React, { createContext, useReducer, ReactNode } from 'react';
import { SimulatorState, SimulatorAction } from '../types/simulator';

const initialState: SimulatorState = {
  rightEye: { s: 0.0, c: 0.0, a: 180, add: 0.0 },
  leftEye: { s: 0.0, c: 0.0, a: 180, add: 0.0 },
  pd: 64,
  occlusion: { rightEye: false, leftEye: false },
  testMode: 'bino',
};

const simulatorReducer = (state: SimulatorState, action: SimulatorAction): SimulatorState => {
  switch (action.type) {
    case 'SET_RIGHT_EYE':
      return { ...state, rightEye: action.payload };
    case 'SET_LEFT_EYE':
      return { ...state, leftEye: action.payload };
    case 'UPDATE_RIGHT_EYE_PARAM':
      return {
        ...state,
        rightEye: { ...state.rightEye, [action.payload.param]: action.payload.value },
      };
    case 'UPDATE_LEFT_EYE_PARAM':
      return {
        ...state,
        leftEye: { ...state.leftEye, [action.payload.param]: action.payload.value },
      };
    case 'SET_PD':
      return { ...state, pd: action.payload };
    case 'TOGGLE_OCCLUSION':
      return {
        ...state,
        occlusion: {
          ...state.occlusion,
          [action.payload]: !state.occlusion[action.payload],
        },
      };
    case 'SET_OCCLUSION':
      return { ...state, occlusion: action.payload };
    case 'SET_TEST_MODE':
      return { ...state, testMode: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

interface SimulatorContextType {
  state: SimulatorState;
  dispatch: React.Dispatch<SimulatorAction>;
}

export const SimulatorContext = createContext<SimulatorContextType | undefined>(undefined);

export const SimulatorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(simulatorReducer, initialState);

  return (
    <SimulatorContext.Provider value={{ state, dispatch }}>
      {children}
    </SimulatorContext.Provider>
  );
};

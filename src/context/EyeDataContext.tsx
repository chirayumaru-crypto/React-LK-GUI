import React, { createContext, useReducer, ReactNode } from 'react';
import { AppState, RefractionValue } from '../types';

const DEFAULT_REFRACTION: RefractionValue = {
  s: 0.0,
  c: 0.0,
  a: 180,
  add: 0.0,
};

const DEFAULT_STATE: AppState = {
  rightEye: DEFAULT_REFRACTION,
  leftEye: DEFAULT_REFRACTION,
  pd: 64,
  occlusion: {
    rightEye: false,
    leftEye: false,
  },
  testMode: 'bino',
};

export type AppAction =
  | { type: 'SET_RIGHT_EYE'; payload: RefractionValue }
  | { type: 'SET_LEFT_EYE'; payload: RefractionValue }
  | { type: 'UPDATE_RIGHT_EYE_PARAM'; param: keyof RefractionValue; value: number }
  | { type: 'UPDATE_LEFT_EYE_PARAM'; param: keyof RefractionValue; value: number }
  | { type: 'SET_PD'; payload: number }
  | { type: 'TOGGLE_RIGHT_EYE_OCCLUSION' }
  | { type: 'TOGGLE_LEFT_EYE_OCCLUSION' }
  | { type: 'SET_TEST_MODE'; payload: 'left-only' | 'right-only' | 'bino' }
  | { type: 'RESET' };

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_RIGHT_EYE':
      return { ...state, rightEye: action.payload };
    case 'SET_LEFT_EYE':
      return { ...state, leftEye: action.payload };
    case 'UPDATE_RIGHT_EYE_PARAM':
      return {
        ...state,
        rightEye: { ...state.rightEye, [action.param]: action.value },
      };
    case 'UPDATE_LEFT_EYE_PARAM':
      return {
        ...state,
        leftEye: { ...state.leftEye, [action.param]: action.value },
      };
    case 'SET_PD':
      return { ...state, pd: action.payload };
    case 'TOGGLE_RIGHT_EYE_OCCLUSION':
      return {
        ...state,
        occlusion: {
          ...state.occlusion,
          rightEye: !state.occlusion.rightEye,
        },
      };
    case 'TOGGLE_LEFT_EYE_OCCLUSION':
      return {
        ...state,
        occlusion: {
          ...state.occlusion,
          leftEye: !state.occlusion.leftEye,
        },
      };
    case 'SET_TEST_MODE':
      return { ...state, testMode: action.payload };
    case 'RESET':
      return DEFAULT_STATE;
    default:
      return state;
  }
}

export interface EyeDataContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

export const EyeDataContext = createContext<EyeDataContextType | undefined>(undefined);

interface EyeDataProviderProps {
  children: ReactNode;
}

export function EyeDataProvider({ children }: EyeDataProviderProps) {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

  return (
    <EyeDataContext.Provider value={{ state, dispatch }}>
      {children}
    </EyeDataContext.Provider>
  );
}

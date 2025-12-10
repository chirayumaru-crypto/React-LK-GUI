import React, { createContext, useReducer, ReactNode } from 'react';
import { AppState, RefractionValue, LogEntry, ChartType } from '../types';
import { getChartInfo } from '../utils/chartUtils';

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
  currentChart: 'landolt-c-500',
  logs: [],
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
  | { type: 'SET_CHART'; payload: ChartType }
  | { type: 'CLEAR_LOGS' }
  | { type: 'RESET' };

function createLogEntry(state: AppState): LogEntry {
  const formatLensValue = (value: number): string => {
    const formatted = value.toFixed(2);
    return value >= 0 ? `+${formatted}` : formatted;
  };

  const getOccluderState = () => {
    if (state.occlusion.rightEye && state.occlusion.leftEye) return 'Both';
    if (state.occlusion.rightEye) return 'Right';
    if (state.occlusion.leftEye) return 'Left';
    return 'None';
  };

  const chartInfo = getChartInfo(state.currentChart);

  return {
    timestamp: new Date().toISOString(),
    R_SPH: formatLensValue(state.rightEye.s),
    R_CYL: formatLensValue(state.rightEye.c),
    R_AXIS: state.rightEye.a.toString(),
    R_ADD: formatLensValue(state.rightEye.add),
    L_SPH: formatLensValue(state.leftEye.s),
    L_CYL: formatLensValue(state.leftEye.c),
    L_AXIS: state.leftEye.a.toString(),
    L_ADD: formatLensValue(state.leftEye.add),
    PD: state.pd.toFixed(1),
    Chart_Number: chartInfo.number.toString(),
    Occluder_State: getOccluderState(),
    Chart_Display: chartInfo.name,
    Speaker: '',
    Utterance_Text: '',
    Translation_in_En: '',
    Speaker_Intent: '',
    Detected_Language: '',
    Patient_Confidence_Score: 0,
    Hesitation_Markers: '',
    Requires_Verification: '',
  };
}

function reducer(state: AppState, action: AppAction): AppState {
  let newState: AppState;

  switch (action.type) {
    case 'SET_RIGHT_EYE':
      newState = { ...state, rightEye: action.payload };
      break;
    case 'SET_LEFT_EYE':
      newState = { ...state, leftEye: action.payload };
      break;
    case 'UPDATE_RIGHT_EYE_PARAM':
      newState = {
        ...state,
        rightEye: { ...state.rightEye, [action.param]: action.value },
      };
      break;
    case 'UPDATE_LEFT_EYE_PARAM':
      newState = {
        ...state,
        leftEye: { ...state.leftEye, [action.param]: action.value },
      };
      break;
    case 'SET_PD':
      newState = { ...state, pd: action.payload };
      break;
    case 'TOGGLE_RIGHT_EYE_OCCLUSION':
      newState = {
        ...state,
        occlusion: {
          ...state.occlusion,
          rightEye: !state.occlusion.rightEye,
        },
      };
      break;
    case 'TOGGLE_LEFT_EYE_OCCLUSION':
      newState = {
        ...state,
        occlusion: {
          ...state.occlusion,
          leftEye: !state.occlusion.leftEye,
        },
      };
      break;
    case 'SET_TEST_MODE':
      newState = { ...state, testMode: action.payload };
      break;
    case 'SET_CHART':
      newState = { ...state, currentChart: action.payload };
      break;
    case 'CLEAR_LOGS':
      return { ...state, logs: [] };
    case 'RESET':
      return { ...DEFAULT_STATE, logs: state.logs };
    default:
      return state;
  }

  // Log every state change
  const logEntry = createLogEntry(newState);
  return {
    ...newState,
    logs: [...newState.logs, logEntry],
  };
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

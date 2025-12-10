import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, INITIAL_REFRACTION, OperationMode, RefractionParam, MingSingLogEntry } from '../types';
import { getChartInfo } from '../utils/chartUtils';

const initialState: AppState = {
    eyes: {
        right: { ...INITIAL_REFRACTION },
        left: { ...INITIAL_REFRACTION },
    },
    pd: {
        right: 32.0,
        left: 32.0,
    },
    mode: 'CV',
    selectedChart: 'E',
    activeEye: 'BOTH',
    activeField: 'sph',
    occlusion: {
        right: false,
        left: false,
    },
    logs: [] // Initialize logs
};

type Action =
    | { type: 'SET_MODE'; payload: OperationMode }
    | { type: 'UPDATE_REFRACTION'; eye: 'right' | 'left'; param: keyof typeof INITIAL_REFRACTION; value: number }
    | { type: 'SET_CHART'; payload: string }
    | { type: 'SET_FIELD'; payload: RefractionParam }
    | { type: 'SET_SELECTION'; field: RefractionParam; eye: 'RIGHT' | 'LEFT' | 'BOTH' }
    | { type: 'TOGGLE_OCCLUSION'; eye: 'right' | 'left' }
    | { type: 'ADJUST_VALUE'; direction: 'increase' | 'decrease' }
    | { type: 'CLEAR_LOGS' }; // Added clear action

const MingSingContext = createContext<{
    state: AppState;
    dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

const CLAMP = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

const createLogEntry = (state: AppState): MingSingLogEntry => {
    const now = new Date();
    // Use ISO string or locale string? User just said "timestamp(date time)". ISO is standard.
    // Prompt table shows "timestamp".
    const timestamp = now.toLocaleString(); // More readable date time? Or ISO? Let's use locale for "date time" usually preferred by humans in CSV.

    const { number, display } = getChartInfo(state.selectedChart);
    const formatLens = (n: number) => (n > 0 ? '+' : '') + n.toFixed(2); // e.g. +0.50, -0.25 (Standard: 0.00 usually has + or space, code uses +0.00)
    // RefractionTable uses: if (num >= 0) '+' else '-'. Math.abs().toFixed(2).
    // Let's match RefractionTable exactly.
    const formatVal = (num: number) => {
        const val = Math.abs(num).toFixed(2);
        const sign = num >= 0 ? '+' : '-';
        return `${sign}${val}`;
    };

    const pdVal = (state.pd.right + state.pd.left).toFixed(1);

    // Occluder State
    let occluder = "Both Open";
    if (state.occlusion.right && state.occlusion.left) occluder = "Both Occluded";
    else if (state.occlusion.right) occluder = "Right Occluded";
    else if (state.occlusion.left) occluder = "Left Occluded";

    return {
        timestamp: timestamp,
        r_sph: formatVal(state.eyes.right.sph),
        r_cyl: formatVal(state.eyes.right.cyl),
        r_axis: Math.round(state.eyes.right.axis).toString(),
        r_add: formatVal(state.eyes.right.add),
        l_sph: formatVal(state.eyes.left.sph),
        l_cyl: formatVal(state.eyes.left.cyl),
        l_axis: Math.round(state.eyes.left.axis).toString(),
        l_add: formatVal(state.eyes.left.add),
        pd: pdVal,
        chart_number: number,
        occluder_state: occluder,
        chart_display: display,
        speaker: "",
        utterance_text: "",
        translation_in_en: "",
        speaker_intent: "",
        detected_language: "",
        patient_confidence_score: "",
        hesitation_markers: "",
        requires_verification: ""
    };
};

function mainReducer(state: AppState, action: Action): AppState {
    // Internal logic for state updates
    const nextState = internalReducer(state, action);

    // Logging Logic: Append to logs if action is relevant
    const logActions = ['SET_MODE', 'UPDATE_REFRACTION', 'SET_CHART', 'TOGGLE_OCCLUSION', 'ADJUST_VALUE'];
    if (logActions.includes(action.type)) {
        const entry = createLogEntry(nextState);
        return { ...nextState, logs: [...(nextState.logs || []), entry] };
    }

    // Clear logs logic
    if (action.type === 'CLEAR_LOGS') {
        return { ...nextState, logs: [] };
    }

    return nextState;
}

function internalReducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case 'SET_MODE':
            return { ...state, mode: action.payload };
        // case 'UPDATE_REFRACTION': ... (kept for compatibility but ADJUST_VALUE is main driver)
        // Actually, internalReducer handles the logic I wrote before.
        case 'UPDATE_REFRACTION':
            return {
                ...state,
                eyes: {
                    ...state.eyes,
                    [action.eye]: {
                        ...state.eyes[action.eye],
                        [action.param]: action.value
                    }
                }
            };
        case 'SET_CHART':
            return { ...state, selectedChart: action.payload };
        case 'SET_FIELD':
            return { ...state, activeField: action.payload, activeEye: 'BOTH' };
        case 'SET_SELECTION':
            return { ...state, activeField: action.field, activeEye: action.eye };
        case 'TOGGLE_OCCLUSION':
            return {
                ...state,
                occlusion: {
                    ...state.occlusion,
                    [action.eye]: !state.occlusion[action.eye]
                }
            };
        case 'ADJUST_VALUE': {
            const field = state.activeField;
            const isIncrease = action.direction === 'increase';

            // --- PD Handling ---
            if (field === 'pd') {
                const step = 0.5;
                const min = 20;
                const max = 35;

                const adjustPD = (val: number) => CLAMP(val + (isIncrease ? step : -step), min, max);

                return {
                    ...state,
                    pd: {
                        right: adjustPD(state.pd.right),
                        left: adjustPD(state.pd.left)
                    }
                };
            }

            // --- Refraction Handling ---
            const refField = field as keyof typeof INITIAL_REFRACTION;

            let step = 0.25;
            let min = -10.00;
            let max = 10.00;

            if (refField === 'axis') {
                step = 5;
                min = 0;
                max = 180;
            } else if (refField === 'add') {
                step = 0.25;
                min = 0;
                max = 10.00;
            } else if (refField === 'hPrism' || refField === 'vPrism') {
                step = 0.1;
                min = 0;
                max = 20;
            }

            const adjust = (current: number) => {
                let next = current + (isIncrease ? step : -step);
                if (refField === 'axis') {
                    if (next > 180) next = 0;
                    if (next < 0) next = 180;
                    return next;
                }
                return CLAMP(next, min, max);
            };

            const newEyes = { ...state.eyes };
            let eyesChanged = false;

            if ((state.activeEye === 'RIGHT' || state.activeEye === 'BOTH') && !state.occlusion.right) {
                newEyes.right = {
                    ...newEyes.right,
                    [refField]: adjust(newEyes.right[refField])
                };
                eyesChanged = true;
            }
            if ((state.activeEye === 'LEFT' || state.activeEye === 'BOTH') && !state.occlusion.left) {
                newEyes.left = {
                    ...newEyes.left,
                    [refField]: adjust(newEyes.left[refField])
                };
                eyesChanged = true;
            }

            if (!eyesChanged) return state;

            return { ...state, eyes: newEyes };
        }
        case 'CLEAR_LOGS':
            return { ...state, logs: [] };
        // Note: CLEAR_LOGS handled in mainReducer wrapper potentially, but here safe too.
        // Actually simplest is loop through.
        default:
            return state;
    }
}

export function MingSingProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(mainReducer, initialState);
    return (
        <MingSingContext.Provider value={{ state, dispatch }}>
            {children}
        </MingSingContext.Provider>
    );
}

export function useMingSing() {
    const context = useContext(MingSingContext);
    if (!context) throw new Error('useMingSing must be used within a MingSingProvider');
    return context;
}

export interface RefractionData {
    sph: number;
    cyl: number;
    axis: number;
    hPrism: number; // Horizontal prism
    vPrism: number; // Vertical prism
    add: number;
}

export interface EyeState {
    right: RefractionData;
    left: RefractionData;
}

export type OperationMode = 'FAR' | 'NC' | 'CV' | 'FINAL';
export type RefractionParam = 'sph' | 'cyl' | 'axis' | 'hPrism' | 'vPrism' | 'add' | 'pd';

export interface AppState {
    eyes: EyeState;
    pd: {
        right: number;
        left: number;
    };
    mode: OperationMode;
    selectedChart: string;
    activeEye: 'RIGHT' | 'LEFT' | 'BOTH';
    activeField: RefractionParam;
    occlusion: {
        right: boolean;
        left: boolean;
    };
    logs: MingSingLogEntry[];
}

export interface MingSingLogEntry {
    timestamp: string;
    // Right Eye
    r_sph: string;
    r_cyl: string;
    r_axis: string;
    r_add: string;
    // Left Eye
    l_sph: string;
    l_cyl: string;
    l_axis: string;
    l_add: string;
    // Other
    pd: string;
    chart_number: string;
    occluder_state: string;
    chart_display: string;
    // Placeholders
    speaker: string;
    utterance_text: string;
    translation_in_en: string;
    speaker_intent: string;
    detected_language: string;
    patient_confidence_score: string;
    hesitation_markers: string;
    requires_verification: string;
}

export const INITIAL_REFRACTION: RefractionData = {
    sph: 0.00,
    cyl: 0.00,
    axis: 180,
    hPrism: 0.0,
    vPrism: 0.0,
    add: 0.00,
};

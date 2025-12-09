export interface RefractionValue {
  s: number;    // Sphere: -10.00 to +10.00
  c: number;    // Cylinder: -10.00 to +10.00
  a: number;    // Axis: 0 to 180
  add: number;  // Addition: 0.00 to +10.00
}

export interface EyeData {
  rightEye: RefractionValue;
  leftEye: RefractionValue;
  pd: number;   // Pupillary Distance: 50 to 80
  occlusion: {
    rightEye: boolean;  // true = occluded
    leftEye: boolean;   // true = occluded
  };
  testMode: 'left-only' | 'right-only' | 'bino';
}

export type ChartType = string;

export interface LogEntry {
  timestamp: string;
  R_SPH: string;
  R_CYL: string;
  R_AXIS: string;
  R_ADD: string;
  L_SPH: string;
  L_CYL: string;
  L_AXIS: string;
  L_ADD: string;
  PD: string;
  Chart_Number: string;
  Occluder_State: string;
  Chart_Display: string;
  Speaker: string;
  Utterance_Text: string;
  Translation_in_En: string;
  Speaker_Intent: string;
  Detected_Language: string;
  Patient_Confidence_Score: number;
  Hesitation_Markers: string;
  Requires_Verification: string;
}

export interface AppState extends EyeData {
  currentChart: ChartType;
  logs: LogEntry[];
}

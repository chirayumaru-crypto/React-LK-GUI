/**
 * Refraction parameter types
 * s = Sphere, c = Cylinder, a = Axis, add = Addition
 */
export type RefractionParam = 's' | 'c' | 'a' | 'add';

export interface RefractionValue {
  s: number;    // Sphere: -10.00 to +10.00
  c: number;    // Cylinder: -10.00 to +10.00
  a: number;    // Axis: 0 to 180
  add: number;  // Addition: 0.00 to +10.00
}

export interface OcclusionState {
  rightEye: boolean;  // true = occluded
  leftEye: boolean;   // true = occluded
}

export type EyeTestMode = 'left-only' | 'right-only' | 'bino';

export interface SimulatorState {
  rightEye: RefractionValue;
  leftEye: RefractionValue;
  pd: number;                    // Pupillary Distance: 50 to 80
  occlusion: OcclusionState;
  testMode: EyeTestMode;
}

export type SimulatorAction = 
  | { type: 'SET_RIGHT_EYE'; payload: RefractionValue }
  | { type: 'SET_LEFT_EYE'; payload: RefractionValue }
  | { type: 'UPDATE_RIGHT_EYE_PARAM'; payload: { param: keyof RefractionValue; value: number } }
  | { type: 'UPDATE_LEFT_EYE_PARAM'; payload: { param: keyof RefractionValue; value: number } }
  | { type: 'SET_PD'; payload: number }
  | { type: 'TOGGLE_OCCLUSION'; payload: 'rightEye' | 'leftEye' }
  | { type: 'SET_OCCLUSION'; payload: OcclusionState }
  | { type: 'SET_TEST_MODE'; payload: EyeTestMode }
  | { type: 'RESET' };

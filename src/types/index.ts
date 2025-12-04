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

export interface AppState extends EyeData {}

// src/utils/constants.ts

export const REFRACTION_RANGES = {
  s: { min: -10.0, max: 10.0, step: 0.25, label: 'Sphere' },
  c: { min: -10.0, max: 10.0, step: 0.25, label: 'Cylinder' },
  a: { min: 0, max: 180, step: 1, label: 'Axis' },
  add: { min: 0.0, max: 10.0, step: 0.25, label: 'Addition' },
};

export const PD_RANGE = {
  min: 50,
  max: 80,
  step: 0.5,
  default: 64,
  label: 'Pupillary Distance',
};

export const DEFAULT_REFRACTION_VALUE = {
  s: 0.0,
  c: 0.0,
  a: 180,
  add: 0.0,
};

export const EYE_TEST_MODES = {
  LEFT_ONLY: 'left-only',
  RIGHT_ONLY: 'right-only',
  BINO: 'bino',
};

export const EYE_LABELS = {
  rightEye: 'R (Right Eye)',
  leftEye: 'L (Left Eye)',
};

export const PARAM_LABELS = {
  s: 'S (Sphere)',
  c: 'C (Cylinder)',
  a: 'A (Axis)',
  add: 'ADD (Addition)',
};

export const DECIMAL_PLACES = {
  s: 2,
  c: 2,
  a: 0,
  add: 2,
  pd: 1,
};

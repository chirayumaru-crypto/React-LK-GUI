import { RefractionValue } from '../types';

export const REFRACTION_BOUNDS = {
  s: { min: -10.0, max: 10.0, step: 0.25 },
  c: { min: -10.0, max: 10.0, step: 0.25 },
  a: { min: 0, max: 180, step: 1 },
  add: { min: 0.0, max: 10.0, step: 0.25 },
} as const;

export const PD_BOUNDS = {
  min: 50,
  max: 80,
  step: 0.5,
} as const;

/**
 * Rounds a number to 2 decimal places
 */
export function roundToDecimals(value: number, decimals: number = 2): number {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * Increases a refraction value by its step, respecting bounds
 */
export function increaseValue(
  currentValue: number,
  param: keyof RefractionValue
): number {
  const bounds = REFRACTION_BOUNDS[param];
  const newValue = currentValue + bounds.step;
  return Math.min(newValue, bounds.max);
}

/**
 * Decreases a refraction value by its step, respecting bounds
 */
export function decreaseValue(
  currentValue: number,
  param: keyof RefractionValue
): number {
  const bounds = REFRACTION_BOUNDS[param];
  const newValue = currentValue - bounds.step;
  return Math.max(newValue, bounds.min);
}

/**
 * Increases PD value, respecting bounds
 */
export function increasePD(currentPD: number): number {
  const newValue = currentPD + PD_BOUNDS.step;
  return Math.min(newValue, PD_BOUNDS.max);
}

/**
 * Decreases PD value, respecting bounds
 */
export function decreasePD(currentPD: number): number {
  const newValue = currentPD - PD_BOUNDS.step;
  return Math.max(newValue, PD_BOUNDS.min);
}

/**
 * Formats a number for display (e.g., 0.00, +5.25, -3.50)
 */
export function formatRefraction(value: number, isAxis: boolean = false): string {
  if (isAxis) {
    return Math.round(value).toString();
  }
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}`;
}

/**
 * Determines if a cell should be disabled based on occlusion and test mode
 */
export function isCellDisabled(
  eye: 'right' | 'left',
  occlusion: { rightEye: boolean; leftEye: boolean },
  testMode: 'left-only' | 'right-only' | 'bino'
): boolean {
  // Check occlusion
  if (eye === 'right' && occlusion.rightEye) return true;
  if (eye === 'left' && occlusion.leftEye) return true;

  // Check test mode
  if (testMode === 'right-only' && eye === 'left') return true;
  if (testMode === 'left-only' && eye === 'right') return true;

  return false;
}

// src/utils/calculations.ts

import { REFRACTION_RANGES, PD_RANGE, DECIMAL_PLACES } from './constants';
import { validateRefractionParam, validatePDValue } from './validation';

/**
 * Increments a value by its step, respecting min/max boundaries
 */
export const incrementValue = (
  currentValue: number,
  param: 's' | 'c' | 'a' | 'add'
): number => {
  const range = REFRACTION_RANGES[param];
  if (!range) return currentValue;

  const newValue = currentValue + range.step;
  return validateRefractionParam(param, newValue);
};

/**
 * Decrements a value by its step, respecting min/max boundaries
 */
export const decrementValue = (
  currentValue: number,
  param: 's' | 'c' | 'a' | 'add'
): number => {
  const range = REFRACTION_RANGES[param];
  if (!range) return currentValue;

  const newValue = currentValue - range.step;
  return validateRefractionParam(param, newValue);
};

/**
 * Increments PD value by step
 */
export const incrementPD = (currentPD: number): number => {
  const newValue = currentPD + PD_RANGE.step;
  return validatePDValue(newValue);
};

/**
 * Decrements PD value by step
 */
export const decrementPD = (currentPD: number): number => {
  const newValue = currentPD - PD_RANGE.step;
  return validatePDValue(newValue);
};

/**
 * Formats a value to the appropriate decimal places based on parameter
 */
export const formatRefractionValue = (
  value: number,
  param: 's' | 'c' | 'a' | 'add'
): string => {
  const decimals = DECIMAL_PLACES[param];
  return value.toFixed(decimals);
};

/**
 * Formats PD value
 */
export const formatPDValue = (value: number): string => {
  return value.toFixed(DECIMAL_PLACES.pd);
};

/**
 * Rounds a value to the nearest step increment
 */
export const roundToStep = (value: number, step: number): number => {
  return Math.round(value / step) * step;
};

/**
 * Gets the step size for a parameter
 */
export const getStepSize = (param: 's' | 'c' | 'a' | 'add'): number => {
  const range = REFRACTION_RANGES[param];
  return range?.step || 0.25;
};

/**
 * Gets the range for a parameter
 */
export const getRange = (param: 's' | 'c' | 'a' | 'add'): { min: number; max: number } => {
  const range = REFRACTION_RANGES[param];
  return range ? { min: range.min, max: range.max } : { min: 0, max: 0 };
};

/**
 * Checks if a value is at its maximum
 */
export const isAtMax = (value: number, param: 's' | 'c' | 'a' | 'add'): boolean => {
  const range = REFRACTION_RANGES[param];
  return range ? value >= range.max : false;
};

/**
 * Checks if a value is at its minimum
 */
export const isAtMin = (value: number, param: 's' | 'c' | 'a' | 'add'): boolean => {
  const range = REFRACTION_RANGES[param];
  return range ? value <= range.min : false;
};

/**
 * Checks if PD is at maximum
 */
export const isPDAtMax = (value: number): boolean => {
  return value >= PD_RANGE.max;
};

/**
 * Checks if PD is at minimum
 */
export const isPDAtMin = (value: number): boolean => {
  return value <= PD_RANGE.min;
};

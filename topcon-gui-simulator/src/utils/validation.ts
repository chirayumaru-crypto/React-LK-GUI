// src/utils/validation.ts

import { REFRACTION_RANGES, PD_RANGE } from './constants';

/**
 * Validates and clamps sphere value within allowed range
 */
export const validateSphereValue = (value: number): number => {
  const range = REFRACTION_RANGES.s;
  return Math.max(range.min, Math.min(range.max, value));
};

/**
 * Validates and clamps cylinder value within allowed range
 */
export const validateCylinderValue = (value: number): number => {
  const range = REFRACTION_RANGES.c;
  return Math.max(range.min, Math.min(range.max, value));
};

/**
 * Validates and clamps axis value within allowed range
 */
export const validateAxisValue = (value: number): number => {
  const range = REFRACTION_RANGES.a;
  return Math.max(range.min, Math.min(range.max, value));
};

/**
 * Validates and clamps ADD value within allowed range
 */
export const validateADDValue = (value: number): number => {
  const range = REFRACTION_RANGES.add;
  return Math.max(range.min, Math.min(range.max, value));
};

/**
 * Validates and clamps PD value within allowed range
 */
export const validatePDValue = (value: number): number => {
  return Math.max(PD_RANGE.min, Math.min(PD_RANGE.max, value));
};

/**
 * Validates refraction parameter based on type
 */
export const validateRefractionParam = (
  param: 's' | 'c' | 'a' | 'add',
  value: number
): number => {
  switch (param) {
    case 's':
      return validateSphereValue(value);
    case 'c':
      return validateCylinderValue(value);
    case 'a':
      return validateAxisValue(value);
    case 'add':
      return validateADDValue(value);
    default:
      return value;
  }
};

/**
 * Checks if a value is within valid range
 */
export const isValueInRange = (
  param: 's' | 'c' | 'a' | 'add',
  value: number
): boolean => {
  const range = REFRACTION_RANGES[param];
  if (!range) return false;
  return value >= range.min && value <= range.max;
};

/**
 * Checks if PD value is valid
 */
export const isPDValid = (value: number): boolean => {
  return value >= PD_RANGE.min && value <= PD_RANGE.max;
};

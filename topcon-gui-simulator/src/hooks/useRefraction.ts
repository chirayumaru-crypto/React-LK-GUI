import { useCallback } from 'react';
import { useSimulator } from './useSimulator';
import { RefractionParam } from '../types/simulator';
import { incrementValue, decrementValue } from '../utils/calculations';

/**
 * useRefraction Hook
 * 
 * Custom hook providing refraction parameter manipulation logic.
 * Handles increment/decrement operations with automatic validation
 * and boundary checking for all refraction parameters (S, C, A, ADD).
 * 
 * Features:
 * - Type-safe parameter updates
 * - Automatic validation via utility functions
 * - Boundary enforcement (values stay within defined ranges)
 * - Proper step increments (0.25 for S/C/ADD, 1 for A)
 * - Integration with global state via SimulatorContext
 * 
 * @returns Object with increment/decrement functions for each eye and parameter
 */
export const useRefraction = () => {
  const { state, dispatch } = useSimulator();

  /**
   * Increment a refraction parameter for a specific eye
   * 
   * @param eye - Which eye to update ('rightEye' | 'leftEye')
   * @param param - Which parameter to update ('s' | 'c' | 'a' | 'add')
   */
  const handleIncrement = useCallback(
    (eye: 'rightEye' | 'leftEye', param: RefractionParam) => {
      const currentValue = state[eye][param as keyof typeof state.rightEye];
      const newValue = incrementValue(currentValue, param);

      // Only dispatch if value actually changed (not at max boundary)
      if (newValue !== currentValue) {
        dispatch({
          type: eye === 'rightEye' ? 'UPDATE_RIGHT_EYE_PARAM' : 'UPDATE_LEFT_EYE_PARAM',
          payload: { param: param as keyof typeof state.rightEye, value: newValue },
        });
      }
    },
    [state, dispatch]
  );

  /**
   * Decrement a refraction parameter for a specific eye
   * 
   * @param eye - Which eye to update ('rightEye' | 'leftEye')
   * @param param - Which parameter to update ('s' | 'c' | 'a' | 'add')
   */
  const handleDecrement = useCallback(
    (eye: 'rightEye' | 'leftEye', param: RefractionParam) => {
      const currentValue = state[eye][param as keyof typeof state.rightEye];
      const newValue = decrementValue(currentValue, param);

      // Only dispatch if value actually changed (not at min boundary)
      if (newValue !== currentValue) {
        dispatch({
          type: eye === 'rightEye' ? 'UPDATE_RIGHT_EYE_PARAM' : 'UPDATE_LEFT_EYE_PARAM',
          payload: { param: param as keyof typeof state.rightEye, value: newValue },
        });
      }
    },
    [state, dispatch]
  );

  /**
   * Check if a parameter is at its maximum value
   * Useful for UI feedback (e.g., disable increment button)
   */
  const isAtMax = useCallback(
    (eye: 'rightEye' | 'leftEye', param: RefractionParam): boolean => {
      const currentValue = state[eye][param as keyof typeof state.rightEye];
      const incremented = incrementValue(currentValue, param);
      return currentValue === incremented;
    },
    [state]
  );

  /**
   * Check if a parameter is at its minimum value
   * Useful for UI feedback (e.g., disable decrement button)
   */
  const isAtMin = useCallback(
    (eye: 'rightEye' | 'leftEye', param: RefractionParam): boolean => {
      const currentValue = state[eye][param as keyof typeof state.rightEye];
      const decremented = decrementValue(currentValue, param);
      return currentValue === decremented;
    },
    [state]
  );

  /**
   * Check if a cell should be disabled based on occlusion and test mode
   * 
   * Rules:
   * - Cell disabled if corresponding eye is occluded
   * - In 'right-only' mode: left eye cells disabled
   * - In 'left-only' mode: right eye cells disabled
   * - In 'bino' mode: both enabled (unless occluded)
   */
  const isCellDisabled = useCallback(
    (eye: 'rightEye' | 'leftEye'): boolean => {
      // Check occlusion first
      if (state.occlusion[eye]) {
        return true;
      }

      // Check test mode restrictions
      if (state.testMode === 'right-only' && eye === 'leftEye') {
        return true;
      }

      if (state.testMode === 'left-only' && eye === 'rightEye') {
        return true;
      }

      return false;
    },
    [state.occlusion, state.testMode]
  );

  return {
    handleIncrement,
    handleDecrement,
    isAtMax,
    isAtMin,
    isCellDisabled,
  };
};

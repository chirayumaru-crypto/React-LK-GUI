import React from 'react';
import { RefractionParam } from '../types/simulator';

interface RefractionCellProps {
  value: number;
  param: RefractionParam;
  eye: 'rightEye' | 'leftEye';
  disabled: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
}

/**
 * RefractionCell Component
 * 
 * Interactive cell in the refraction table that allows parameter adjustment
 * via left-click (decrement) and right-click (increment).
 * 
 * Behaviors:
 * - Left Click: Decreases value by step size
 * - Right Click: Increases value by step size
 * - Disabled state: No interaction when eye is occluded or test mode restricts it
 * - Hover effect: Visual feedback on mouse over (unless disabled)
 * 
 * @param value - Current numeric value to display
 * @param param - Parameter type ('s', 'c', 'a', 'add')
 * @param eye - Which eye this cell controls ('rightEye' | 'leftEye')
 * @param disabled - Whether the cell should be non-interactive
 * @param onIncrement - Callback for increment action (right-click)
 * @param onDecrement - Callback for decrement action (left-click)
 */
const RefractionCell: React.FC<RefractionCellProps> = ({
  value,
  param,
  eye,
  disabled,
  onIncrement,
  onDecrement,
}) => {
  /**
   * Handle left-click: Decrement value
   */
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled) {
      onDecrement();
    }
  };

  /**
   * Handle right-click: Increment value
   */
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled) {
      onIncrement();
    }
  };

  /**
   * Format the display value based on parameter type
   * - S, C, ADD: 2 decimal places (e.g., "0.00", "-2.50")
   * - A: Integer (e.g., "180", "90")
   */
  const formatValue = (): string => {
    if (param === 'a') {
      return value.toString();
    }
    return value.toFixed(2);
  };

  return (
    <td
      className={`refraction-cell ${eye === 'rightEye' ? 'right-eye-cell' : 'left-eye-cell'} ${disabled ? 'disabled' : ''}`}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
      }}
      title={
        disabled
          ? 'Cell disabled due to occlusion or test mode'
          : `Left-click to decrease, Right-click to increase ${param.toUpperCase()}`
      }
    >
      {formatValue()}
    </td>
  );
};

export default RefractionCell;

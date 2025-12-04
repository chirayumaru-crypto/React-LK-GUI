import { useState } from 'react';
import { RefractionValue } from '../types';
import { formatRefraction, isCellDisabled } from '../utils/refractionUtils';
import { useEyeData } from '../hooks/useEyeData';

interface RefractionCellProps {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  disabled: boolean;
  isAxis?: boolean;
  isActive?: boolean;
}

function RefractionCell({
  value,
  onIncrease,
  onDecrease,
  disabled,
  isAxis = false,
  isActive = false,
}: RefractionCellProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled) {
      onIncrease();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled) {
      onDecrease();
    }
  };

  let bgClass = 'bg-gray-100';
  if (isActive) bgClass = 'bg-topcon-red text-white';
  else if (disabled) bgClass = 'bg-gray-300 text-gray-400';
  else if (isHovered) bgClass = 'bg-yellow-100';

  return (
    <div
      className={`
        flex items-center justify-center h-16 text-4xl font-bold border border-gray-400
        ${bgClass}
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        transition-colors duration-100 select-none font-mono tracking-tighter
      `}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onContextMenu={handleContextMenu}
      onClick={handleClick}
      title={disabled ? 'Disabled' : `Right-click (+), Left-click (-)`}
    >
      {formatRefraction(value, isAxis)}
    </div>
  );
}

interface ParameterLabelProps {
  label: string;
  subLabel?: string;
  colorClass?: string;
}

function ParameterLabel({ label, subLabel, colorClass = 'text-gray-600' }: ParameterLabelProps) {
  return (
    <div className="flex flex-col items-center justify-center h-16 bg-white border border-gray-400">
      <span className={`text-3xl font-bold ${colorClass}`}>{label}</span>
      {subLabel && <span className="text-sm font-bold text-gray-500 -mt-1">{subLabel}</span>}
    </div>
  );
}

export function RefractionTable() {
  const { state, dispatch } = useEyeData();
  const [activeParam, setActiveParam] = useState<{ eye: 'right' | 'left', param: keyof RefractionValue }>({ eye: 'right', param: 's' });

  const isRightDisabled = isCellDisabled('right', state.occlusion, state.testMode);
  const isLeftDisabled = isCellDisabled('left', state.occlusion, state.testMode);

  const handleParamChange = (eye: 'right' | 'left', param: keyof RefractionValue, increment: boolean) => {
    setActiveParam({ eye, param });

    const actionType = eye === 'right' ? 'UPDATE_RIGHT_EYE_PARAM' : 'UPDATE_LEFT_EYE_PARAM';
    const eyeData = eye === 'right' ? state.rightEye : state.leftEye;
    const currentValue = eyeData[param];

    const bounds = { s: { min: -10, max: 10 }, c: { min: -10, max: 10 }, a: { min: 0, max: 180 }, add: { min: 0, max: 10 } };
    const bound = bounds[param];

    let newValue = increment ? currentValue + (param === 'a' ? 1 : 0.25) : currentValue - (param === 'a' ? 1 : 0.25);
    newValue = Math.max(bound.min, Math.min(newValue, bound.max));

    dispatch({
      type: actionType,
      param,
      value: parseFloat(newValue.toFixed(2)),
    });
  };

  return (
    <div className="w-[600px] shadow-[0_10px_20px_rgba(0,0,0,0.3)] rounded-lg overflow-hidden border-2 border-blue-900 bg-gray-300">
      {/* Header with R, Sbj Data:Far, L */}
      <div className="flex text-white font-bold text-2xl h-12">
        <div className="flex-1 bg-topcon-blue flex items-center justify-center border-r border-gray-400 shadow-inner">R</div>
        <div className="w-40 bg-gradient-to-b from-gray-600 to-gray-800 text-sm flex items-center justify-center shadow-inner border-x border-gray-500">
          Sbj Data:Far
        </div>
        <div className="flex-1 bg-topcon-purple flex items-center justify-center border-l border-gray-400 shadow-inner">L</div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-[1fr_5rem_1fr] bg-gray-200 gap-[1px] border-t border-gray-400">
        {/* S Row */}
        <RefractionCell
          value={state.rightEye.s}
          onIncrease={() => handleParamChange('right', 's', true)}
          onDecrease={() => handleParamChange('right', 's', false)}
          disabled={isRightDisabled}
          isActive={!isRightDisabled && activeParam.eye === 'right' && activeParam.param === 's'}
        />
        <ParameterLabel label="S" colorClass="text-topcon-yellow drop-shadow-sm" />
        <RefractionCell
          value={state.leftEye.s}
          onIncrease={() => handleParamChange('left', 's', true)}
          onDecrease={() => handleParamChange('left', 's', false)}
          disabled={isLeftDisabled}
          isActive={!isLeftDisabled && activeParam.eye === 'left' && activeParam.param === 's'}
        />

        {/* C Row */}
        <RefractionCell
          value={state.rightEye.c}
          onIncrease={() => handleParamChange('right', 'c', true)}
          onDecrease={() => handleParamChange('right', 'c', false)}
          disabled={isRightDisabled}
          isActive={!isRightDisabled && activeParam.eye === 'right' && activeParam.param === 'c'}
        />
        <ParameterLabel label="C" />
        <RefractionCell
          value={state.leftEye.c}
          onIncrease={() => handleParamChange('left', 'c', true)}
          onDecrease={() => handleParamChange('left', 'c', false)}
          disabled={isLeftDisabled}
          isActive={!isLeftDisabled && activeParam.eye === 'left' && activeParam.param === 'c'}
        />

        {/* A Row */}
        <RefractionCell
          value={state.rightEye.a}
          onIncrease={() => handleParamChange('right', 'a', true)}
          onDecrease={() => handleParamChange('right', 'a', false)}
          disabled={isRightDisabled}
          isAxis
          isActive={!isRightDisabled && activeParam.eye === 'right' && activeParam.param === 'a'}
        />
        <ParameterLabel label="A" subLabel="(5)" />
        <RefractionCell
          value={state.leftEye.a}
          onIncrease={() => handleParamChange('left', 'a', true)}
          onDecrease={() => handleParamChange('left', 'a', false)}
          disabled={isLeftDisabled}
          isAxis
          isActive={!isLeftDisabled && activeParam.eye === 'left' && activeParam.param === 'a'}
        />

        {/* ADD Row */}
        <RefractionCell
          value={state.rightEye.add}
          onIncrease={() => handleParamChange('right', 'add', true)}
          onDecrease={() => handleParamChange('right', 'add', false)}
          disabled={isRightDisabled}
          isActive={!isRightDisabled && activeParam.eye === 'right' && activeParam.param === 'add'}
        />
        <ParameterLabel label="ADD" colorClass="text-gray-500" />
        <RefractionCell
          value={state.leftEye.add}
          onIncrease={() => handleParamChange('left', 'add', true)}
          onDecrease={() => handleParamChange('left', 'add', false)}
          disabled={isLeftDisabled}
          isActive={!isLeftDisabled && activeParam.eye === 'left' && activeParam.param === 'add'}
        />
      </div>

      {/* Empty bottom row */}
      <div className="grid grid-cols-[1fr_5rem_1fr] h-12 bg-gray-300 border-t border-gray-400">
        <div className="bg-white border-r border-gray-400"></div>
        <div className="bg-white"></div>
        <div className="bg-gray-300 border-l border-gray-400"></div>
      </div>
    </div>
  );
}

import { useEyeData } from '../hooks/useEyeData';

interface OcclusionControlProps {
    side?: 'left' | 'right' | 'both';
}

export function OcclusionControl({ side = 'both' }: OcclusionControlProps) {
    const { state, dispatch } = useEyeData();

    const renderLeftButton = () => (
        <button
            onClick={() => dispatch({ type: 'TOGGLE_RIGHT_EYE_OCCLUSION' })}
            className={`
        w-20 h-20 rounded-full border-[6px] shadow-[0_4px_6px_rgba(0,0,0,0.4)] transition-all duration-100 active:scale-95
        ${state.occlusion.rightEye
                    ? 'bg-gray-600 border-black'
                    : 'bg-topcon-blue border-black'}
      `}
            title={state.occlusion.rightEye ? "Right Eye Occluded (Open)" : "Occlude Right Eye"}
        />
    );

    const renderRightButton = () => (
        <button
            onClick={() => dispatch({ type: 'TOGGLE_LEFT_EYE_OCCLUSION' })}
            className={`
        w-20 h-20 rounded-full border-[6px] shadow-[0_4px_6px_rgba(0,0,0,0.4)] transition-all duration-100 active:scale-95
        ${state.occlusion.leftEye
                    ? 'bg-gray-600 border-black'
                    : 'bg-gray-400 border-black'}
      `}
            title={state.occlusion.leftEye ? "Left Eye Occluded (Open)" : "Occlude Left Eye"}
        />
    );

    return (
        <div className="flex gap-12 items-center justify-center">
            {(side === 'left' || side === 'both') && renderLeftButton()}
            {(side === 'right' || side === 'both') && renderRightButton()}
        </div>
    );
}

import { useEyeData } from '../hooks/useEyeData';
import { increasePD, decreasePD } from '../utils/refractionUtils';

export function PDControl() {
    const { state, dispatch } = useEyeData();

    const handleIncrease = () => {
        const newPD = increasePD(state.pd);
        dispatch({ type: 'SET_PD', payload: newPD });
    };

    const handleDecrease = () => {
        const newPD = decreasePD(state.pd);
        dispatch({ type: 'SET_PD', payload: newPD });
    };

    return (
        <div className="flex flex-col items-center">
            {/* PD Label */}
            <div className="bg-gray-600 text-white font-bold text-sm px-6 py-1 rounded-t-lg w-full text-center border-x border-t border-black shadow-sm">
                PD
            </div>

            {/* Value Display */}
            <div className="bg-white border-x border-b border-black w-full text-center py-1 px-2 shadow-inner relative">
                <span className="text-3xl font-bold font-mono tracking-wider text-black">
                    {state.pd.toFixed(1)}
                </span>

                {/* Hidden/Overlay Buttons for interaction */}
                <div className="absolute inset-0 flex opacity-0 hover:opacity-10 transition-opacity">
                    <button
                        onClick={handleDecrease}
                        className="w-1/2 h-full bg-blue-500 cursor-pointer"
                        title="Decrease PD"
                    />
                    <button
                        onClick={handleIncrease}
                        className="w-1/2 h-full bg-red-500 cursor-pointer"
                        title="Increase PD"
                    />
                </div>
            </div>
        </div>
    );
}

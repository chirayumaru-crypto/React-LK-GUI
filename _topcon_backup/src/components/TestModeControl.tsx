import { useEyeData } from '../hooks/useEyeData';

export function TestModeControl() {
    const { state, dispatch } = useEyeData();

    const modes = [
        { id: 'right-only', label: 'R', color: 'bg-topcon-yellow' },
        { id: 'bino', label: 'BINO', color: 'bg-green-200' }, // Lighter green
        { id: 'left-only', label: 'L', color: 'bg-green-200' },
    ] as const;

    return (
        <div className="bg-yellow-100 p-1 rounded border-2 border-yellow-400 shadow-lg inline-block w-64">
            {/* Tabs */}
            <div className="flex gap-1 mb-1">
                {modes.map((mode) => (
                    <button
                        key={mode.id}
                        onClick={() => dispatch({ type: 'SET_TEST_MODE', payload: mode.id })}
                        className={`
              flex-1 py-1 font-bold text-xs border border-gray-400 shadow-sm rounded-sm
              ${state.testMode === mode.id
                                ? 'bg-white text-black border-b-0'
                                : `${mode.color} text-black hover:brightness-95`}
            `}
                    >
                        {mode.label}
                    </button>
                ))}
            </div>

            {/* Content Box */}
            <div className="bg-gradient-to-b from-teal-100 to-teal-200 border border-gray-400 p-2 h-32 flex flex-col items-center justify-center relative shadow-inner">
                <div className="text-[10px] font-bold text-gray-700 absolute top-1">(-) SPH (+)</div>

                <div className="flex items-center justify-between w-full px-4 mt-2">
                    <span className="text-3xl font-bold text-red-600 drop-shadow-sm">R</span>

                    {/* Mouse Icon */}
                    <div className="flex flex-col items-center">
                        <div className="w-6 h-8 border-2 border-gray-600 rounded-full bg-gray-300 relative">
                            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-[1px] h-3 bg-gray-600"></div>
                        </div>
                        <div className="flex gap-4 text-yellow-500 font-bold text-lg mt-1">
                            <span>◄</span><span>►</span>
                        </div>
                    </div>

                    <span className="text-3xl font-bold text-green-600 drop-shadow-sm">G</span>
                </div>
            </div>
        </div>
    );
}

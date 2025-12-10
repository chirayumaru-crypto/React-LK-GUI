import React from 'react';
import { useRefraction } from '../../context/RefractionContext';
import { Eye, Settings } from 'lucide-react';

export const ControlPad: React.FC = () => {
    const { updateValue, activeEye, activeField, toggleOcclusion, setEye, data } = useRefraction();

    const handleBinocular = () => {
        setEye('BOTH');
        // Un-occlude both eyes when binocular mode is activated
        if (data.OD.isOccluded) toggleOcclusion('OD');
        if (data.OS.isOccluded) toggleOcclusion('OS');
    };

    // Dial Simulator: Hold to continuously increment? simplified to clicks for now
    const handleInc = () => updateValue(1);
    const handleDec = () => updateValue(-1);

    return (
        <div className="flex-1 bg-gray-200 rounded p-2 flex flex-col gap-2 border border-gray-300 shadow-inner overflow-y-auto">

            {/* Mode Buttons */}
            <div className="grid grid-cols-4 gap-1 min-h-[40px]">
                <button className="btn-membrane h-10">Far</button>
                <button className="btn-membrane h-10">Near</button>
                <button className="btn-membrane h-10 active text-black">Subj</button>
                <button className="btn-membrane h-10">Obj</button>
            </div>

            {/* Function Buttons */}
            <div className="grid grid-cols-4 gap-1 mt-2 min-h-[48px]">
                <button
                    className="btn-membrane h-12 bg-blue-100 text-blue-900 border-blue-300 col-span-2"
                    onClick={handleBinocular}
                >
                    <Eye className="w-5 h-5 mr-1" />
                    <span className="text-[10px] uppercase font-bold">Binocular</span>
                </button>

                <button
                    className="btn-membrane h-12 bg-gray-300 border-gray-400"
                    onClick={() => toggleOcclusion(activeEye === 'BOTH' ? 'OD' : activeEye)}
                >
                    <span className="text-xs font-bold">OCCLUDE</span>
                </button>

                <button className="btn-membrane h-12 bg-yellow-100 border-yellow-300 font-bold text-yellow-900">
                    PRINT
                </button>
            </div>

            {/* PD Controls Placeholder */}
            <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="flex bg-white rounded border border-gray-300 items-center justify-between px-2 py-1">
                    <span className="text-[10px] font-bold text-gray-500">PD MODE</span>
                    <Settings className="w-4 h-4 text-gray-400" />
                </div>
            </div>

            {/* Main Dial Control */}
            <div className="mt-auto self-center p-4 bg-gray-300 rounded-full shadow-inner border border-gray-400 mb-4 scale-90 sm:scale-100">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white to-gray-200 shadow-xl flex items-center justify-center border border-gray-100 relative">

                    {/* Increase Button Top */}
                    <button
                        className="absolute top-0 w-full h-1/2 flex justify-center pt-2 hover:bg-black/5 rounded-t-full active:bg-black/10 outline-none"
                        onClick={handleInc}
                    >
                        <div className="font-bold text-gray-400 text-xs uppercase bg-white/80 px-2 py-1 rounded shadow-sm">Increase</div>
                    </button>

                    {/* Decrease Button Bottom */}
                    <button
                        className="absolute bottom-0 w-full h-1/2 flex justify-center pb-2 hover:bg-black/5 rounded-b-full active:bg-black/10 outline-none"
                        onClick={handleDec}
                    >
                        <div className="font-bold text-gray-400 text-xs uppercase bg-white/80 px-2 py-1 rounded shadow-sm">Decrease</div>
                    </button>

                    {/* Center Knob */}
                    <div className="w-12 h-12 rounded-full bg-gray-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] border border-gray-200 z-10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-glow"></div>
                    </div>
                </div>
            </div>

            <div className="text-center text-xs text-gray-500 font-mono">
                Adjusting: <span className="font-bold text-blue-800">{activeField}</span> ({activeEye})
            </div>

        </div>
    );
};

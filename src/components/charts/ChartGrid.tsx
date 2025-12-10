import React from 'react';
import { Type, Grid3X3, CircleDot, RefreshCw, EyeOff, VenetianMask, Blend } from 'lucide-react';
import { useRefraction } from '../../context/RefractionContext';

const categories = [
    { id: 1, label: 'Letters', icon: Type, color: 'text-black' },
    { id: 2, label: 'Numbers', icon: Blend, color: 'text-black' },
    { id: 3, label: 'E-Chart', icon: Grid3X3, color: 'text-black' },
    { id: 4, label: 'Landolt-C', icon: CircleDot, color: 'text-black' },
    { id: 5, label: 'Kids', icon: VenetianMask, color: 'text-purple-600' },
    { id: 6, label: 'Astig', icon: RefreshCw, color: 'text-green-600' },
    { id: 7, label: 'Red/Green', icon: EyeOff, color: 'text-red-500' },
    { id: 8, label: 'Dots', icon: Grid3X3, color: 'text-black' },
    { id: 9, label: 'Schober', icon: CircleDot, color: 'text-green-600' },
    { id: 10, label: 'Worth-4', icon: CircleDot, color: 'text-red-500' },
    { id: 11, label: 'Cross', icon: RefreshCw, color: 'text-black' },
    { id: 12, label: 'Phoria', icon: Type, color: 'text-black' },
    { id: 13, label: 'Vertical', icon: Type, color: 'text-black' },
    { id: 14, label: 'Horizontal', icon: Type, color: 'text-black' },
    { id: 15, label: 'Single', icon: Type, color: 'text-black' },
    { id: 16, label: 'Crowded', icon: Grid3X3, color: 'text-black' },
    { id: 17, label: 'Low Cont', icon: Type, color: 'text-gray-400' },
    { id: 18, label: 'Stereo', icon: CircleDot, color: 'text-blue-500' },
    { id: 19, label: 'Coincidence', icon: RefreshCw, color: 'text-black' },
    { id: 20, label: 'Minute', icon: CircleDot, color: 'text-black' },
    { id: 21, label: 'Ishihara', icon: Grid3X3, color: 'text-red-400' },
    { id: 22, label: 'Grid', icon: Grid3X3, color: 'text-black' },
    { id: 23, label: 'Clock', icon: RefreshCw, color: 'text-black' },
    { id: 24, label: 'Balance', icon: EyeOff, color: 'text-black' },
];

export const ChartGrid: React.FC = () => {
    const { selectedChartId, setChart } = useRefraction();

    return (
        <div className="h-full bg-gray-100 flex flex-col items-center">
            {/* Right Side Vertical Toolbar */}
            <div className="w-full h-full overflow-y-auto p-1 bg-gray-200">
                <div className="grid grid-cols-2 gap-1 auto-rows-min">
                    {Array.from({ length: 24 }).map((_, idx) => {
                        const chartType = categories[idx % categories.length];
                        return (
                            <button
                                key={idx}
                                onClick={() => setChart(idx)}
                                className={`aspect-square bg-white border border-gray-300 rounded hover:border-blue-400 flex flex-col items-center justify-center relative transition-all active:scale-95
                        ${selectedChartId === idx ? 'ring-2 ring-yellow-400 z-10 bg-blue-50' : ''}
                    `}
                            >
                                <span className="text-[10px] absolute top-1 left-1.5 text-gray-400 font-mono font-bold">{idx + 1}</span>
                                <chartType.icon className={`w-8 h-8 opacity-80 ${chartType.color}`} />
                                <span className="text-[9px] text-gray-500 uppercase font-bold mt-1 scale-75">{chartType.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

import { useState } from 'react';
import { useEyeData } from '../hooks/useEyeData';

export type ChartType =
    | 'landolt-c-500' | 'landolt-c-400' | 'landolt-c-200' | 'landolt-c-150'
    | 'landolt-c-split-1' | 'landolt-c-split-2' | 'landolt-c-split-3'
    | 'letters-multi-20' | 'landolt-c-400-2' | 'letters-enh-200' | 'letters-hbv-100' | 'letters-vlnea-70' | 'letters-fzbde-40' | 'letters-tzvec-20'
    | 'letters-evotl-20' | 'letters-aplbk-25'
    | 'red-green' | 'astigmatism' | 'dots' | 'red-green-lines' | 'fixation-dot';

interface ChartData {
    id: ChartType;
    label: string;
    category: 'landolt' | 'letters' | 'special';
}

const chartDefinitions: ChartData[] = [
    // Row 1
    { id: 'landolt-c-500', label: 'm 500', category: 'landolt' },
    { id: 'landolt-c-400', label: 'Ш 400', category: 'landolt' },
    { id: 'landolt-c-200', label: 'E 200', category: 'landolt' },
    { id: 'landolt-c-150', label: 'Ш 150', category: 'landolt' },
    { id: 'landolt-c-split-1', label: 'm E Ш 100\nE Ш E 60', category: 'landolt' },
    { id: 'landolt-c-split-2', label: 'Ш E m E Ш\nE m E Ш E', category: 'landolt' },
    { id: 'landolt-c-split-3', label: 'Ш E m E Ш\nE m E Ш E', category: 'landolt' },

    // Row 2
    { id: 'letters-multi-20', label: 'c u a n a 20\nn u c a n 20\nu a n c u 15', category: 'letters' },
    { id: 'landolt-c-400-2', label: 'E 400', category: 'landolt' },
    { id: 'letters-enh-200', label: 'E N H 200\nS L C 100', category: 'letters' },
    { id: 'letters-hbv-100', label: 'H B V 100\nP H T 00', category: 'letters' },
    { id: 'letters-vlnea-70', label: 'V L N E A 70\nD A O F C 60\nE G N D H 50', category: 'letters' },
    { id: 'letters-fzbde-40', label: 'F Z B D E 40\nO F L C T 30\nA P E O F 20', category: 'letters' },
    { id: 'letters-tzvec-20', label: 'T Z V E C 20\nO H P N T 15\nE V O T S 10', category: 'letters' },

    // Row 3
    { id: 'letters-evotl-20', label: 'E V O T L 20\nT B G A B 20\nH N F Z C 20', category: 'letters' },
    { id: 'letters-aplbk-25', label: 'A P L B K 25\n6 3 8 2 5 20\nZ R M C T 15', category: 'letters' },
    { id: 'red-green', label: '', category: 'special' },
    { id: 'astigmatism', label: '✱', category: 'special' }, // Clock dial representation
    { id: 'dots', label: '⋮⋮⋮', category: 'special' },
    { id: 'red-green-lines', label: 'BHAZN\nVLODP', category: 'special' },
    { id: 'fixation-dot', label: '●', category: 'special' },
];

interface ChartsSectionProps {
    onChartSelect?: (chartType: ChartType) => void;
}

export function ChartsSection({ onChartSelect }: ChartsSectionProps) {
    const [activeTab, setActiveTab] = useState<number>(0);
    const { state, dispatch } = useEyeData();

    const handleChartSelect = (chart: ChartType) => {
        dispatch({ type: 'SET_CHART', payload: chart });
        onChartSelect?.(chart);
    };

    const tabs = [
        { label: 'Chart1', color: 'bg-topcon-yellow', borderColor: 'border-yellow-500' },
        { label: 'Chart2', color: 'bg-teal-200', borderColor: 'border-teal-400' },
        { label: 'Chart3', color: 'bg-teal-200', borderColor: 'border-teal-400' },
        { label: 'Chart4', color: 'bg-gray-300', borderColor: 'border-gray-400' },
        { label: 'Chart5', color: 'bg-gray-300', borderColor: 'border-gray-400' },
    ];

    const renderChart = (chart: ChartData) => {
        const isSelected = state.currentChart === chart.id;
        const isRedGreen = chart.id === 'red-green';
        const isFixationDot = chart.id === 'fixation-dot';
        const isRedGreenLines = chart.id === 'red-green-lines';
        const isDots = chart.id === 'dots';
        const isAstigmatism = chart.id === 'astigmatism';

        return (
            <button
                key={chart.id}
                onClick={() => handleChartSelect(chart.id)}
                className={`
          aspect-square border-2 rounded flex items-center justify-center cursor-pointer
          transition-all duration-150 text-[7px] font-bold leading-tight p-0.5 w-full
          ${isSelected
                        ? 'bg-blue-100 border-blue-600 shadow-lg ring-2 ring-blue-400'
                        : 'bg-white border-gray-400 hover:bg-gray-50 hover:border-gray-500'}
        `}
            >
                {isRedGreen ? (
                    <div className="flex w-full h-full rounded overflow-hidden">
                        <div className="w-1/2 bg-red-600 flex items-center justify-center text-white text-[6px] flex-col leading-none"><span>PT</span><span>ZN</span><span>DA</span><span>TH</span></div>
                        <div className="w-1/2 bg-green-600 flex items-center justify-center text-white text-[6px] flex-col leading-none"><span>TP</span><span>NZ</span><span>AD</span><span>HT</span></div>
                    </div>
                ) : isFixationDot ? (
                    <div className="w-full h-full bg-black flex items-center justify-center rounded">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                ) : isRedGreenLines ? (
                    <div className="flex flex-col w-full h-full rounded overflow-hidden">
                        <div className="h-1/2 bg-white flex items-center justify-center text-green-600 text-[6px] border-b border-black">BHAZN</div>
                        <div className="h-1/2 bg-white flex items-center justify-center text-red-600 text-[6px]">VLODP</div>
                    </div>
                ) : isDots ? (
                    <div className="grid grid-cols-3 gap-0.5 p-1">
                        <div className="w-0.5 h-0.5 bg-black rounded-full col-start-2"></div>
                        <div className="w-0.5 h-0.5 bg-black rounded-full col-start-1 row-start-2"></div>
                        <div className="w-0.5 h-0.5 bg-black rounded-full col-start-2 row-start-2"></div>
                        <div className="w-0.5 h-0.5 bg-black rounded-full col-start-3 row-start-2"></div>
                        <div className="w-0.5 h-0.5 bg-black rounded-full col-start-2 row-start-3"></div>
                    </div>
                ) : isAstigmatism ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* Simple clock dial representation */}
                        {[0, 30, 60, 90, 120, 150].map(deg => (
                            <div key={deg} className="absolute w-full h-0.5 bg-black" style={{ transform: `rotate(${deg}deg)` }}></div>
                        ))}
                        <div className="absolute w-2 h-2 bg-white rounded-full border border-gray-300"></div>
                    </div>
                ) : (
                    <span className="text-gray-800 whitespace-pre-line text-center px-0.5 uppercase">
                        {chart.label}
                    </span>
                )}
            </button>
        );
    };

    return (
        <div className="w-full max-w-[500px] bg-white rounded-lg shadow-xl border-3 border-gray-500">
            {/* Tabs */}
            <div className="flex gap-0.5 -mt-3 mb-0 overflow-x-auto no-scrollbar">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`
              ${index === activeTab ? `${tab.color} border-t-2 border-x-2 ${tab.borderColor}` : 'bg-gray-200 border-gray-400'} 
              px-3 py-1 rounded-t-md font-bold text-xs shadow-sm cursor-pointer 
              hover:brightness-110 transition-all border-b-0 whitespace-nowrap
            `}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Grid Container */}
            <div className="bg-gradient-to-b from-yellow-100 to-yellow-200 p-1.5 border-3 border-yellow-500 rounded-b-md">
                <div className="grid grid-cols-7 gap-0.5 bg-yellow-400 p-0.5">
                    {chartDefinitions.map((chart, index) => (
                        // Adding index to key because we have duplicate IDs
                        <div key={`${chart.id}-${index}`}>
                            {renderChart(chart)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

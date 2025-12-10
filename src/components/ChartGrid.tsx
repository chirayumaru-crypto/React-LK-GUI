import { useState } from 'react';
import { useMingSing } from "../context/MingSingContext";

// Define Chart Data Structure based on standard acuity charts
const VA_VALUES = ['0.05', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1.0', '1.2', '1.5', '2.0'];

const GROUPS = [
    { id: 'E', label: 'E', icon: 'E' },
    { id: 'C', label: 'C', icon: 'C' },
    { id: 'letters', label: 'P', icon: 'P' },
    { id: 'numbers', label: '1', icon: '1' },
    { id: 'children', label: 'Child', icon: '🧸' },
    { id: 'special', label: 'Spec', icon: '⚙️' },
    { id: 'mask', label: 'Mask', icon: '⬛' }
];

const SPECIAL_CHARTS = [
    { id: 'dots', label: 'Dots', display: 'Worth 4 Dot' },
    { id: 'rg', label: 'R/G', display: 'Red/Green Balance' },
    { id: 'cross', label: 'Cross', display: 'Cross Grid' },
    { id: 'clock', label: 'Clock', display: 'Astigmatism Clock' },
    { id: 'stereo', label: 'Stereo', display: 'Stereo Circles' },
    { id: 'schober', label: 'Schober', display: 'Schober Test' },
    { id: 'phoria', label: 'Phoria', display: 'Phoria Lines' },
];

const MASKS = [
    { id: 'horiz', label: 'Horiz', display: 'Horizontal Mask' },
    { id: 'vert', label: 'Vert', display: 'Vertical Mask' },
    { id: 'single', label: 'Single', display: 'Single Optotype' },
    { id: 'rg_filter', label: 'R/G', display: 'R/G Filter' },
];

export function ChartGrid() {
    const { dispatch, state } = useMingSing();
    const [activeGroup, setActiveGroup] = useState('E');

    // Helper to generate chart list for active group
    const getCharts = () => {
        if (['E', 'C', 'letters', 'numbers', 'children'].includes(activeGroup)) {
            return VA_VALUES.map((va, index) => ({
                id: `${activeGroup}-${va}`,
                label: va,
                sub: activeGroup.toUpperCase(),
                display: `${getGroupName(activeGroup)} ${va}`,
                idx: index + 1
            }));
        }
        // Prefix special charts with 'special-' to trigger correct Display/Log logic
        if (activeGroup === 'special') return SPECIAL_CHARTS.map((c, i) => ({ ...c, id: `special-${c.id}`, sub: 'Test', idx: i + 1 }));
        // Prefix mask charts with 'mask-'
        if (activeGroup === 'mask') return MASKS.map((c, i) => ({ ...c, id: `mask-${c.id}`, sub: 'Mask', idx: i + 1 }));
        return [];
    };

    const getGroupName = (g: string) => {
        const map: Record<string, string> = {
            'E': 'Tumbling E', 'C': 'Landolt C', 'letters': 'Letters',
            'numbers': 'Numbers', 'children': 'Children'
        };
        return map[g] || g;
    };

    const renderChartButton = (chart: any) => {
        const isActive = state.selectedChart === chart.id;
        return (
            <button
                key={chart.id}
                onClick={() => dispatch({ type: 'SET_CHART', payload: chart.id })}
                className={`
                    aspect-square bg-white border border-gray-300 rounded shadow-sm flex flex-col items-center justify-center hover:bg-blue-50 transition-colors
                    ${isActive ? 'ring-2 ring-blue-500 bg-blue-100' : ''}
                `}
                title={chart.display || chart.label}
            >
                {/* Visual Representation */}
                <span className="text-xl font-bold text-gray-800">{chart.label}</span>
                <span className="text-[10px] text-gray-500">{chart.sub}</span>
            </button>
        );
    };

    // Filter Buttons (Presets)
    const PRESETS = [0.1, 0.3, 0.5, 0.8, 1.0, 1.2]; // Bottom quick access

    return (
        <div className="flex flex-col gap-1 p-1 bg-gray-100 h-full">
            {/* Top Toolbar (Groups) */}
            <div className="flex gap-1 h-12 mb-1 overflow-x-auto">
                {GROUPS.map((group) => (
                    <button
                        key={group.id}
                        onClick={() => setActiveGroup(group.id)}
                        className={`
                            flex-1 min-w-[50px] rounded shadow-sm text-xl font-bold flex items-center justify-center border transition-colors
                            ${activeGroup === group.id
                                ? 'bg-blue-700 text-white border-blue-900 shadow-inner'
                                : 'bg-gradient-to-b from-blue-400 to-blue-600 text-white border-blue-700 hover:bg-blue-500'}
                        `}
                        title={group.label}
                    >
                        {group.icon}
                    </button>
                ))}
            </div>

            {/* Chart Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-1 overflow-y-auto content-start flex-1 p-1">
                {getCharts().map(renderChartButton)}
            </div>

            {/* Bottom Number Presets (Quick VA) - Only relevant for VA groups */}
            {['E', 'C', 'letters', 'numbers'].includes(activeGroup) && (
                <div className="flex gap-1 mt-auto pt-1 h-10 border-t border-gray-200">
                    {PRESETS.map(va => (
                        <button
                            key={`preset-${va}`}
                            onClick={() => dispatch({ type: 'SET_CHART', payload: `${activeGroup}-${va}` })}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold text-md rounded flex items-center justify-center shadow-sm"
                        >
                            {va}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

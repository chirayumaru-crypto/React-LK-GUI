import React from 'react';
import { useMingSing } from "../context/MingSingContext";
import { getChartInfo } from "../utils/chartUtils";

export function ChartDisplay() {
    const { state } = useMingSing();
    const { display, number } = getChartInfo(state.selectedChart);

    // Determine visual content based on chart type
    const getVisualContent = () => {
        // Parse ID for group and value
        // state.selectedChart is usually "group-value" (e.g. "E-0.5")
        const parts = state.selectedChart.split('-');
        const group = parts[0];
        const value = parts[1];

        // Default char based on group
        let char = 'E';
        let isScalable = false;

        if (group === 'E') { char = 'E'; isScalable = true; }
        else if (group === 'C') { char = 'C'; isScalable = true; }
        else if (group === 'letters') { char = 'A'; isScalable = true; }
        else if (group === 'numbers') { char = '8'; isScalable = true; }
        else if (group === 'children') { char = '🧸'; isScalable = true; }

        // Handle Special / Mask
        if (group === 'special' || group === 'mask') {
            return renderSpecial(group === 'mask' ? value : value, group); // Value is ID here
        }

        // Calculate Scale
        // Base Size for VA 1.0 = 40px (approx)
        // VA 0.1 -> 10x size -> 400px
        // VA 2.0 -> 0.5x size -> 20px
        let fontSize = 40;
        if (isScalable && value) {
            const va = parseFloat(value);
            if (!isNaN(va) && va > 0) {
                // Formula: Size = Base / VA
                // Adjust Base to fit visual preference: 0.05 -> 400px (fits), 1.0 -> 20px
                const BASE = 20;
                fontSize = BASE / va;
            }
        }

        // Render Grid of Optotypes
        // The display logic in a real chart changes (fewer letters for larger sizes).
        // For simulator, we'll just scale the grid items or show fewer.
        // If VA < 0.2 (Huge), maybe show 1 letter?
        // Let's keep it simple: Grid of 3x2, scaled.
        // If font is HUGE, grid gap needs to increase or we show fewer?
        // Let's show single letter if size > 150px

        const isHuge = fontSize > 150;
        const count = isHuge ? 1 : 6;
        const gridClass = isHuge ? 'flex items-center justify-center' : 'grid grid-cols-3 gap-12 w-full max-w-2xl';

        return (
            <div className={`${gridClass} transition-all duration-300`}>
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="flex items-center justify-center">
                        <span
                            className="font-bold text-black leading-none transform transition-all duration-300"
                            style={{ fontSize: `${fontSize}px` }}
                        >
                            {char}
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    const renderSpecial = (id: string, group: string) => {
        // Special rendering logic ... (Keep existing)
        const displayLabel = id || 'Special';

        // JCC Chart (Dots)
        if (id === 'dots' || displayLabel === 'JCC Chart') {
            return (
                <div className="w-full h-full bg-black flex items-center justify-center">
                    {/* Size reduced to fit preview */}
                    <div className="w-[320px] h-[320px] rounded-full bg-white flex flex-col items-center justify-center gap-3">
                        {/* Precise Honeycomb Pattern: 3-4-5-4-3 */}
                        <div className="flex gap-4">
                            {[1, 2, 3].map(i => <div key={`r1-${i}`} className="w-4 h-4 rounded-full bg-black"></div>)}
                        </div>
                        <div className="flex gap-4">
                            {[1, 2, 3, 4].map(i => <div key={`r2-${i}`} className="w-4 h-4 rounded-full bg-black"></div>)}
                        </div>
                        <div className="flex gap-4">
                            {[1, 2, 3, 4, 5].map(i => <div key={`r3-${i}`} className="w-4 h-4 rounded-full bg-black"></div>)}
                        </div>
                        <div className="flex gap-4">
                            {[1, 2, 3, 4].map(i => <div key={`r4-${i}`} className="w-4 h-4 rounded-full bg-black"></div>)}
                        </div>
                        <div className="flex gap-4">
                            {[1, 2, 3].map(i => <div key={`r5-${i}`} className="w-4 h-4 rounded-full bg-black"></div>)}
                        </div>
                    </div>
                </div>
            )
        }

        // Duochrome (R/G) - already fits (flex w-full h-full)

        // Astigmatic Chart
        if (id === 'clock' || displayLabel === 'Astigmatic Chart') {
            return (
                <div className="w-full h-full bg-white flex items-center justify-center">
                    <div className="w-[340px] h-[340px] rounded-full border-4 border-black relative flex items-center justify-center">
                        {Array.from({ length: 12 }).map((_, i) => {
                            const num = i + 1;
                            const deg = num * 30;
                            // Adjusted radius for smaller circle
                            const r = 140;
                            const rad = (deg - 90) * (Math.PI / 180);
                            const x = r * Math.cos(rad);
                            const y = r * Math.sin(rad);

                            return (
                                <React.Fragment key={i}>
                                    {/* Dashed Line - shorter length */}
                                    <div
                                        className="absolute w-1 h-[100px] border-l-4 border-dashed border-black origin-bottom"
                                        style={{
                                            top: '40px',
                                            left: '50%',
                                            transform: `translateX(-50%) rotate(${deg}deg)`,
                                            transformOrigin: 'center 130px' // Adjusted origin
                                        }}
                                    ></div>
                                    {/* Number - smaller font */}
                                    <div
                                        className="absolute text-3xl font-bold font-sans text-black"
                                        style={{
                                            transform: `translate(${x}px, ${y}px)`
                                        }}
                                    >
                                        {num}
                                    </div>
                                </React.Fragment>
                            )
                        })}
                        <div className="w-16 h-16 bg-white rounded-full z-10"></div>
                    </div>
                </div>
            )
        }

        // Cross Cylinder Chart
        if (id === 'cross' || displayLabel === 'Cross Cylinder Chart') {
            return (
                <div className="w-full h-full bg-black flex items-center justify-center">
                    <div className="w-[320px] h-[320px] rounded-full bg-white flex items-center justify-center relative overflow-hidden">
                        {/* Horizontal Lines */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                            {[1, 2, 3, 4, 5].map(i => <div key={'h' + i} className="w-[85%] h-1.5 bg-black"></div>)}
                        </div>
                        {/* Vertical Lines */}
                        <div className="absolute inset-0 flex items-center justify-center gap-5">
                            {[1, 2, 3, 4, 5].map(i => <div key={'v' + i} className="h-[85%] w-1.5 bg-black"></div>)}
                        </div>
                    </div>
                </div>
            )
        }
        if (id === 'rg' || displayLabel === 'Duochrome Chart' || displayLabel === 'Red/Green Balance') {
            return (
                <div className="flex w-full h-full border-4 border-black bg-black">
                    {/* Red Side */}
                    <div className="flex-1 bg-[#d92828] flex flex-col items-center justify-center gap-8 text-black font-bold font-sans">
                        <div className="text-8xl flex gap-8 items-center"><span>5</span> <span className="text-7xl">◎</span></div>
                        <div className="text-6xl flex gap-8"><span>3</span> <span>4</span></div>
                        <div className="text-5xl flex gap-8 items-center"><span>2</span> <span>9</span> <span className="text-5xl">○</span></div>
                    </div>
                    {/* Green Side */}
                    <div className="flex-1 bg-[#28a745] flex flex-col items-center justify-center gap-8 text-black font-bold font-sans">
                        <div className="text-8xl flex gap-8 items-center"><span className="text-7xl">◎</span> <span>5</span></div>
                        <div className="text-6xl flex gap-8"><span>4</span> <span>3</span></div>
                        <div className="text-5xl flex gap-8 items-center"><span className="text-5xl">○</span> <span>9</span> <span>2</span></div>
                    </div>
                </div>
            );
        }
        // Astigmatic Chart
        if (id === 'clock' || displayLabel === 'Astigmatic Chart') {
            return (
                <div className="w-full h-full bg-white flex items-center justify-center">
                    <div className="w-[500px] h-[500px] rounded-full border-4 border-black relative flex items-center justify-center">
                        {Array.from({ length: 12 }).map((_, i) => {
                            const num = i + 1;
                            const deg = num * 30; // 1 at 30deg, 12 at 360 (0)
                            // Position numbers
                            // x = r * sin(deg), y = -r * cos(deg)
                            const r = 210; // Radius for numbers
                            const rad = (deg - 90) * (Math.PI / 180);
                            const x = r * Math.cos(rad);
                            const y = r * Math.sin(rad);

                            return (
                                <React.Fragment key={i}>
                                    {/* Dashed Line */}
                                    <div
                                        className="absolute w-1 h-[160px] border-l-4 border-dashed border-black origin-bottom"
                                        style={{
                                            top: '50px',
                                            left: '50%',
                                            transform: `translateX(-50%) rotate(${deg}deg)`,
                                            transformOrigin: 'center 200px' // Rotate around center of circle
                                        }}
                                    ></div>
                                    {/* Number */}
                                    <div
                                        className="absolute text-5xl font-bold font-sans text-black"
                                        style={{
                                            transform: `translate(${x}px, ${y}px)`
                                        }}
                                    >
                                        {num}
                                    </div>
                                </React.Fragment>
                            )
                        })}
                        <div className="w-24 h-24 bg-white rounded-full z-10"></div> {/* Center Hole */}
                    </div>
                </div>
            )
        }

        // Cross Cylinder Chart
        if (id === 'cross' || displayLabel === 'Cross Cylinder Chart') {
            return (
                <div className="w-full h-full bg-black flex items-center justify-center">
                    <div className="w-[450px] h-[450px] rounded-full bg-white flex items-center justify-center relative overflow-hidden">
                        {/* Horizontal Lines */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                            {[1, 2, 3, 4, 5].map(i => <div key={'h' + i} className="w-[90%] h-2 bg-black"></div>)}
                        </div>
                        {/* Vertical Lines */}
                        <div className="absolute inset-0 flex items-center justify-center gap-6">
                            {[1, 2, 3, 4, 5].map(i => <div key={'v' + i} className="h-[90%] w-2 bg-black"></div>)}
                        </div>
                    </div>
                </div>
            )
        }

        // Fallback
        return <div className="text-5xl font-bold text-gray-400">{getChartInfo(state.selectedChart).display}</div>;
    };

    return (
        <div className="flex flex-col h-full bg-white border-2 border-gray-300 m-2 rounded shadow-inner relative overflow-hidden">
            {/* Visual Display Area */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white overflow-hidden">
                {getVisualContent()}
            </div>

            {/* Bottom Info Bar */}
            <div className="h-16 bg-gray-100 flex items-center justify-between px-4 border-t border-gray-300">
                <div className="flex gap-4">
                    <span className="font-mono text-sm text-gray-900 font-bold">{number}: {display}</span>
                </div>
                <div className="text-xl font-bold text-gray-800">
                    VA: {state.selectedChart.split('-')[1] || '-'}
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-2xl">☀</span>
                </div>
            </div>
        </div>
    );
}

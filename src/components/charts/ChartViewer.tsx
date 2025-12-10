import React from 'react';
import { useRefraction } from '../../context/RefractionContext';

export const ChartViewer: React.FC = () => {
    const { selectedChartId } = useRefraction();
    const { data } = useRefraction();

    // Map chart IDs to specific content
    const renderChartContent = () => {
        // Chart 1: Letters (Snellen)
        if (selectedChartId === 0) {
            return (
                <div className="flex flex-col items-center gap-12 font-serif text-black leading-none">
                    <div className="text-9xl font-bold">E</div>
                    <div className="flex gap-12 text-8xl font-bold"><span>F</span><span>P</span></div>
                    <div className="flex gap-8 text-7xl font-bold"><span>T</span><span>O</span><span>Z</span></div>
                    <div className="flex gap-6 text-6xl font-bold"><span>L</span><span>P</span><span>E</span><span>D</span></div>
                </div>
            )
        }
        // Chart 2: Numbers
        if (selectedChartId === 1) {
            return (
                <div className="flex flex-col items-center gap-12 font-mono text-black leading-none">
                    <div className="text-9xl font-bold">8</div>
                    <div className="flex gap-12 text-8xl font-bold"><span>5</span><span>6</span></div>
                    <div className="flex gap-8 text-7xl font-bold"><span>2</span><span>9</span><span>3</span></div>
                    <div className="flex gap-6 text-6xl font-bold"><span>4</span><span>7</span><span>1</span><span>0</span></div>
                </div>
            )
        }
        // Chart 3: E-Chart (Directional)
        if (selectedChartId === 2) {
            return (
                <div className="flex flex-col items-center gap-12 font-serif text-black leading-none">
                    <div className="text-9xl font-bold">E</div>
                    <div className="flex gap-12 text-8xl font-bold">
                        <span className="rotate-90">E</span>
                        <span className="rotate-180">E</span>
                    </div>
                    <div className="flex gap-8 text-7xl font-bold">
                        <span className="rotate-0">E</span>
                        <span className="rotate-90">E</span>
                        <span className="-rotate-90">E</span>
                    </div>
                </div>
            )
        }
        // Chart 4: Landolt-C (Directional)
        if (selectedChartId === 3) {
            return (
                <div className="flex flex-col items-center gap-12 font-sans text-black leading-none">
                    <div className="text-9xl font-bold">C</div>
                    <div className="flex gap-12 text-8xl font-bold">
                        <span className="rotate-90">C</span>
                        <span className="rotate-180">C</span>
                    </div>
                    <div className="flex gap-8 text-7xl font-bold">
                        <span className="rotate-0">C</span>
                        <span className="rotate-90">C</span>
                        <span className="-rotate-90">C</span>
                    </div>
                </div>
            )
        }
        // Chart 5: Kids
        if (selectedChartId === 4) {
            return (
                <div className="flex flex-col items-center gap-8">
                    <div className="text-6xl">🌞 🍎 🦋</div>
                    <div className="text-5xl">🌳 🦆 ⭐</div>
                    <div className="text-4xl">🚗 🏠 🐶 🐱</div>
                    <div className="text-3xl">🎈 ⚽ 🎨 🍕 🌈</div>
                </div>
            )
        }
        // Chart 6: Astigmatism (Clock Dial)
        if (selectedChartId === 5) {
            return (
                <img src="/astig_chart.png" alt="Astigmatism Chart" className="max-w-full max-h-full object-contain" />
            )
        }
        // Chart 7: Red/Green (Duochrome)
        if (selectedChartId === 6) {
            return (
                <img src="/red_green_chart.png" alt="Red/Green Chart" className="max-w-full max-h-full object-contain" />
            )
        }
        // Chart 8: Dots
        if (selectedChartId === 7) {
            return (
                <img src="/dots_chart.png" alt="Dots Chart" className="max-w-full max-h-full object-contain" />
            )
        }
        // Chart 9: Schober (Red Cross + Green Circles)
        if (selectedChartId === 8) {
            return (
                <div className="relative w-96 h-96 flex items-center justify-center">
                    {/* Green concentric circles */}
                    <div className="absolute">
                        <div className="w-80 h-80 rounded-full border-4 border-green-600"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full border-4 border-green-600"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-4 border-green-600"></div>
                    </div>
                    {/* Red cross */}
                    <div className="absolute">
                        <div className="w-1 h-32 bg-red-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="h-1 w-32 bg-red-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                </div>
            )
        }
        // Chart 10: Worth-4 Dot
        if (selectedChartId === 9) {
            return (
                <div className="flex flex-col items-center gap-16">
                    <div className="w-16 h-16 rounded-full bg-red-500"></div>
                    <div className="flex gap-32">
                        <div className="w-16 h-16 rounded-full bg-green-500"></div>
                        <div className="w-16 h-16 rounded-full bg-green-500"></div>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-white border-4 border-gray-800"></div>
                </div>
            )
        }
        // Chart 11: Cross (Plus/Minus Grid)
        if (selectedChartId === 10) {
            return (
                <div className="grid grid-cols-3 gap-8">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className="text-6xl font-bold text-black">
                            {i % 2 === 0 ? '+' : '×'}
                        </div>
                    ))}
                </div>
            )
        }
        // Chart 12: Phoria (Maddox Rod simulation - horizontal lines)
        if (selectedChartId === 11) {
            return (
                <div className="flex flex-col items-center gap-2">
                    <div className="text-2xl font-bold text-black mb-8">FIXATION POINT</div>
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="w-96 h-1 bg-red-500"></div>
                    ))}
                </div>
            )
        }
        // Chart 13: Vertical Lines
        if (selectedChartId === 12) {
            return (
                <div className="flex gap-4 items-center justify-center h-full">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-2 h-96 bg-black"></div>
                    ))}
                </div>
            )
        }
        // Chart 14: Horizontal Lines
        if (selectedChartId === 13) {
            return (
                <div className="flex flex-col gap-4 items-center justify-center">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="h-2 w-96 bg-black"></div>
                    ))}
                </div>
            )
        }
        // Chart 15: Single Letter (Large E)
        if (selectedChartId === 14) {
            return (
                <div className="text-[20rem] font-serif font-bold text-black">E</div>
            )
        }
        // Chart 16: Crowded (Letters with bars)
        if (selectedChartId === 15) {
            return (
                <div className="flex flex-col gap-8">
                    <div className="border-4 border-black p-4 inline-block">
                        <span className="text-8xl font-serif font-bold">E</span>
                    </div>
                    <div className="border-4 border-black p-4 inline-block">
                        <span className="text-8xl font-serif font-bold">F</span>
                    </div>
                </div>
            )
        }
        // Chart 17: Low Contrast (Gray letters)
        if (selectedChartId === 16) {
            return (
                <div className="flex flex-col items-center gap-12 font-serif text-gray-400 leading-none">
                    <div className="text-9xl font-bold">E</div>
                    <div className="flex gap-12 text-8xl font-bold"><span>F</span><span>P</span></div>
                    <div className="flex gap-8 text-7xl font-bold"><span>T</span><span>O</span><span>Z</span></div>
                </div>
            )
        }
        // Chart 18: Stereo (Random Dot)
        if (selectedChartId === 17) {
            return (
                <div className="grid grid-cols-20 gap-1">
                    {[...Array(400)].map((_, i) => (
                        <div
                            key={i}
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: Math.random() > 0.5 ? '#000' : '#fff' }}
                        ></div>
                    ))}
                </div>
            )
        }
        // Chart 19: Coincidence (Vernier Acuity)
        if (selectedChartId === 18) {
            return (
                <div className="flex flex-col items-center gap-16">
                    <div className="flex items-center">
                        <div className="w-32 h-2 bg-black"></div>
                        <div className="w-8"></div>
                        <div className="w-32 h-2 bg-black translate-y-1"></div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-32 h-2 bg-black"></div>
                        <div className="w-8"></div>
                        <div className="w-32 h-2 bg-black -translate-y-1"></div>
                    </div>
                </div>
            )
        }
        // Chart 20: Minute (Small details)
        if (selectedChartId === 19) {
            return (
                <div className="flex flex-col items-center gap-4">
                    <div className="text-xs font-bold text-black">E F P T O Z</div>
                    <div className="text-xs font-bold text-black">L P E D P E C F D</div>
                    <div className="text-xs font-bold text-black">E D F C Z P</div>
                </div>
            )
        }
        // Chart 21: Ishihara (Color blindness - simplified)
        if (selectedChartId === 20) {
            return (
                <div className="relative w-96 h-96 rounded-full bg-gradient-to-br from-orange-300 to-orange-400 flex items-center justify-center">
                    <div className="text-9xl font-bold text-green-600">12</div>
                </div>
            )
        }
        // Chart 22: Grid (Amsler Grid)
        if (selectedChartId === 21) {
            return (
                <div className="relative w-96 h-96 bg-white">
                    {/* Vertical lines */}
                    {[...Array(20)].map((_, i) => (
                        <div key={`v${i}`} className="absolute h-full w-px bg-black" style={{ left: `${i * 5}%` }}></div>
                    ))}
                    {/* Horizontal lines */}
                    {[...Array(20)].map((_, i) => (
                        <div key={`h${i}`} className="absolute w-full h-px bg-black" style={{ top: `${i * 5}%` }}></div>
                    ))}
                    {/* Center dot */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black"></div>
                </div>
            )
        }
        // Chart 23: Clock (Astigmatism clock - alternative)
        if (selectedChartId === 22) {
            return (
                <div className="relative w-96 h-96">
                    {[...Array(12)].map((_, i) => {
                        const angle = (i * 30) * (Math.PI / 180);
                        return (
                            <div
                                key={i}
                                className="absolute w-1 h-32 bg-black origin-bottom"
                                style={{
                                    left: '50%',
                                    top: '50%',
                                    transform: `translate(-50%, -100%) rotate(${i * 30}deg)`,
                                }}
                            >
                                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xl font-bold">
                                    {i === 0 ? 12 : i}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )
        }
        // Chart 24: Balance (Binocular balance - polarized simulation)
        if (selectedChartId === 23) {
            return (
                <div className="flex gap-16">
                    <div className="flex flex-col items-center gap-4 p-8 bg-red-100 rounded">
                        <div className="text-6xl font-bold text-black">O D</div>
                        <div className="text-4xl font-bold text-black">2 0 / 3 0</div>
                    </div>
                    <div className="flex flex-col items-center gap-4 p-8 bg-green-100 rounded">
                        <div className="text-6xl font-bold text-black">O S</div>
                        <div className="text-4xl font-bold text-black">2 0 / 3 0</div>
                    </div>
                </div>
            )
        }

        // Default Fallback
        return (
            <div className="text-4xl text-gray-400 font-bold uppercase tracking-widest">
                Chart {selectedChartId + 1}
            </div>
        );
    };

    return (
        <div className="w-full h-full bg-white flex items-center justify-center relative overflow-hidden">
            {/* Screen Bezel Simulation */}
            <div className="absolute inset-0 border-[20px] border-black pointer-events-none z-20 shadow-2xl"></div>

            {/* Chart Content */}
            <div className="scale-75 sm:scale-100 transform transition-transform duration-300">
                {renderChartContent()}
            </div>

            {/* Occlusion Overlays */}
            {(data.OD.isOccluded && data.OS.isOccluded) && (
                <div className="absolute inset-0 bg-black z-30 flex items-center justify-center">
                    <span className="text-gray-500 font-mono text-xl uppercase tracking-widest">Vision Occluded</span>
                </div>
            )}

            {/* Dist / VA Indicator */}
            <div className="absolute bottom-6 right-6 z-30 bg-black/80 text-white px-4 py-2 rounded font-mono text-xl border border-white/20">
                VA: {data.OD.VA}
            </div>
        </div>
    );
};

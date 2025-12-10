import { useMingSing } from '../context/MingSingContext';

export function ControlPad() {
    const { state, dispatch } = useMingSing();
    // Center point 150, 150 for SVG coordinate system ease (300x300 viewBox)
    // Inner Radius: 60
    // Outer Radius: 100
    // Gap: 6 degrees

    // Helper to create donut sector path
    const createSector = (startAngle: number, endAngle: number, innerR: number, outerR: number) => {
        const x1 = 150 + outerR * Math.cos(Math.PI * startAngle / 180);
        const y1 = 150 + outerR * Math.sin(Math.PI * startAngle / 180);
        const x2 = 150 + outerR * Math.cos(Math.PI * endAngle / 180);
        const y2 = 150 + outerR * Math.sin(Math.PI * endAngle / 180);

        const x3 = 150 + innerR * Math.cos(Math.PI * endAngle / 180);
        const y3 = 150 + innerR * Math.sin(Math.PI * endAngle / 180);
        const x4 = 150 + innerR * Math.cos(Math.PI * startAngle / 180);
        const y4 = 150 + innerR * Math.sin(Math.PI * startAngle / 180);

        return `M ${x1} ${y1} A ${outerR} ${outerR} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 0 0 ${x4} ${y4} Z`;
    };

    return (
        <div className="relative w-full h-64 flex justify-center items-center mt-2">

            {/* Left Knob (Controls RIGHT EYE - Column on Left) */}
            <div
                onClick={() => dispatch({ type: 'TOGGLE_OCCLUSION', eye: 'right' })}
                className="absolute left-6 w-20 h-20 rounded-full bg-gradient-to-b from-white to-gray-300 border-4 border-gray-400 shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                title="Toggle Right Eye Occlusion"
            >
                {/* Visual Feedback: Dark if occluded */}
                <div className={`w-16 h-16 rounded-full shadow-inner transition-colors ${state.occlusion.right ? 'bg-[#1e3a8a]' : 'bg-white'}`}></div>
            </div>

            {/* Central Control Cluster */}
            <div className="relative w-[300px] h-[300px]">
                <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-xl">
                    <defs>
                        <linearGradient id="btnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#f3f4f6" />
                            <stop offset="100%" stopColor="#d1d5db" />
                        </linearGradient>
                        <filter id="insetShadow">
                            <feOffset dx="0" dy="1" />
                            <feGaussianBlur stdDeviation="1" result="offset-blur" />
                            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
                            <feFlood floodColor="black" floodOpacity="1" result="color" />
                            <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
                        </filter>
                    </defs>

                    {/* Top Left Quadrant (Plus) */}
                    <g
                        onClick={() => dispatch({ type: 'ADJUST_VALUE', direction: 'increase' })}
                        className="cursor-pointer hover:brightness-95 active:translate-y-[1px] transition-all"
                    >
                        <path d={createSector(185, 265, 65, 120)} fill="url(#btnGrad)" stroke="#9ca3af" strokeWidth="1" />
                        <text x="65" y="100" fontSize="40" fontWeight="bold" fill="#22c55e" transform="rotate(-45 65 100)">+</text>
                    </g>

                    {/* Top Right Quadrant (Minus) */}
                    <g
                        onClick={() => dispatch({ type: 'ADJUST_VALUE', direction: 'decrease' })}
                        className="cursor-pointer hover:brightness-95 active:translate-y-[1px] transition-all"
                    >
                        <path d={createSector(275, 355, 65, 120)} fill="url(#btnGrad)" stroke="#9ca3af" strokeWidth="1" />
                        <rect x="200" y="80" width="30" height="8" rx="4" fill="#ef4444" transform="rotate(45 215 84)" />
                    </g>

                    {/* Bottom Right Quadrant (2) */}
                    <g className="cursor-pointer hover:brightness-95 active:translate-y-[1px] transition-all">
                        <path d={createSector(5, 85, 65, 120)} fill="url(#btnGrad)" stroke="#9ca3af" strokeWidth="1" />
                        <text x="215" y="215" fontSize="24" fontWeight="bold" fill="black" textAnchor="middle" transform="rotate(-45 215 215)">2</text>
                        <circle cx="200" cy="200" r="2" fill="red" />
                        <circle cx="230" cy="230" r="2" fill="red" />
                    </g>

                    {/* Bottom Left Quadrant (1) */}
                    <g className="cursor-pointer hover:brightness-95 active:translate-y-[1px] transition-all">
                        <path d={createSector(95, 175, 65, 120)} fill="url(#btnGrad)" stroke="#9ca3af" strokeWidth="1" />
                        <text x="85" y="215" fontSize="24" fontWeight="bold" fill="black" textAnchor="middle" transform="rotate(45 85 215)">1</text>
                        <circle cx="100" cy="200" r="2" fill="red" />
                        <circle cx="70" cy="230" r="2" fill="red" />
                    </g>
                </svg>

                {/* Central Dial */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gray-200 border-4 border-gray-300 shadow-inner flex items-center justify-center">
                    <div className="w-full h-full rounded-full border border-gray-400 relative">
                        <div className="absolute inset-0 rounded-full border-[2px] border-dashed border-gray-400 opacity-50"></div>
                    </div>
                    <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-teal-300 via-teal-500 to-teal-700 shadow-lg border border-teal-200 flex items-center justify-center">
                        <div className="absolute top-4 left-4 w-8 h-4 bg-white opacity-40 rounded-full transform -rotate-45 blur-sm"></div>
                        <div className="absolute top-[5px] w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_5px_rgba(34,211,238,1)]"></div>
                    </div>
                </div>
            </div>

            {/* Right Knob (Controls LEFT EYE - Column on Right) */}
            <div
                onClick={() => dispatch({ type: 'TOGGLE_OCCLUSION', eye: 'left' })}
                className="absolute right-6 w-20 h-20 rounded-full bg-gradient-to-b from-white to-gray-300 border-4 border-gray-400 shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                title="Toggle Left Eye Occlusion"
            >
                <div className={`w-16 h-16 rounded-full shadow-inner transition-colors ${state.occlusion.left ? 'bg-[#1e3a8a]' : 'bg-white'}`}></div>
            </div>
        </div>
    );
}

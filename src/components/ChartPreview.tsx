interface ChartPreviewProps {
    chartType: string;
}

export function ChartPreview({ chartType }: ChartPreviewProps) {
    console.log('ChartPreview rendering with chartType:', chartType, 'VERSION: 2024-12-04-11:08');
    const renderChartContent = () => {
        // Red-Green test
        if (chartType === 'red-green') {
            return (
                <div className="w-full h-full flex">
                    <div className="w-1/2 bg-[#D00] flex flex-col items-center justify-center text-black font-bold text-5xl leading-tight font-mono">
                        <div>5 ◎</div>
                        <div className="my-3">3 4</div>
                        <div>2 9 0</div>
                    </div>
                    <div className="w-1/2 bg-[#0A0] flex flex-col items-center justify-center text-black font-bold text-5xl leading-tight font-mono">
                        <div>◎ 5</div>
                        <div className="my-3">4 3</div>
                        <div>0 9 2</div>
                    </div>
                </div>
            );
        }

        // Landolt C charts
        if (chartType === 'landolt-c-500') {
            return (
                <div className="w-full h-full flex items-center justify-center bg-white p-4">
                    <span className="font-bold text-black" style={{ fontSize: '180px', lineHeight: 1, transform: 'rotate(90deg)', display: 'inline-block' }}>
                        E
                    </span>
                </div>
            );
        }
        if (chartType === 'landolt-c-400') {
            return (
                <div className="w-full h-full flex items-center justify-center bg-white p-4">
                    <span className="font-bold text-black" style={{ fontSize: '180px', lineHeight: 1, transform: 'rotate(-90deg)', display: 'inline-block' }}>
                        E
                    </span>
                </div>
            );
        }
        if (chartType === 'landolt-c-200') {
            return (
                <div className="w-full h-full flex items-center justify-center bg-white p-4">
                    <span className="font-bold text-black" style={{ fontSize: '180px', lineHeight: 1, display: 'inline-block' }}>
                        E
                    </span>
                </div>
            );
        }
        if (chartType === 'landolt-c-150') {
            return (
                <div className="w-full h-full flex items-center justify-center bg-white p-4">
                    <span className="font-bold text-black" style={{ fontSize: '180px', lineHeight: 1, transform: 'rotate(-90deg)', display: 'inline-block' }}>
                        E
                    </span>
                </div>
            );
        }

        // Split E Chart 1 (Chart 5)
        // Split E Chart 1 (Chart 5)
        if (chartType === 'landolt-c-split-1') {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center bg-white gap-4">
                    {/* Row 1 */}
                    <div className="flex items-center justify-center gap-4">
                        <span className="font-bold text-black inline-block transform rotate-90" style={{ fontSize: '40px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block" style={{ fontSize: '40px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block transform -rotate-90" style={{ fontSize: '40px', lineHeight: 1 }}>E</span>
                    </div>
                    {/* Row 2 */}
                    <div className="flex items-center justify-center gap-4">
                        <span className="font-bold text-black inline-block" style={{ fontSize: '30px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block transform rotate-90" style={{ fontSize: '30px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block" style={{ fontSize: '30px', lineHeight: 1 }}>E</span>
                    </div>
                </div>
            );
        }

        // Split E Chart 2 (Chart 6)
        if (chartType === 'landolt-c-split-2') {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center bg-white gap-2">
                    {/* Row 1 */}
                    <div className="flex items-center justify-center gap-2">
                        <span className="font-bold text-black inline-block transform rotate-90" style={{ fontSize: '30px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block transform -rotate-90" style={{ fontSize: '30px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block transform rotate-90" style={{ fontSize: '30px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block transform rotate-180" style={{ fontSize: '30px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block transform -rotate-90" style={{ fontSize: '30px', lineHeight: 1 }}>E</span>
                    </div>
                    {/* Row 2 */}
                    <div className="flex items-center justify-center gap-2">
                        <span className="font-bold text-black inline-block transform rotate-180" style={{ fontSize: '24px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block transform rotate-90" style={{ fontSize: '24px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block transform rotate-180" style={{ fontSize: '24px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block transform -rotate-90" style={{ fontSize: '24px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block" style={{ fontSize: '24px', lineHeight: 1 }}>E</span>
                    </div>
                    {/* Row 3 */}
                    <div className="flex items-center justify-center gap-2">
                        <span className="font-bold text-black inline-block transform rotate-90" style={{ fontSize: '24px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block transform rotate-180" style={{ fontSize: '24px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block transform -rotate-90" style={{ fontSize: '24px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block" style={{ fontSize: '24px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block transform rotate-90" style={{ fontSize: '24px', lineHeight: 1 }}>E</span>
                    </div>
                </div>
            );
        }

        // Split E Chart 3 (Chart 7)
        if (chartType === 'landolt-c-split-3') {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center bg-white gap-2">
                    {/* Row 1 */}
                    <div className="flex items-center justify-center gap-2">
                        <span className="font-bold text-black inline-block transform -rotate-90" style={{ fontSize: '30px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block transform rotate-180" style={{ fontSize: '30px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block transform rotate-90" style={{ fontSize: '30px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block" style={{ fontSize: '30px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block transform -rotate-90" style={{ fontSize: '30px', lineHeight: 1 }}>E</span>
                    </div>
                    {/* Row 2 */}
                    <div className="flex items-center justify-center gap-2">
                        <span className="font-bold text-black inline-block" style={{ fontSize: '24px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block transform rotate-90" style={{ fontSize: '24px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block" style={{ fontSize: '24px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block transform -rotate-90" style={{ fontSize: '24px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block transform rotate-180" style={{ fontSize: '24px', lineHeight: 1 }}>E</span>
                    </div>
                    {/* Row 3 */}
                    <div className="flex items-center justify-center gap-2">
                        <span className="font-bold text-black inline-block transform rotate-90" style={{ fontSize: '24px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block" style={{ fontSize: '24px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block transform -rotate-90" style={{ fontSize: '24px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block transform rotate-180" style={{ fontSize: '24px', lineHeight: 1 }}>E</span>
                        <span className="font-bold text-black inline-block transform -rotate-90" style={{ fontSize: '24px', lineHeight: 1 }}>E</span>
                    </div>
                </div>
            );
        }

        // Row 2 Charts - White Background

        // Chart 8: letters-multi-20
        if (chartType === 'letters-multi-20') {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center bg-white p-2 gap-2">
                    <div className="flex gap-4 font-bold text-black" style={{ fontSize: '30px', lineHeight: 1 }}>
                        <span>C</span><span>U</span><span>A</span><span>N</span><span>A</span><span>20</span>
                    </div>
                    <div className="flex gap-4 font-bold text-black" style={{ fontSize: '30px', lineHeight: 1 }}>
                        <span>N</span><span>U</span><span>C</span><span>A</span><span>N</span><span>20</span>
                    </div>
                    <div className="flex gap-4 font-bold text-black" style={{ fontSize: '24px', lineHeight: 1 }}>
                        <span>U</span><span>A</span><span>N</span><span>C</span><span>U</span><span>15</span>
                    </div>
                </div>
            );
        }

        // Chart 9: landolt-c-400-2 (Large E)
        if (chartType === 'landolt-c-400-2') {
            return (
                <div className="w-full h-full flex items-center justify-center bg-white p-4">
                    <span className="font-bold text-black" style={{ fontSize: '180px', lineHeight: 1, display: 'inline-block' }}>
                        E
                    </span>
                </div>
            );
        }

        // Chart 10: letters-enh-200
        if (chartType === 'letters-enh-200') {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center bg-white p-2 gap-4">
                    <div className="flex gap-6 font-bold text-black" style={{ fontSize: '60px', lineHeight: 1 }}>
                        <span>E</span><span>N</span><span>H</span>
                    </div>
                    <div className="flex gap-6 font-bold text-black" style={{ fontSize: '40px', lineHeight: 1 }}>
                        <span>S</span><span>L</span><span>C</span>
                    </div>
                </div>
            );
        }

        // Chart 11: letters-hbv-100
        if (chartType === 'letters-hbv-100') {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center bg-white p-2 gap-4">
                    <div className="flex gap-6 font-bold text-black" style={{ fontSize: '50px', lineHeight: 1 }}>
                        <span>H</span><span>B</span><span>V</span>
                    </div>
                    <div className="flex gap-6 font-bold text-black" style={{ fontSize: '40px', lineHeight: 1 }}>
                        <span>P</span><span>H</span><span>T</span>
                    </div>
                </div>
            );
        }

        // Chart 12: letters-vlnea-70
        if (chartType === 'letters-vlnea-70') {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center bg-white p-2 gap-2">
                    <div className="flex gap-4 font-bold text-black" style={{ fontSize: '40px', lineHeight: 1 }}>
                        <span>V</span><span>L</span><span>N</span><span>E</span><span>A</span>
                    </div>
                    <div className="flex gap-4 font-bold text-black" style={{ fontSize: '30px', lineHeight: 1 }}>
                        <span>D</span><span>A</span><span>O</span><span>F</span><span>C</span>
                    </div>
                    <div className="flex gap-4 font-bold text-black" style={{ fontSize: '24px', lineHeight: 1 }}>
                        <span>E</span><span>G</span><span>N</span><span>D</span><span>H</span>
                    </div>
                </div>
            );
        }

        // Chart 13: letters-fzbde-40
        if (chartType === 'letters-fzbde-40') {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center bg-white p-2 gap-2">
                    <div className="flex gap-4 font-bold text-black" style={{ fontSize: '30px', lineHeight: 1 }}>
                        <span>F</span><span>Z</span><span>B</span><span>D</span><span>E</span>
                    </div>
                    <div className="flex gap-4 font-bold text-black" style={{ fontSize: '24px', lineHeight: 1 }}>
                        <span>O</span><span>F</span><span>L</span><span>C</span><span>T</span>
                    </div>
                    <div className="flex gap-4 font-bold text-black" style={{ fontSize: '20px', lineHeight: 1 }}>
                        <span>A</span><span>P</span><span>E</span><span>O</span><span>F</span>
                    </div>
                </div>
            );
        }

        // Chart 14: letters-tzvec-20
        if (chartType === 'letters-tzvec-20') {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center bg-white p-2 gap-2">
                    <div className="flex gap-4 font-bold text-black" style={{ fontSize: '30px', lineHeight: 1 }}>
                        <span>T</span><span>Z</span><span>V</span><span>E</span><span>C</span>
                    </div>
                    <div className="flex gap-4 font-bold text-black" style={{ fontSize: '24px', lineHeight: 1 }}>
                        <span>O</span><span>H</span><span>P</span><span>N</span><span>T</span>
                    </div>
                    <div className="flex gap-4 font-bold text-black" style={{ fontSize: '20px', lineHeight: 1 }}>
                        <span>E</span><span>V</span><span>O</span><span>T</span><span>S</span>
                    </div>
                </div>
            );
        }

        if (chartType.startsWith('landolt-c')) {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center bg-white gap-1 p-2">
                    {[0, 1, 2, 3, 4].map((row) => (
                        <div key={row} className="flex gap-2">
                            {[0, 1, 2, 3, 4].map((col) => {
                                // Reduced sizes to fit in the preview box (approx 1/4 scale)
                                const size = 20 - row * 3;
                                const rotation = (row + col) % 4;
                                return (
                                    <div
                                        key={col}
                                        className="relative border-2 border-black rounded-full flex items-center justify-center"
                                        style={{ width: size, height: size }}
                                    >
                                        <div
                                            className="absolute bg-white"
                                            style={{
                                                width: '30%',
                                                height: '100%',
                                                transform: `rotate(${rotation * 90}deg)`,
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            );
        }

        // Letter charts
        if (chartType.includes('letters') || chartType.includes('-')) {
            const letters = ['E', 'F', 'P', 'T', 'O', 'Z', 'L', 'P', 'E', 'D'];
            return (
                <div className="w-full h-full flex flex-col items-center justify-center bg-white gap-1 p-2">
                    {[0, 1, 2, 3, 4, 5].map((row) => {
                        // Reduced font sizes to fit in the preview box
                        const fontSize = 30 - row * 4;
                        const letterCount = Math.min(row + 3, 7);
                        return (
                            <div key={row} className="flex gap-1" style={{ fontSize: `${fontSize}px`, lineHeight: '1' }}>
                                {Array.from({ length: letterCount }).map((_, col) => (
                                    <span key={col} className="font-bold text-black">
                                        {letters[(row + col) % letters.length]}
                                    </span>
                                ))}
                            </div>
                        );
                    })}
                </div>
            );
        }

        // Row 3 Charts

        // Chart 15: letters-evotl-20
        if (chartType === 'letters-evotl-20') {
            return (
                <div key="chart-15" className="w-full h-full flex flex-col items-center justify-center bg-white p-2 gap-1">
                    <div className="flex gap-4 font-bold text-black" style={{ fontSize: '32px', lineHeight: 1 }}>
                        <span>E</span><span>V</span><span>O</span><span>T</span><span>L</span>
                    </div>
                    <div className="flex gap-4 font-bold text-black" style={{ fontSize: '28px', lineHeight: 1 }}>
                        <span>T</span><span>B</span><span>G</span><span>A</span><span>B</span>
                    </div>
                    <div className="flex gap-4 font-bold text-black" style={{ fontSize: '24px', lineHeight: 1 }}>
                        <span>H</span><span>N</span><span>F</span><span>Z</span><span>C</span>
                    </div>
                </div>
            );
        }

        // Chart 16: letters-aplbk-25
        if (chartType === 'letters-aplbk-25') {
            return (
                <div key="chart-16" className="w-full h-full flex flex-col items-center justify-center bg-white p-2 gap-1">
                    <div className="flex gap-4 font-bold text-black" style={{ fontSize: '32px', lineHeight: 1 }}>
                        <span>A</span><span>P</span><span>L</span><span>B</span><span>K</span>
                    </div>
                    <div className="flex gap-4 font-bold text-black" style={{ fontSize: '28px', lineHeight: 1 }}>
                        <span>6</span><span>3</span><span>8</span><span>2</span><span>5</span>
                    </div>
                    <div className="flex gap-4 font-bold text-black" style={{ fontSize: '24px', lineHeight: 1 }}>
                        <span>Z</span><span>R</span><span>H</span><span>C</span><span>T</span>
                    </div>
                </div>
            );
        }

        // Chart 17: red-green
        if (chartType === 'red-green') {
            return (
                <div className="w-full h-full flex items-center justify-center bg-black p-4 gap-4">
                    {/* Red Box */}
                    <div className="bg-[#D00] p-4 flex flex-col items-center justify-center gap-1">
                        <div className="flex gap-4 text-black font-bold text-2xl leading-none"><span>P</span><span>T</span></div>
                        <div className="flex gap-4 text-black font-bold text-2xl leading-none"><span>Z</span><span>N</span></div>
                        <div className="flex gap-4 text-black font-bold text-2xl leading-none"><span>D</span><span>A</span></div>
                        <div className="flex gap-4 text-black font-bold text-2xl leading-none"><span>T</span><span>H</span></div>
                    </div>
                    {/* Green Box */}
                    <div className="bg-[#0A0] p-4 flex flex-col items-center justify-center gap-1">
                        <div className="flex gap-4 text-black font-bold text-2xl leading-none"><span>T</span><span>P</span></div>
                        <div className="flex gap-4 text-black font-bold text-2xl leading-none"><span>N</span><span>Z</span></div>
                        <div className="flex gap-4 text-black font-bold text-2xl leading-none"><span>A</span><span>D</span></div>
                        <div className="flex gap-4 text-black font-bold text-2xl leading-none"><span>H</span><span>T</span></div>
                    </div>
                </div>
            );
        }

        // Chart 18: astigmatism
        if (chartType === 'astigmatism') {
            return (
                <div className="w-full h-full flex items-center justify-center bg-white relative">
                    {/* Radial Lines */}
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute bg-black"
                            style={{
                                width: '2px',
                                height: '35%',
                                transform: `rotate(${i * 30}deg)`,
                                transformOrigin: 'bottom center',
                                bottom: '50%',
                                left: 'calc(50% - 1px)',
                            }}
                        />
                    ))}
                    {/* Center Circle */}
                    <div className="absolute w-4 h-4 bg-white border-2 border-black rounded-full z-10" />

                    {/* Numbers */}
                    {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
                        const angle = i * 30;
                        const radius = 85; // Distance from center
                        const x = Math.sin(angle * (Math.PI / 180)) * radius;
                        const y = -Math.cos(angle * (Math.PI / 180)) * radius;
                        return (
                            <div
                                key={num}
                                className="absolute font-bold text-black text-xl"
                                style={{
                                    transform: `translate(${x}px, ${y}px)`,
                                }}
                            >
                                {num}
                            </div>
                        );
                    })}
                </div>
            );
        }
        // Chart 19: dots
        if (chartType === 'dots') {
            return (
                <div className="w-full h-full flex items-center justify-center bg-white">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <div className="flex gap-4">
                            <div className="w-3 h-3 bg-black rounded-full"></div>
                            <div className="w-3 h-3 bg-black rounded-full"></div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-3 h-3 bg-black rounded-full"></div>
                            <div className="w-3 h-3 bg-black rounded-full"></div>
                            <div className="w-3 h-3 bg-black rounded-full"></div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-3 h-3 bg-black rounded-full"></div>
                            <div className="w-3 h-3 bg-black rounded-full"></div>
                            <div className="w-3 h-3 bg-black rounded-full"></div>
                            <div className="w-3 h-3 bg-black rounded-full"></div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-3 h-3 bg-black rounded-full"></div>
                            <div className="w-3 h-3 bg-black rounded-full"></div>
                            <div className="w-3 h-3 bg-black rounded-full"></div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-3 h-3 bg-black rounded-full"></div>
                            <div className="w-3 h-3 bg-black rounded-full"></div>
                        </div>
                    </div>
                </div>
            );
        }

        // Chart 20: red-green-lines
        if (chartType === 'red-green-lines') {
            return (
                <div key="chart-20" className="w-full h-full flex flex-col bg-white">
                    {/* Top Half - Green BHAZN */}
                    <div className="h-1/2 w-full flex items-center justify-center relative border-b-4 border-black">
                        <span className="font-bold tracking-wide" style={{ color: '#00BB00', fontSize: '52px', letterSpacing: '0.1em' }}>BHAZN</span>
                        <span className="absolute right-3 top-3 font-bold" style={{ color: '#DD0000', fontSize: '28px' }}>R</span>
                    </div>
                    {/* Bottom Half - Red VLODP */}
                    <div className="h-1/2 w-full flex items-center justify-center relative">
                        <span className="font-bold tracking-wide" style={{ color: '#DD0000', fontSize: '52px', letterSpacing: '0.1em' }}>VLODP</span>
                        <span className="absolute right-3 bottom-3 font-bold" style={{ color: '#DD0000', fontSize: '28px' }}>L</span>
                    </div>
                </div>
            );
        }

        // Chart 21: fixation-dot
        if (chartType === 'fixation-dot') {
            return (
                <div key="chart-21" className="w-full h-full flex items-center justify-center bg-black">
                    <div className="w-5 h-5 bg-white rounded-full" />
                </div>
            );
        }

        // Default placeholder
        return (
            <div className="w-full h-full flex items-center justify-center bg-white text-gray-400 text-2xl font-bold">
                Chart Preview: {chartType}
            </div>
        );
    };

    return (
        <div className="w-full h-full bg-black border-4 border-gray-500 shadow-2xl overflow-hidden">
            {renderChartContent()}
        </div>
    );
}


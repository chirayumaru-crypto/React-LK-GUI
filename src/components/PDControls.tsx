import { useMingSing } from "../context/MingSingContext";

export function PDControls() {
    const { state, dispatch } = useMingSing();

    // Specific colors from image analysis
    const lightBlue = "bg-[#bae6fd]";
    const darkBlue = "bg-[#4a6fa5]";
    const darkBox = "bg-[#3b82f6]";

    const Box = ({ label, value, isDark = false, onClick, isActive = false }: { label: string, value: string, isDark?: boolean, onClick?: () => void, isActive?: boolean }) => {
        const bg = isActive ? 'bg-[#1e3a8a]' : (isDark ? 'bg-[#3C64A6] text-white' : 'bg-[#AEE2F9] text-black');
        const text = isActive ? 'text-white' : (isDark ? 'text-white' : 'text-black');

        return (
            <div
                onClick={onClick}
                className={`flex-1 ${bg} ${text} cursor-pointer hover:opacity-90
            text-center py-1 rounded-sm font-bold text-sm flex items-center justify-center h-8 shadow-sm transition-colors`}
            >
                {label}:{value}
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center mt-4 gap-1 w-full px-4">
            {/* Top Row: PD Values */}
            <div className="flex gap-4 w-full justify-between max-w-sm">
                <Box label="R" value={state.pd.right.toFixed(1)} />
                <Box
                    label="PD"
                    value={(state.pd.right + state.pd.left).toFixed(1)}
                    isDark
                    isActive={state.activeField === 'pd'}
                    onClick={() => dispatch({ type: 'SET_FIELD', payload: 'pd' })}
                />
                <Box label="L" value={state.pd.left.toFixed(1)} />
            </div>

            {/* Arrows Row */}
            <div className="flex justify-between w-full px-8 my-0.5">
                {/* Custom Arrow SVG or large unicode character. Image has long thick black arrows. */}
                <div className="flex-1 flex justify-center">
                    <svg width="60" height="20" viewBox="0 0 60 20" className="fill-black">
                        {/* Left Arrow */}
                        <path d="M15 0 L0 10 L15 20 L15 13 L60 13 L60 7 L15 7 Z" />
                    </svg>
                </div>
                <div className="flex-1"></div>
                <div className="flex-1 flex justify-center">
                    <svg width="60" height="20" viewBox="0 0 60 20" className="fill-black">
                        {/* Right Arrow */}
                        <path d="M45 0 L60 10 L45 20 L45 13 L0 13 L0 7 L45 7 Z" />
                    </svg>
                </div>
            </div>

            {/* Bottom Row: Additional Data */}
            <div className="flex gap-4 w-full justify-between max-w-sm">
                <Box label="R" value="0.0" />
                <Box label="VA" value="0.0" isDark />
                <Box label="L" value="0.0" />
            </div>
        </div>
    );
}
